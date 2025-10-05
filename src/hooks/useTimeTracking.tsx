import { useState, useEffect, useRef } from 'react';

export const useTimeTracking = (activityType: string, activityId: string, isActive: boolean = true) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now();
      
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setTimeSpent(elapsed);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const resetTimer = () => {
    setTimeSpent(0);
    startTimeRef.current = Date.now();
  };

  const getFormattedTime = () => {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    return `${minutes}m ${seconds}s`;
  };

  return {
    timeSpent,
    resetTimer,
    getFormattedTime
  };
};
