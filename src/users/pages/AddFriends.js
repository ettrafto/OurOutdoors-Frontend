import React, { useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./AddFriends.css";
import { AuthContext

 } from "../../shared/context/auth-context";

const AddFriends = () => {
  const { mongoUserId } = useContext(AuthContext); // MongoDB user ID from context

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddFriend = async (event) => {
    event.preventDefault();
    console.log(mongoUserId)
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/add-friend",
        "POST",
        JSON.stringify({ mongoUserId, email }),
        { "Content-Type": "application/json" }
      );

      setMessage(responseData.message || "Friend added successfully!");
    } catch (err) {}
  };

  return (
    <div className="add-friend">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <h2>Add Friend</h2>
      <form onSubmit={handleAddFriend}>
        <input
          type="email"
          placeholder="Enter friend's email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Add Friend</button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default AddFriends;
