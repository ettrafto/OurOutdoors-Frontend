import { useEffect, useState } from 'react';
import NotificationList from './NotificationList';  // Import the NotificationList child component
import './Notification.css';
import bell from './bell.png'

const NotificationBell = () => {
  const userId = '6626b2cf4c383e4719160c6a';  // Replace with dynamic user ID as needed
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/notifications/getUserNotification/${userId}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const responseData = await response.json();
        setUnreadCount(responseData.count);
        setNotifications(responseData.notifications);
      } catch (error) {
        console.error('Error fetching unread notifications:', error);
      }
    };

    fetchUnreadNotifications();

    // Poll for notifications every 15 seconds
    const intervalId = setInterval(fetchUnreadNotifications, 15000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [userId]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(prevState => !prevState);
  };

  return (
    <div className="notification-bell">
      <img className='bell-icon' onClick={toggleDropdown} src={bell}></img>
      {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}

      {/* Render the NotificationList dropdown when the bell is clicked */}
      {isDropdownVisible && <NotificationList notifications={notifications} />}
    </div>
  );
};

export default NotificationBell;
