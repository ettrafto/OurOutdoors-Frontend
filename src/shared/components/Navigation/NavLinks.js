import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context"; // Adjust the path as necessary
import "./NavLinks.css";
import NotificationBell from "../Notifications/NotificationBell";

const NavLinks = () => {
  const { mongoUserId, logout } = useContext(AuthContext); // Use mongoUserId and logout from AuthContext

  return (
    <ul className="nav-links">
      {mongoUserId ? (
        <>
          <li>
            <NavLink to="/feed">Feed</NavLink>
          </li>
          <li>
            <NavLink to="/friends">Friends</NavLink>
          </li>
          <li>
            <NavLink to="/myTrips">My Trips</NavLink>
          </li>
          <li>
            <NotificationBell />
          </li>
          <li>
            {/* Profile link using the MongoDB user ID */}
            <Link className="nav-profilePic" to={`/profile/${mongoUserId}`}>
              <img
                src="/path/to/default-profile-pic.jpg" // Replace with the actual profile picture URL if available
                alt="Profile"
                className="profile-pic"
              />
            </Link>
          </li>
          <li>
            <button onClick={logout} className="nav-logout-button">
              Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
