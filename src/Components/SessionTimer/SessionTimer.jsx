import React, { useState, useEffect } from 'react';
import './SessionTimer.css';

const SessionTimer = () => {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const loginTime = localStorage.getItem("customerLoginTime");
    if (!loginTime) return;

    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - parseInt(loginTime)) / 1000);
      const timeLeft = 600 - elapsed;

      if (timeLeft <= 0) {
        alert("⏰ Session expired. Please log in again.");
        localStorage.clear();
        window.location.href = "/customer/login";
      } else {
        setRemaining(timeLeft);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (remaining === null) return null;

  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
  const seconds = String(remaining % 60).padStart(2, '0');

  return (
    <div className="session-timer-below">
      <strong>Session expires in:</strong> {minutes}:{seconds}
    </div>
  );
};

export default SessionTimer;
