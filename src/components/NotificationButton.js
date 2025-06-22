import React from 'react';
import OneSignal from 'react-onesignal';

const NotificationButton = () => {
  const handleClick = async () => {
    try {
      await OneSignal.showSlidedownPrompt(); // pokazuje popup zgody
    } catch (error) {
      console.error('Błąd wyświetlania promptu:', error);
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-outline-primary">
      Włącz powiadomienia
    </button>
  );
};

export default NotificationButton;
