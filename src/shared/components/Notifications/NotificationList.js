import NotificationItem from './NotificationItem';  // Import the NotificationItem child component

const NotificationList = ({ notifications }) => {
  return (
    <div className="notification-dropdown">
      {notifications.length > 0 ? (
        <ul>
          {notifications.map(notification => (
            <NotificationItem key={notification._id} notification={notification} />
          ))}
        </ul>
      ) : (
        <p>No unread notifications</p>
      )}
    </div>
  );
};

export default NotificationList;
