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
  const USER_ID = '6626b2cf4c383e4719160c6a';//
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

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/events/${eventId}`
        );
        setEventData(responseData.event);
      } catch (err) {}
    };
    fetchEvent();
  }, [eventId, sendRequest]);

  const toggleLikeEvent = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/events/${eventId}/like`,
        'PATCH',
        JSON.stringify({ userId: USER_ID }),
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
            userId: USER_ID,
            text: comment
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        setEventData(prevEventData => ({
          ...prevEventData,
          comments: [...prevEventData.comments, { userId: USER_ID, text: comment }]
        }));
        setComment('');
        setCommentIsValid(false);
      } catch (err) {
        // handle errors as needed
      }
    }
  }, [USER_ID, comment, commentIsValid, eventId, sendRequest]);

  //join and leave logic
  const joinEvent = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/events/${eventId}/join`,
        'PATCH',
        JSON.stringify({ userId: USER_ID }),
        { 'Content-Type': 'application/json' }
      );
      setEventData(prevEventData => ({
        ...prevEventData,
        participants: [...prevEventData.participants, USER_ID]
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
        JSON.stringify({ userId: USER_ID }),
        { 'Content-Type': 'application/json' }
      );
      setEventData(prevEventData => ({
        ...prevEventData,
        participants: prevEventData.participants.filter(id => id !== USER_ID)
      }));
    } catch (err) {
      // Optionally handle error
    }
  };

  const toggleJoinEvent = () => {
    if (eventData.participants.includes(USER_ID)) {
      setIsJoined(true);
      leaveEvent();
    } else {
      setIsJoined(false);
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
        <p>Date and Time: {eventData.datetime}</p>
        <p>Skill Level: {eventData.skill}</p>
        <Button onClick={toggleJoinEvent}>
          {isJoined ? 'Join' : 'Leave'}
        </Button>
        <Button onClick={toggleLikeEvent}>
          {isLiked ? 'Like' : 'Unlike'}
        </Button>
        {auth.isLoggedIn && <Button onClick={navigateToEditEvent}>EDIT</Button>}
        {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
        <div className='comments-container'>
          {eventData.comments.map((comment, index) => (
            <p className='comment-item' key={index}>{comment.text}</p>
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