import { useEffect, useState } from "react";
import { differenceInMilliseconds, parseISO } from "date-fns";

export const useCountProgress = (from: string, due: string) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!from || !due) {
      return;
    }

    const fromDate = parseISO(from);
    const dueDate = parseISO(due);

    const total = differenceInMilliseconds(dueDate, fromDate);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = differenceInMilliseconds(dueDate, now);

      if (diff <= 0) {
        setProgress(0);
        clearInterval(interval);
        return;
      }

      setProgress((diff / total) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [from, due]);

  return progress;
};
