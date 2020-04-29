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
  const [totalSeconds, setTotalSeconds] = useState();
  const [complete, setComplete] = useState();

  useEffect(() => {
    const createdAt = DateTime.fromISO(date);
    const seconds = DateTime.fromISO(expiresAt).diff(createdAt).as("seconds");

    setTotalSeconds(seconds);
  }, [expiresAt])

  // TODO: use transition duration instead of setting
  useEffect(() => {
    const percent = seconds / totalSeconds;

    setComplete(764 * (1 - percent));
  }, [seconds])

  return (
    <S.Timer>
      <S.Countdown>
        <S.CountdownSeconds>{seconds}</S.CountdownSeconds>
        <S.CountdownLabel>seconds left</S.CountdownLabel>
      </S.Countdown>

      <S.SVG>
        <S.G>
          <S.Circle background={palette?.dark} total={754} complete={complete}/>
        </S.G>
      </S.SVG>
    </S.Timer>
  )
}

export default Timer;
