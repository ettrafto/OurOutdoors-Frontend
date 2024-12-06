import { useEffect, useState, useContext } from 'react';
import NotificationList from './NotificationList';
import './Notification.css';
import bell from './bell.png';
import { AuthContext } from '../../context/auth-context';

const NotificationBell = () => {
  const { mongoUserId } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const markNotificationsAsRead = async (notificationIds) => {
    try {
      await fetch('http://localhost:5000/api/notifications/mark-as-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationIds }),
      });

      // Update local state to mark notifications as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notificationIds.includes(notification._id)
            ? { ...notification, isRead: true }
            : notification
        )
      );

      setUnreadCount(0); // Reset unread count
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/notifications/getUserNotification/${mongoUserId}`
        );
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const responseData = await response.json();
    
        // Merge updated notifications
        setNotifications((prevNotifications) => {
          const updatedNotifications = responseData.notifications.map(
            (newNotification) => {
              const existingNotification = prevNotifications.find(
                (n) => n._id === newNotification._id
              );
              return existingNotification || newNotification;
            }
          );
          return updatedNotifications;
        });
    
        setUnreadCount(
          responseData.notifications.filter((n) => !n.isRead).length
        );
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };    

    fetchUnreadNotifications();

    const intervalId = setInterval(fetchUnreadNotifications, 15000);

    return () => clearInterval(intervalId);
  }, [mongoUserId]);

  const toggleDropdown = () => {
    if (!isDropdownVisible) {
      // Mark all unread notifications as read
      const unreadNotificationIds = notifications
        .filter((notification) => !notification.isRead)
        .map((notification) => notification._id);

      if (unreadNotificationIds.length > 0) {
        markNotificationsAsRead(unreadNotificationIds);
      }
    }

    setIsDropdownVisible((prevState) => !prevState);
  };

  return (
    <div className="notification-bell">
      <img
        className="bell-icon"
        onClick={toggleDropdown}
        src={bell}
        alt="Notifications"
      />
      {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}

      {isDropdownVisible && (
        <NotificationList notifications={notifications} />
      )}
    </div>
  );
};

export default NotificationBell;
