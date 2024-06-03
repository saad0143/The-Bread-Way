import React, { useEffect, useState } from "react";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    if (data && data.endDate) {
      function calculateTimeLeft() {
        const difference = +new Date(data.endDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }

        return timeLeft;
      }

      const updateTimer = () => {
        const newTimeLeft = calculateTimeLeft();
        setTimeLeft(newTimeLeft);

        if (Object.keys(newTimeLeft).length === 0) {
          clearTimeout(timer);
        }
      };

      const timer = setInterval(updateTimer, 1000);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span key={interval} className="text-25 text-475ad2">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-red text-25">Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;
