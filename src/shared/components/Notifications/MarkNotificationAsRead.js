const markNotificationsAsRead = async (notificationIds) => {
    try {
      await fetch('/api/notifications/mark-as-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationIds }),
      });
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };
  
   