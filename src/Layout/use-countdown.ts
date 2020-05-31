import { useState, useEffect } from "react";
import { DateTime } from "luxon";

export default function useCountdown(date: string): number {
  const [secondsLeft, setSecondsLeft] = useState();

  useEffect(() => {
    const dateTime = DateTime.fromISO(date);

    const interval: number = setInterval((): void => {
      const seconds = getSeconds(dateTime);

      if (seconds < 0) {
        return clearInterval(interval);
      }

      setSecondsLeft(seconds);
    }, 1000);

    setSecondsLeft(getSeconds(dateTime));

    return (): void => clearInterval(interval);
  }, [date]);

  return secondsLeft;
}

function getSeconds(date: DateTime) {
  const seconds = date.diffNow().as("seconds");

  return Math.floor(seconds);
}
