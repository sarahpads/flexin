import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

import * as S from "./Timer.styled";
import useCountdown from "../../hooks/use-countdown";

interface TimerProps {
  expiresAt: string;
  date: string;
}

const Timer: React.FC<TimerProps> = ({ expiresAt, date }) => {
  const seconds = useCountdown(expiresAt)
  const [progress, setProgress] = useState();

  useEffect(() => {
    const createdAt = DateTime.fromISO(date);
    const totalSeconds = DateTime.fromISO(expiresAt).diff(createdAt).as("seconds");

    setProgress(seconds/totalSeconds)
  }, [seconds, date, expiresAt])

  return (
    <S.Timer>
      <S.Countdown>
        <S.CountdownSeconds>{seconds}</S.CountdownSeconds>
        <S.CountdownLabel>seconds left</S.CountdownLabel>
      </S.Countdown>

      <S.SVG>
        <S.G>
          <S.Circle progress={progress}/>
        </S.G>
      </S.SVG>
    </S.Timer>
  )
}

export default Timer;
