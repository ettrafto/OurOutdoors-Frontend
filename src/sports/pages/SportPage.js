import React, { useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import EventList from '../../feed/components/EventList'; // Ensure this path is correct
import { AuthContext } from '../../shared/context/auth-context'; 
import { useHttpClient } from '../../shared/hooks/http-hook'; 
import ErrorModal from '../../shared/components/UIElements/ErrorModal'; 
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const SportPage = () => {
    const { sportId } = useParams(); 

    const USER_ID = '6626b2cf4c383e4719160c6a';//
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedEvents, setLoadedEvents] = useState(null);  



    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/sports/${sportId}`
            );
    
            setLoadedEvents(responseData.events);
          } catch (err) {}
        };
        fetchEvents();
  
      }, [sendRequest]);
      

    // filtering the events based on sportId
    //const events = mockEvents.filter(event => event.sportId.toLowerCase().replace(' ', '-') === sportId.toLowerCase());

    // Convert sportId back to a normal string ("Mountain Biking")
    const sportName = sportId.replace('-', ' ');


    return (

        <>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
             )}
            <div>
                <h1>{sportName}</h1>
            </div>

            {!isLoading && loadedEvents && <EventList items={loadedEvents} /> }
        </>
    );
};

export default SportPage;