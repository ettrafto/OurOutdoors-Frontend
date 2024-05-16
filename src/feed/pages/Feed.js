import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import EventList from '../components/EventList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Feed = () => {
    
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedEvents, setLoadedEvents] = useState();

  
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
    
    console.log(loadedEvents)
    return (
        <>
            <Button onClick={navigateToNewEvent}>New</Button>

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