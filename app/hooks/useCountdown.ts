"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EMPTY: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export const useCountdown = (targetDate: Date) => {
  const target = targetDate.getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(EMPTY);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      const difference = target - Date.now();
      const next = difference > 0 ? {
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      } : EMPTY;
      setTimeLeft((previous) =>
        previous.days === next.days && previous.hours === next.hours &&
        previous.minutes === next.minutes && previous.seconds === next.seconds
          ? previous : next,
      );
      if (difference > 0 && !document.hidden) timer = setTimeout(update, 1000);
    };
    const syncVisibility = () => {
      clearTimeout(timer);
      if (!document.hidden) timer = setTimeout(update, 0);
    };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, [target]);

  return timeLeft;
};
