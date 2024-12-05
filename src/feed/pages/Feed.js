import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import EventList from '../components/EventList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SportsDropdown from "../components/SportsDropdown";
import { useHttpClient } from '../../shared/hooks/http-hook';

import './feed.css';

const Feed = () => {
    
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedEvents, setLoadedEvents] = useState();
    const [isPublicSelected, setIsPublicSelected] = useState(true);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const responseData = await sendRequest(
            'http://localhost:5000/api/events'
          );
  
          setLoadedEvents(responseData.events);
        } catch (err) {}
      };
      fetchEvents();

    }, [sendRequest]);
    

    const navigate = useNavigate();

    const navigateToNewEvent = () => {
        navigate('/event/new');
    };

    const handleToggle = (isPublic) => {
      setIsPublicSelected(isPublic);
    };
    
    return (
        <>
          <div className="interaction-container">
            <button className='newButton' onClick={navigateToNewEvent}>+</button>
            <SportsDropdown/>
            <div className="toggle-buttons">
              <button
                className={`toggle-button ${isPublicSelected ? "selected" : ""}`}
                onClick={() => handleToggle(true)}
              >
                Public
              </button>
              <button
                className={`toggle-button ${!isPublicSelected ? "selected" : ""}`}
                onClick={() => handleToggle(false)}
              >
                Friends
              </button>
            </div>
          </div>
            <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedEvents && <EventList items={loadedEvents} /> }
        </>
    );

};

export default Feed;