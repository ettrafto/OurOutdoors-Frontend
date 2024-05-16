import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import EventList from '../../feed/components/EventList';
import { useHttpClient } from '../../shared/hooks/http-hook'; 
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import pfp from '../../pictures/profilePic.jpg'
import './Profile.css'; 

const Profile = () => {
    const navigate = useNavigate();
    const userId = '6626b2cf4c383e4719160c6a';//const { userId } = useParams(); 
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    const [userProfile, setUserProfile] = useState({
        name: '',
        about: '',
        profileImage: '',
    });
    const [loadedEvents, setLoadedEvents] = useState();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/users/${userId}`);
                
                //TODO: integrate fetching user events / fix below route

                const eventDataIn = await sendRequest(`http://localhost:5000/api/users/events/${userId}`);

                setUserProfile({
                    name: responseData.user.name,
                    about: responseData.user.about,
                    profileImage: responseData.user.profileImage || '',
                });
                
                setLoadedEvents(eventDataIn.events);
                
            } catch (err) {
                console.error('Failed to fetch profile data:', err);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId, sendRequest]);



    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    }

    if (error) {
        return <ErrorModal error={error} onClear={clearError} />;
    }

    console.log("Event DATA 3:", loadedEvents);
    return (
        <div className="profile-page">
            <Card className="profile-card">
                <div className="profile-header">
                    <img src={userProfile.profileImage || pfp} alt={userProfile.name} className="profile-image" />
                    <div className="profile-info">
                        <h2>{userProfile.name}</h2>
                        <p>{userProfile.about}</p>
                        <Button onClick={() => navigate(`/profile/edit/${userId}`)}>Edit Profile</Button>
                    </div>
                </div>
            </Card>
            {!isLoading && loadedEvents && <EventList items={loadedEvents} /> }
        </div>
    );
};

export default Profile;