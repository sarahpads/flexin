import { useState, useEffect } from "react";
import { DateTime } from "luxon";

export default function useCountdown(date: string) {
  const [secondsLeft, setSecondsLeft] = useState();

  useEffect(() => {
    const dateTime = DateTime.fromISO(date);

    const interval: any = setInterval(() => {
      const seconds = getSeconds(dateTime);

      if (!seconds) {
        return clearInterval(interval);
      }

      setSecondsLeft(seconds);
    }, 1000)

    setSecondsLeft(getSeconds(dateTime));

    return () => clearInterval(interval);
  }, [date]);

  return secondsLeft;
}

function getSeconds(date: DateTime) {
  const seconds = date.diffNow().as("seconds");

  return Math.floor(seconds)
}