import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context'; 
import { useHttpClient } from '../../shared/hooks/http-hook'; 
import ErrorModal from '../../shared/components/UIElements/ErrorModal'; 
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './ViewEvent.css';


const ViewEvent = () => {
  const { eventId } = useParams();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  const [eventData, setEventData] = useState(null);  

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isJoined, setIsJoined] = useState(false);  
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [commentIsValid, setCommentIsValid] = useState(false);
  const [commentInputKey, setCommentInputKey] = useState(Date.now());
  const [userNames, setUserNames] = useState({});
  const { mongoUserId } = useContext(AuthContext); // MongoDB user ID from context


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/events/${eventId}`
        );
        setEventData(responseData.event);

        //set intial joined status
        if (responseData.event.participants.includes(mongoUserId)) {
          setIsJoined(true);
        } else {
          setIsJoined(false);
        }

        //set intial like status
        if (responseData.event.likes.includes(mongoUserId)) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }

        // Fetch usernames for comments
        const fetchedUserNames = {};
        for (const comment of responseData.event.comments) {
          const userName = await userIdTouserName(comment.userId);
          fetchedUserNames[comment.userId] = userName;
        }
        setUserNames(fetchedUserNames); // Store usernames in state

      } catch (err) {}
    };
    fetchEvent();
  }, [eventId, sendRequest]);

  const toggleLikeEvent = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/events/${eventId}/like`,
        'PATCH',
        JSON.stringify({ userId: mongoUserId }),
        { 'Content-Type': 'application/json' }
      );
      setEventData(prevEventData => ({
        ...prevEventData,
        likes: responseData.event.likes
      }));
      setIsLiked(prev => !prev);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  }, [eventId, auth.userId, sendRequest]);


  const postCommentHandler = useCallback(async () => {
    if (commentIsValid) {
      try {
        await sendRequest(
          `http://localhost:5000/api/events/${eventId}/comments`,
          'POST',
          JSON.stringify({
            userId: mongoUserId,
            text: comment
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        setEventData(prevEventData => ({
          ...prevEventData,
          comments: [...prevEventData.comments, { userId: mongoUserId, text: comment }]
        }));
        setComment('');
        setCommentIsValid(false);
      } catch (err) {
        // handle errors as needed
      }
    }
  }, [mongoUserId, comment, commentIsValid, eventId, sendRequest]);

  const userIdTouserName = async (userIdIn) => {
    console.log(userIdIn)
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/${userIdIn}`,
        'GET',
        null, // No body for a GET request
        { 'Content-Type': 'application/json' }
      );
  
      // Assuming the API returns a user object with a name property
      const userName = responseData.user.name;
  
      return userName;  // Return the user's name
    } catch (err) {
      console.error('Error fetching user:', err);
      return null; // Handle error by returning null or an appropriate fallback
    }
  }

  //join and leave logic
  const joinEvent = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/events/${eventId}/join`,
        'PATCH',
        JSON.stringify({ userId: mongoUserId }),
        { 'Content-Type': 'application/json' }
      );
      setEventData(prevEventData => ({
        ...prevEventData,
        participants: [...prevEventData.participants, mongoUserId]
      }));
    } catch (err) {
      // Optionally handle error
    }
  };

  const leaveEvent = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/events/${eventId}/leave`,
        'PATCH',
        JSON.stringify({ userId: mongoUserId }),
        { 'Content-Type': 'application/json' }
      );
      setEventData(prevEventData => ({
        ...prevEventData,
        participants: prevEventData.participants.filter(id => id !== mongoUserId)
      }));
    } catch (err) {
      // Optionally handle error
    }
  };

  const toggleJoinEvent = () => {
    if (eventData.participants.includes(mongoUserId)) {
      console.log(eventData.participants.includes(mongoUserId) ? 'joined': 'not joined');
      //true
      setIsJoined(false);
      leaveEvent();
    } else {
      console.log(eventData.participants.includes(mongoUserId) ? 'joined': 'not joined');
      setIsJoined(true);
      joinEvent();
    }
  };


  if (error) {
    return <ErrorModal error={error} onClear={clearError} />;
  }

  if (isLoading || !eventData) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleInput = (id, value, isValid) => {
    if (id === 'comment') {
      setComment(value);
      setCommentIsValid(isValid);
    }
  };


  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/events/${eventId}`,
        'DELETE'
      );
      navigate('/feed');
    } catch (err) {
      console.error('Failed to delete the event:', err);
    }
    setShowConfirmModal(false); 
  };

  const navigateToEditEvent = () => {
    navigate(`/event/edit/${eventId}`);
  };

  //Converting datetime to more readable format
  const dateYear = eventData.datetime.slice(0,4)
  const dateMonthDay = eventData.datetime.slice(5,10)
  const hour = eventData.datetime.slice(12,13)
  let amPm
  if (hour > 13){
    hour - 12
    amPm = ' PM'
  } else {
    amPm = ' AM'
  }
  const displayTime = hour + eventData.datetime.slice(13,16) + amPm

  const displayDate = dateMonthDay + "-" + dateYear + " " + displayTime

  /*
  if (eventData.participants.includes(mongoUserId)) {
    setIsJoined(true);
  }
*/

const isOwner = eventData.userId === mongoUserId;

  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure you want to delete this event?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </>
        }>
        <p>This action cannot be undone.</p>
      </Modal>
      <Card>
        <h2>{eventData.title}</h2>
        <p>{eventData.description}</p>
        <p>Sport: {eventData.sportId}</p>
        <p>Date and Time: {displayDate}</p>
        <p>Skill Level: {eventData.skill}</p>
        <Button onClick={toggleJoinEvent}>
          {isJoined ? 'Leave' : 'Join'}
        </Button>
        <Button onClick={toggleLikeEvent}>
          {isLiked ? 'Unlike' : 'Like'}
        </Button>
        {isOwner && (
          <>
            <Button onClick={navigateToEditEvent}>EDIT</Button>
            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
          </>
        )}
        <div className='comments-container'>
          {eventData.comments.map((comment, index) => (
            <p className='comment-item' key={index}>{userNames[comment.userId]} { ":  "} {comment.text}</p>
          ))}
          <Input
            className='comments-input'
            key={commentInputKey}
            id="comment"
            element="textarea"
            label="Your Comment"
            validators={[]}
            errorText="Please enter a valid comment."
            onInput={handleInput}
            initialValue={comment}
          />
          <Button className='comments-button' type="button" onClick={postCommentHandler} disabled={!commentIsValid}>
            Post Comment
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ViewEvent;