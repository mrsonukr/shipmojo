import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification from './components/Notification'

const App = () => {
  const [notifications, setNotifications] = useState([]);

  const handleClick = (type) => {
    const newNotification = {
      id: Date.now(),
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} message ${notifications.length + 1}`,
      type: type
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Auto remove oldest notification every 3 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1)); // Remove first (oldest) notification
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <div className="h-screen bg-gray-100 relative">
      {/* Notifications at Top Center */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 z-10">
        {notifications.map((notification) => (
          <Notification 
            key={notification.id} 
            message={notification.message} 
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      {/* Buttons at Center */}
      <div className="h-full flex items-center justify-center gap-4">
        <button 
          onClick={() => handleClick('error')}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Error
        </button>
        <button 
          onClick={() => handleClick('success')}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Success
        </button>
        <button 
          onClick={() => handleClick('warning')}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Warning
        </button>
        <button 
          onClick={() => handleClick('info')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Info
        </button>
      </div>
    </div>
  )
}

export default App