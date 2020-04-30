import React, { useEffect, useState, useContext } from "react";
import useCountdown from "../../hooks/use-countdown";
import { DateTime } from "luxon";

import * as S from "./Timer.styled";
import ThemeContext from "../ThemeProvider";

interface TimerProps {
  expiresAt: string;
  date: string;
}

const Timer: React.FC<TimerProps> = ({ expiresAt, date }) => {
  const seconds = useCountdown(expiresAt)
  const palette = useContext(ThemeContext);
  const [progress, setProgress] = useState();

  useEffect(() => {
    const createdAt = DateTime.fromISO(date);
    const totalSeconds = DateTime.fromISO(expiresAt).diff(createdAt).as("seconds");

    setProgress(seconds/totalSeconds)
  }, [seconds])

  return (
    <S.Timer>
      <S.Countdown>
        <S.CountdownSeconds>{seconds}</S.CountdownSeconds>
        <S.CountdownLabel>seconds left</S.CountdownLabel>
      </S.Countdown>

      <S.SVG>
        <S.G>
          <S.Circle background={palette?.dark} progress={progress}/>
        </S.G>
      </S.SVG>
    </S.Timer>
  )
}

export default Timer;
