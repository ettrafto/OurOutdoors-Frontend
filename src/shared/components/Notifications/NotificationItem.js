const NotificationItem = ({ notification }) => {
    return (
      <li className="notification-item">
        <p>{notification.message}</p>
      </li>
    );
  };
  
  export default NotificationItem;
  