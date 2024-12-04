import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context'; // Adjust path as necessary

import './NavLinks.css';
import NotificationBell from '../Notifications/NotificationBell';


const NavLinks = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {/*<li>
        <NavLink to="/calendar">Calendar</NavLink>
      </li>*/}
      {isLoggedIn && (
        <>
          <li>
            <NavLink to="/feed">Feed</NavLink>
          </li>
          <li>
            <NavLink to="/friends">Friends</NavLink>
          </li>
          <li>
            <NavLink to="/myTrips">MyTrips</NavLink>
          </li>
          <li>
            <NotificationBell/>
          </li>

          <li>
            {/* TODO: set to dynamic route!!! */}
            <Link className='nav-profilePic' to="/profile/6626b2cf4c383e4719160c6a" />
          </li>
        </>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;