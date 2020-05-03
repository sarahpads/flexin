import React, { useEffect, useRef, useState } from "react";
import { useSpring, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";

import * as S from "./Leaderboard.styled";
import Standing from "../Standing/Standing";

interface LeaderboardProps {
  responses: any[]
}

const defaultHeight = 155;

const Leaderboard: React.FC<LeaderboardProps> = ({ responses = [] }) => {
  const elRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [elHeight, setElHeight] = useState();
  // const [props, set]: any = useSpring(() => ({ height: defaultHeight }))
  const [props, set]: any = useSpring(() => ({ height: 0 }))
  // TODO: order by most achieved

  useEffect(() => {
    // Give state animations enough time to finish before animating in
    setTimeout(() => set({ height: defaultHeight, config: config.wobbly }), 900);
  }, [])

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