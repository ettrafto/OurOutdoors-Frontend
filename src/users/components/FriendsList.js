import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook'; 
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import pfp from '../../pictures/profilePic.jpg'; // Placeholder image
import './FriendsList.css'; // Add custom styling if necessary

const FriendsList = ({ userId }) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                // Use the new API endpoint to get friends
                const responseData = await sendRequest(`http://localhost:5000/api/users/${userId}/friends`);
                setFriends(responseData.friends);
            } catch (err) {
                console.error('Failed to fetch friends data:', err);
            }
        };

        if (userId) {
            fetchFriends();
        }
    }, [userId, sendRequest]);

    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    }

    if (error) {
        return <ErrorModal error={error} onClear={clearError} />;
    }

    /*<img src={friend.profileImage || pfp} alt={friend.name} className="friend-image" />*/

    return (
        <div className="friends-list">
            <h3>Friends</h3>
            {friends.length === 0 ? (
                <p>No friends found.</p>
            ) : (
                <ul>
                    {friends.map(friend => (
                        <li key={friend.id} className="friend-item">
                            <p>{friend.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendsList;
