import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import EventList from "../../feed/components/EventList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import FriendsList from "../../users/components/FriendsList";
import FriendRequests from "../../users/components/FriendRequests";
import { AuthContext } from "../../shared/context/auth-context";
import pfp from "../../pictures/profilePic.jpg";
import "./Profile.css";

const Profile = () => {
  const { mongoUserId } = useContext(AuthContext); // MongoDB user ID from context
  const { userId } = useParams(); // URL-based userId
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [userProfile, setUserProfile] = useState({
    name: "",
    about: "",
    profileImage: "",
  });
  const [loadedEvents, setLoadedEvents] = useState();
  const [friendRequestSent, setFriendRequestSent] = useState(false); // Track friend request status

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userResponse = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );
        const eventsResponse = await sendRequest(
          `http://localhost:5000/api/users/events/${userId}`
        );

        setUserProfile({
          name: userResponse.user.name,
          about: userResponse.user.about,
          profileImage: userResponse.user.profileImage || "",
        });
        setLoadedEvents(eventsResponse.events);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId, sendRequest]);

  const sendFriendRequestHandler = async () => {
    if (!mongoUserId) {
      console.error("You must be logged in to send a friend request.");
      return;
    }

    try {
      await sendRequest(
        `http://localhost:5000/api/users/send-friend-request`,
        "POST",
        JSON.stringify({
          senderId: mongoUserId, // MongoDB authenticated user ID
          recipientId: userId, // Target userId
        }),
        { "Content-Type": "application/json" }
      );

      setFriendRequestSent(true); // Mark request as sent
    } catch (err) {
      console.error("Failed to send friend request:", err);
    }
  };

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }
  console.log(userProfile.name)
  return (
    <div className="profile-page">
      <Card className="profile-card">
        <div className="profile-header">
          <img
            src={userProfile.profileImage || pfp}
            alt={userProfile.name}
            className="profile-image"
          />
          <div className="profile-info">
            <h2>{userProfile.name}</h2>
            <p>{userProfile.about}</p>

            {/* Edit Profile button for logged-in user's profile */}
            {mongoUserId === userId && (
              <Button onClick={() => navigate(`/profile/edit/${userId}`)}>
                Edit Profile
              </Button>
            )}

            {/* Send Friend Request button for other users' profiles */}
            {mongoUserId !== userId && !friendRequestSent && (
              <Button onClick={sendFriendRequestHandler}>
                Send Friend Request
              </Button>
            )}

            {/* Confirmation message for sent friend request */}
            {friendRequestSent && <p>Friend request sent!</p>}
          </div>
        </div>
      </Card>

      {/* Friend Requests: Only display for the logged-in user's profile */}
      {mongoUserId === userId && <FriendRequests userId={userId} />}

      {/* Friends List */}
      <FriendsList userId={userId} />

      {/* User's Events */}
      {!isLoading && loadedEvents && <EventList items={loadedEvents} />}
    </div>
  );
};

export default Profile;
