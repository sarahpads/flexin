import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";

import * as S from "./Leaderboard.styled";
import Standing from "../Standing/Standing";

interface LeaderboardProps {
  responses: any[]
}

const defaultHeight = 155;

const Leaderboard: React.FC<LeaderboardProps> = () => {
  const elRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [elHeight, setElHeight] = useState();
  const [props, set]: any = useSpring(() => ({ height: defaultHeight }))
  // order by most achieved
  const responses = [6, 10, 8, 5, 1];

  useEffect(() => {
    console.log(elRef.current?.offsetHeight)
    setElHeight(elRef.current?.offsetHeight);
    // TOOD: make this conditional on number of responses
  }, [elRef]);

  const bind = useDrag(({
    memo = [props.height.getValue()],
    movement: [, my]
  }) => {
    set({
      height: clamp(memo[0] + my * -1, defaultHeight, elHeight),
      config: config.wobbly
    });
    return memo;
  }, {
    axis: "y"
  })

  const style = {
    bottom: 0,
    backgroundColor: "white",
    borderRadius: "20px 20px 0 0",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
    overflow: "hidden",
    position: "absolute",
    touchAction: "none",
    width: "100%",
    zIndex: 5
  }

  return <animated.div {...bind()} style={{ ...style, ...props}}>
    <S.Leaderboard ref={elRef}>
      <S.Title>Leaderboard</S.Title>
      {responses.map((response: any, index: number) => {
        return <Standing key={index} response={response} rank={index}></Standing>
      })}
    </S.Leaderboard>
  </animated.div>
}

export default Leaderboard;