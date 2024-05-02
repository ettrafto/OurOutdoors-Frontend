import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context'; 

import './ViewEvent.css';

const DUMMY_EVENTS = [
  
  {
      eventId: 'e1',
      userId: 'u1',
      authorName: 'humaen',
      sportId: 'Moutain Biking',
      title: 'Bolton Potholes',
      skill: 'easy',
      description: 'I am going to Bolton Potholes at 9am to do the sunrise trail, I have 3 seats in my car and a bike rack!',
      imageUrl: '',
      datetime: '4/20/24 4:00pm',
      location: '1 Bolton Valley Access Rd, Bolton, VT 05676', 
      participants: ['u2','u3','u4'],
      comments: 
          [
              //TODO: align datatype: user,comment
              'i love mountain biking',
              'im pumped',
              'ill be there'
          ],
        likes: [
            'u2','u3','u4'
        ]
  }, 
  {
      eventId: "e2",
      userId: "u2",
      authorName: "Alice",
      sportId: "Kayaking",
      title: "River Run Fun",
      description: "Join us for a thrilling morning of kayaking down the Green River. Meet at the dock at 8am. Space for two more in my van!",
      imageUrl: "",
      skill: 'easy',
      datetime: "5/15/24 8:00am",
      location: "Green River Dock, Greenfield, MA 01301",
      participants: ["u1", "u5", "u6"],
      comments:
          [
              "Can't wait to paddle with you all!",
              "Is it okay if I bring a friend?",
              "Looking forward to it!"
          ],
        likes: 
          [
            "u1", "u5"
          ]
      
  },
  {
      eventId: "e3",
      userId: "u3",
      authorName: "John",
      sportId: "Hiking",
      title: "Sunset Peak Trail Hike",
      description: "Hiking Sunset Peak this Saturday. We'll catch the sunset at the summit. Leaving from Trailhead Parking at 5pm.",
      imageUrl: "",
      skill: 'easy',
      datetime: "6/01/24 5:00pm",
      location: "Sunset Peak Trailhead, Lake Placid, NY 12946",
      participants: ["u2", "u4", "u7"],
      comments: [
              "I've always wanted to do this hike!",
              "Should we bring headlamps for the hike back down?",
              "I'll bring some snacks for everyone."
          ],
      likes: 
          [
              "u4", "u2", "u7"
          ]
      
  },
  {
      eventId: "e4",
      userId: "u4",
      authorName: "Daisy",
      sportId: "Rock Climbing",
      title: "Climb and Coffee",
      description: "Morning session at the cliffs, followed by coffee at the Grind. Meet at 7am sharp at the base.",
      imageUrl: "",
      skill: 'easy',
      datetime: "7/12/24 7:00am",
      location: "Big Rock Cliffs, Boulder, CO 80302",
      participants: ["u1", "u3", "u8"],
      comments: 
          [
              "Can't wait, see you at the top!",
              "First time climbing, any tips?",
              "I'll bring extra gear if anyone needs."
          ],
      likes: 
          [
              "u3", "u1"
          ]
      
  }
];

const ViewEvent = () => {
  const { eventId } = useParams();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();


  const [eventData, setEventData] = useState(null);  

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [commentIsValid, setCommentIsValid] = useState(false);
  const [commentInputKey, setCommentInputKey] = useState(Date.now());

  useEffect(() => {
    // Find the event by eventId
    const event = DUMMY_EVENTS.find(e => e.eventId === eventId);
    if (event) {
      setEventData(event); 
      setIsLiked(event.likes.includes('currentUser'));  
    } else {

    }
  }, [eventId]);

  if (!eventData) {
    return <div>Loading...</div>;  //TODO Display not found message
  }

  

  const handleInput = (id, value, isValid) => {
    if (id === 'comment') {
      setComment(value);
      setCommentIsValid(isValid);
    }
  };

  const postCommentHandler = () => {
    if (commentIsValid) {
      setEventData(prevData => ({
        ...prevData,
        comments: [...prevData.comments, comment]
      }));
      setComment('');
      setCommentIsValid(false);
      setCommentInputKey(Date.now());
    }
  };

  const toggleJoinEvent = () => {
    setIsJoined(prev => {
      const joined = !prev;
      setEventData(prevData => ({
        ...prevData,
        participants: joined
          ? [...prevData.participants, 'currentUser']
          : prevData.participants.filter(p => p !== 'currentUser')
      }));
      return joined;
    });
  };

  const toggleLikeEvent = () => {
    setIsLiked(prev => {
      const liked = !prev;
      setEventData(prevData => ({
        ...prevData,
        likes: liked
          ? [...prevData.likes, 'currentUser']
          : prevData.likes.filter(user => user !== 'currentUser')
      }));
      return liked;
    });
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    console.log("DELETING..."); //TODO Replace this with actual delete logic
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
        <p>Author's Email: {eventData.email}</p>
        <Button onClick={toggleJoinEvent}>
          {isJoined ? 'Leave' : 'Join'}
        </Button>
        <Button onClick={toggleLikeEvent}>
          {isLiked ? 'Unlike' : 'Like'}
        </Button>
        {auth.isLoggedIn && <Button onClick={navigateToEditEvent}>EDIT</Button>}
        {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
        <div className='comments-container'>
          {eventData.comments.map((comment, index) => (
            <p className='comment-item' key={index}>{comment}</p>
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