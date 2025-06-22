import React, { useEffect, useState } from 'react';

const NotificationButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Sprawdź subskrypcję po załadowaniu
  useEffect(() => {
    if (window.OneSignal) {
      window.OneSignal.push(async () => {
        const permission = await window.OneSignal.getNotificationPermission();
        const userId = await window.OneSignal.getUserId();
        setIsSubscribed(permission === "granted" && !!userId);
      });
    }
  }, []);

  const handleClick = () => {
    if (window.OneSignal) {
      window.OneSignal.push(async () => {
        if (typeof window.OneSignal.promptForPushNotifications === 'function') {
          await window.OneSignal.promptForPushNotifications();

          // Poczekaj chwilę i sprawdź status ponownie
          setTimeout(async () => {
            const permission = await window.OneSignal.getNotificationPermission();
            const userId = await window.OneSignal.getUserId();
            setIsSubscribed(permission === "granted" && !!userId);
          }, 2000); // 2 sekundy – daje czas na kliknięcie użytkownika
        }
      });
    }
  };

  if (isSubscribed) return null;

  return (
    <button onClick={handleClick} className="btn btn-outline-light ms-2">
      Włącz powiadomienia
    </button>
  );
};

export default NotificationButton;
