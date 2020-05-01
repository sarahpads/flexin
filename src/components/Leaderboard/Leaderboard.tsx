import React, { useContext, useEffect, useRef, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { useDrag } from "react-use-gesture";

import * as S from "./Leaderboard.styled";
import Standing from "../Standing/Standing";
import ThemeContext from "../ThemeProvider";

interface LeaderboardProps {
  responses: any[]
}

const defaultY = -151;

const Leaderboard: React.FC<LeaderboardProps> = () => {
  const palette = useContext(ThemeContext);
  const elRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [height, setHeight] = useState();
  // order by most achieved
  const responses = [6, 10, 8, 5, 1];
  const [props, set]: any = useSpring(() => ({ y: defaultY }))

  useEffect(() => {
    console.log(elRef.current?.offsetHeight)
    setHeight(elRef.current?.offsetHeight);
  }, [elRef]);

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag((props) => {
    const { velocity, direction: [, yDir], offset: [, oy], down, movement: [mx, my] } = props;

    // return set({ y: oy + defaultY });

    const trigger = velocity > 1;
    const dir = yDir < 0 ? -1 : 1;

    if (trigger) {
      console.log("triggered", dir)
      return dir === -1
        ? open()
        : close()
    }

    if (Math.abs(oy) > height || oy + defaultY > defaultY) {
      return;
    }

    return set({ y: oy + defaultY, immediate: false, config: config.stiff })
  })

  const open = () => {
    console.log("open")
    set({ y: (height - 20) * -1, config: config.wobbly })
  }

  const close = () => {
    console.log("close")
    set({ y: defaultY, config: config.wobbly })
  }

  const style = {
    background: "white",
    borderRadius: "20px",
    paddingBottom: "10rem",
    position: "absolute",
    touchAction: "none",
    top: "100%",
    width: "100%",
    zIndex: 5
  }

  // Bind it to a component
  // @ts-ignore
  return <animated.div {...bind()} style={{ ...style, transform: props.y.interpolate((y) => {
    return `translateY(${y}px)`
  })}}>
    <S.Leaderboard ref={elRef}>
      <S.Title color={palette?.neutral}>Leaderboard</S.Title>
      {responses.map((response: any, index: number) => {
        return <Standing key={index} response={response} rank={index}></Standing>
      })}
    </S.Leaderboard>
  </animated.div>
}

export default Leaderboard;