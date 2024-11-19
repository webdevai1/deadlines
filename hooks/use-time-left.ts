import { useEffect, useState } from "react";
import { differenceInMilliseconds, parseISO } from "date-fns";

const calculateTimeLeft = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)) % 365;
  const years = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 365));

  return { days, hours, minutes, seconds, years };
};

export const useTimeLeft = (due: string) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    years: 0,
  });

  useEffect(() => {
    if (!due) {
      return;
    }
    const dueDate = parseISO(due);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = differenceInMilliseconds(dueDate, now);

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, years: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft(calculateTimeLeft(diff));
    }, 1000);

    return () => clearInterval(interval);
  }, [due]);

  return timeLeft;
};
