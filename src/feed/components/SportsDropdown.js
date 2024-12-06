import React, { useState } from "react";
import "./SportsDropdown.css";

const DUMMY_SPORTS = [
  { id: "All", name: "All", image: "/pictures/sports/all.jpg", description: "" },
  { id: "Mountain-Biking", name: "Mountain Biking", image: "/pictures/sports/mountainBiking.jpg", description: "Shred down Mountains on a funny two-wheeled monkey invention" },
  { id: "Hiking", name: "Hiking", image: "/pictures/sports/hiking.jpg", description: "Lose yourself on the trail" },
  { id: "Scuba-Diving", name: "Scuba Diving", image: "/pictures/sports/scuba.jpg", description: "Disappear into the depths" },
  { id: "Kayaking", name: "Kayaking", image: "/pictures/sports/kayak.jpg", description: "Float down a chill and chilly river" },
  { id: "Running", name: "Running", image: "/pictures/sports/running.jpg", description: "The sport other sports use as punishment" },
  { id: "Skiing", name: "Skiing", image: "/pictures/sports/skiing.jpg", description: "Fast as you can down a mountain on sticks" },
  { id: "Other", name: "Other", image: "/pictures/sports/other.jpg", description: "Whatever your fancy is ;)" },
];

const SportsDropdown = ({ onChange }) => {
  const [selectedSport, setSelectedSport] = useState(DUMMY_SPORTS[0].id);

  const handleSportChange = (event) => {
    const sportId = event.target.value;
    setSelectedSport(sportId);
    if (onChange) {
      onChange(sportId === "All" ? "" : sportId); // Pass empty string if "All" is selected
    }
  };

  return (
    <div className="sports-dropdown">
      <select onChange={handleSportChange} value={selectedSport}>
        {DUMMY_SPORTS.map((sport) => (
          <option key={sport.id} value={sport.id}>
            {sport.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportsDropdown;
