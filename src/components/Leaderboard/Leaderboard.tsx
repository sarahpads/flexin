import React, { useContext, useEffect, useRef, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";

import * as S from "./Leaderboard.styled";
import Standing from "../Standing/Standing";
import ThemeContext from "../ThemeProvider";

interface LeaderboardProps {
  responses: any[]
}

const defaultY = -151;
const defaultHeight = 155;

const Leaderboard: React.FC<LeaderboardProps> = () => {
  const palette = useContext(ThemeContext);
  const elRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [elHeight, setElHeight] = useState();
  // order by most achieved
  const responses = [6, 10, 8, 5, 1];
  const [props, set]: any = useSpring(() => ({ height: defaultHeight }))

  useEffect(() => {
    console.log(elRef.current?.offsetHeight)
    setElHeight(elRef.current?.offsetHeight);
    // TOOD: make this conditional on number of responses
  }, [elRef]);

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag((props2) => {
    const { memo = [props.height.getValue()], velocity, direction: [, yDir], offset: [ox, oy], down, movement: [mx, my] } = props2;

    set({
      height: clamp(memo[0] + my * -1, defaultHeight, elHeight),
      config: config.wobbly
    });

    // console.log(memo[0], (my * -1), memo[0] + (my * -1));
    // set({ height: memo[0] + (my * -1), immediate: down });
    return memo;

    // return set({ y: oy + defaultY });
    const trigger = velocity > 1;
    const dir = yDir < 0 ? -1 : 1;

    if (trigger) {
      dir === -1
        ? open()
        : close()
    }

    console.log(memo, props2)
    set({ height: oy, immediate: false, config: config.stiff })
  }, {
    // bounds: { top: elHeight, bottom: defaultHeight },
    // bounds: { top: elHeight * -1, bottom: defaultHeight },

    // bounds: { left: -100, right: 100, top: -50, bottom: 50 },
    axis: "y"
  })

  const open = () => {
    console.log("open")
    set({ height: "auto", config: config.wobbly })
  }

  const close = () => {
    console.log("close")
    set({ height: defaultHeight, config: config.wobbly })
  }

  const style = {
    bottom: 0,
    // background: "white",
    // borderRadius: "20px",
    // paddingBottom: "10rem",
    backgroundColor: "white",
    borderRadius: "20px 20px 0 0",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
    overflow: "hidden",
    position: "absolute",
    touchAction: "none",
    // top: "100%",
    width: "100%",
    zIndex: 5
  }

  // Bind it to a component
  // @ts-ignore
  return <animated.div {...bind()} style={{ ...style, ...props}}>
    <S.Leaderboard ref={elRef}>
      <S.Title color={palette?.neutral}>Leaderboard</S.Title>
      {responses.map((response: any, index: number) => {
        return <Standing key={index} response={response} rank={index}></Standing>
      })}
    </S.Leaderboard>
  </animated.div>
}

export default Leaderboard;