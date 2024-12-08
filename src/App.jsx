import React, { useState, useRef } from 'react';
import 'remixicon/fonts/remixicon.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null); // Persistent reference for the timer

  // Format time into MM:SS:MS
  const formatTime = (time) => {
    const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const milliseconds = `0${Math.floor(time / 10) % 100}`.slice(-2);

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  // Start or pause the timer
  const handlePlayPause = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      setIsRunning(true);
    }
  };

  // Reset the timer
  const handleReset = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false);
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col min-h-screen">
        <div className="bg-gray-600 h-[600px] w-[400px] text-white flex items-center justify-center rounded-3xl relative">
          <i
            className="ri-refresh-line absolute top-4 right-4 text-2xl cursor-pointer"
            onClick={handleReset}
          ></i>
          <div className="h-[500px] w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center rounded-full">
            <h1 className="font-bold text-5xl">{formatTime(time)}</h1>
          </div>
          <i
            className={`ri-${isRunning ? 'pause' : 'play'}-fill absolute bottom-2 text-4xl cursor-pointer`}
            onClick={handlePlayPause}
          ></i>
        </div>
      </div>
    </>
  );
};

export default App;
