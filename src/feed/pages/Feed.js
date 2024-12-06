import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import EventList from "../components/EventList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import SportsDropdown from "../components/SportsDropdown";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./feed.css";

const Feed = () => {
  const { mongoUserId } = useContext(AuthContext); // MongoDB user ID from context
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvents, setLoadedEvents] = useState();
  const [isPublicSelected, setIsPublicSelected] = useState(true);
  const [selectedSport, setSelectedSport] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      let route;

      // Determine the route based on public/friends toggle and sport selection
      if (isPublicSelected) {
        route = selectedSport
          ? `http://localhost:5000/api/sports/${selectedSport}` // Public sport-specific events
          : "http://localhost:5000/api/events"; // All public events
      } else {
        const baseRoute = `http://localhost:5000/api/users/friends/${mongoUserId}`;
        route = selectedSport ? `${baseRoute}?sport=${selectedSport}` : baseRoute;
      }

      try {
        const responseData = await sendRequest(route);
        setLoadedEvents(responseData.events);
      } catch (err) {}
    };

    fetchEvents();
  }, [sendRequest, isPublicSelected, selectedSport, mongoUserId]);

  const navigate = useNavigate();

  const navigateToNewEvent = () => {
    navigate("/event/new");
  };

  const handleToggle = (isPublic) => {
    setIsPublicSelected(isPublic);
    setSelectedSport(""); // Reset sport selection when toggling between public/friends
  };

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
  };

  return (
    <>
      <div className="interaction-container">
        <button className="newButton" onClick={navigateToNewEvent}>
          +
        </button>
        <SportsDropdown onChange={handleSportChange} />
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
      {!isLoading && loadedEvents && <EventList items={loadedEvents} />}
    </>
  );
};

export default Feed;
