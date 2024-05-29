import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTimeRef.current);
      }, 100); // Update interval to 100 milliseconds
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, elapsedTime]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = timeInMilliseconds % 1000;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <p>{formatTime(elapsedTime)}</p>
      <button onClick={isRunning ? stopStopwatch : startStopwatch}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
}

export default Stopwatch
