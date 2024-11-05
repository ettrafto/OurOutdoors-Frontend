const NotificationItem = ({ notification }) => {
    return (
      <li className="notification-item">
        <p>{notification.message}</p>
        {notification.link && <a className='view-notification' href={notification.link}>View</a>}
      </li>
    );
  };
  
  export default NotificationItem;
  