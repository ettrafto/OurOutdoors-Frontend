import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook'; 
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Button from '../../shared/components/FormElements/Button';
import pfp from '../../pictures/profilePic.jpg'; // Placeholder image
import './FriendRequests.css'; // Add custom styling if necessary

const FriendRequests = ({ userId }) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [friendRequests, setFriendRequests] = useState([]);

    // Fetch friend requests when component mounts
    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/users/${userId}/friend-requests`);
                setFriendRequests(responseData.friendRequests);
            } catch (err) {
                console.error('Failed to fetch friend requests:', err);
            }
        };

        if (userId) {
            fetchFriendRequests();
        }
    }, [userId, sendRequest]);

    const handleAcceptRequest = async (requesterId) => {
        try {
            await sendRequest(
                `http://localhost:5000/api/users/accept-friend-request`,
                'PATCH',
                JSON.stringify({
                    userId: userId,        // Current user's ID
                    senderId: requesterId  // Requester's ID
                }),
                { 'Content-Type': 'application/json' }
            );

            // Remove the request from the list after accepting
            setFriendRequests(prevRequests =>
                prevRequests.filter(request => request.id !== requesterId)
            );
        } catch (err) {
            console.error('Failed to accept friend request:', err);
        }
    };

    const handleDenyRequest = async (requesterId) => {
        try {
            await sendRequest(
                `http://localhost:5000/api/users/reject-friend-request`,
                'PATCH',
                JSON.stringify({
                    userId: userId,        // Current user's ID
                    senderId: requesterId  // Requester's ID
                }),
                { 'Content-Type': 'application/json' }
            );

            // Remove the request from the list after denying
            setFriendRequests(prevRequests =>
                prevRequests.filter(request => request.id !== requesterId)
            );
        } catch (err) {
            console.error('Failed to deny friend request:', err);
        }
    };

    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    }

    if (error) {
        return <ErrorModal error={error} onClear={clearError} />;
    }
    /*<img src={request.profileImage || pfp} alt={request.name} className="friend-request-image" />*/

    return (
        <div className="friend-requests">
            <h3>Friend Requests</h3>
            {friendRequests.length === 0 ? (
                <p>No friend requests found.</p>
            ) : (
                <ul>
                    {friendRequests.map(request => (
                        <li key={request.id} className="friend-request-item">
                            <div className="friend-request-info">
                                <p>{request.name}</p>
                                <div className="friend-request-actions">
                                    <Button onClick={() => handleAcceptRequest(request.id)} success>
                                        Accept
                                    </Button>
                                    <Button onClick={() => handleDenyRequest(request.id)} danger>
                                        Deny
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendRequests;
