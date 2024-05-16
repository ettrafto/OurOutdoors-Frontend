import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
const participantIcon = '../../assets/participantIcon.png';
const likeIcon = '../../assets/likeIcon.png';
const commentIcon = '../../assets/commentIcon.png';

import './Event.css';

const Event = props => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...")
  };

  const commentsCount = props.comments.length;
  const likesCount = props.likes.length;

  return (
    <li className="event-item">
      <Link to={`/event/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

        <Card className="event-item__content">
          <div className="event-info">
            <div className='author'>
              <h3>{props.authorName}</h3>
            </div>
            <div className="event-title-datetime">
              <h2>{props.title}</h2>
              <p className="event-datetime">{props.datetime}</p>
            </div>
            <p className="event-description">{props.description.substring(0, 50)}...</p>
            <p className="event-meta">{props.sportId} - {props.skill} - {props.location}</p>
          </div>
          <div className="event-interaction ">
            <div className="participant-icon-container icon-container">
              <img src={participantIcon} alt="Participants" />
                <span>{props.participants.length}</span>
            </div>
            <div className="like-icon-container icon-container">
              <img src={likeIcon} alt="Participants" />
                <span>{likesCount}</span>
            </div>
            <div className="comment-icon-container icon-container">
              <img src={commentIcon} alt="Participants" />
                <span>{commentsCount}</span>
            </div>
          </div>
        </Card>
      </Link>
    </li>
  );
};

export default Event;