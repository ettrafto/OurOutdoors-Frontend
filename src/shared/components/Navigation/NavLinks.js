import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context'; // Adjust path as necessary

import './NavLinks.css';
import NotificationBell from '../Notifications/NotificationBell';


const NavLinks = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink to="/feed">Feed</NavLink>
          </li>
          <li>
            <NavLink to="/sports">Sports</NavLink>
          </li>
          <li>
            {/* TODO: set to dynamic route!!! */}
            <NavLink to="/profile/6626b2cf4c383e4719160c6a">Profile</NavLink>

          </li>
        </>
      )}
      <li><NotificationBell/></li>
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;