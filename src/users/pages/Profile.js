import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Use useParams for dynamic userId
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import EventList from '../../feed/components/EventList';
import { useHttpClient } from '../../shared/hooks/http-hook'; 
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import FriendsList from '../../users/components/FriendsList'; // Import FriendsList
import FriendRequests from '../../users/components/FriendRequests'; // Import FriendRequests
import { AuthContext } from '../../shared/context/auth-context'; // For logged-in user context
import pfp from '../../pictures/profilePic.jpg';
import './Profile.css'; 

const Profile = () => {
    const auth = useContext(AuthContext); // Get the logged-in user's ID
    const { userId } = useParams(); // UseParams to get userId from URL
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    const [userProfile, setUserProfile] = useState({
        name: '',
        about: '',
        profileImage: '',
    });
    const [loadedEvents, setLoadedEvents] = useState();
    const [friendRequestSent, setFriendRequestSent] = useState(false); // Track if request was sent

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/users/${userId}`);
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

    const sendFriendRequestHandler = async () => {
        try {
            await sendRequest(
                `http://localhost:5000/api/users/send-friend-request`,
                'POST',
                JSON.stringify({
                    senderId: auth.userId, // Logged-in user's ID
                    recipientId: userId    // Profile userId (target)
                }),
                { 'Content-Type': 'application/json' }
            );

            setFriendRequestSent(true); // Mark as sent
        } catch (err) {
            console.error('Failed to send friend request:', err);
        }
    };

    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    }

    if (error) {
        return <ErrorModal error={error} onClear={clearError} />;
    }

    return (
        <div className="profile-page">
            <Card className="profile-card">
                <div className="profile-header">
                    <img src={userProfile.profileImage || pfp} alt={userProfile.name} className="profile-image" />
                    <div className="profile-info">
                        <h2>{userProfile.name}</h2>
                        <p>{userProfile.about}</p>
                        
                        {/* Show "Edit Profile" button if this is the user's profile */}
                        {auth.userId === userId && (
                            <Button onClick={() => navigate(`/profile/edit/${userId}`)}>Edit Profile</Button>
                        )}

                        {/* Show "Send Friend Request" button if this is not the user's profile */}
                        {auth.userId !== userId && !friendRequestSent && (
                            <Button onClick={sendFriendRequestHandler}>Send Friend Request</Button>
                        )}

                        {/* Show confirmation if request was sent */}
                        {friendRequestSent && <p>Friend request sent!</p>}
                    </div>
                </div>
            </Card>

            {/* Display FriendRequests component only on the logged-in user's profile */}
            {auth.userId === userId && <FriendRequests userId={userId} />
            }
            <FriendRequests userId={userId} />

            {/* Display FriendsList */}
            <FriendsList userId={userId} />

            {!isLoading && loadedEvents && <EventList items={loadedEvents} />}
        </div>
    );
};

export default Profile;
