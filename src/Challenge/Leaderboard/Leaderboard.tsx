import React, { useEffect, useRef, useState } from "react";
import { useSpring, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";

import * as S from "./Leaderboard.styled";
import Standing from "../Standing/Standing";

interface LeaderboardProps {
  responses: {
    user: {
      name: string;
      id: string;
    };
    reps: number;
    flex: number;
  }[]
}

const defaultHeight = 155;
const defaultArrayProp: any = [];

const Leaderboard: React.FC<LeaderboardProps> = ({ responses = defaultArrayProp }) => {
  const elRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [elHeight, setElHeight] = useState();
  const [props, set] = useSpring(() => ({ height: 0 }))

  useEffect(() => {
    // Give state route transitions enough time to finish before animating in
    setTimeout(() => set({ height: defaultHeight, config: config.wobbly }), 900);
  }, [set])

  useEffect(() => {
    setElHeight(elRef.current?.offsetHeight);
  }, [elRef, responses]);

  const bind = useDrag(({
    memo = [props.height.getValue()],
    movement: [, my]
  }) => {
    set({
      height: clamp(memo[0] + my * -1, defaultHeight, elHeight),
      config: config.wobbly
    });

    return memo;
  }, { axis: "y" });

  return (
    <S.AnimatedLeaderboard {...bind()} style={props}>
      <S.Leaderboard ref={elRef}>
        <S.Title>Leaderboard</S.Title>
        {responses.map((response: any, index: number) => {
          return <Standing key={index} response={response} rank={index}></Standing>
        })}
      </S.Leaderboard>
    </S.AnimatedLeaderboard>
  )
}

export default Leaderboard;