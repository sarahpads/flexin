import React, { useState, useEffect, useRef } from "react";

import * as S from "./Background.styled";
import { Transition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { useTransition, useSpring, config, useChain } from "react-spring";

const Background: React.FC = ({ color = "#5FA8C9" }: any) => {
  // g.setAttributeNS(null, 'transform', 'translate(' + Number(ev.pageX - getOffset(el).left) + ', ' + Number(ev.pageY - getOffset(el).top) + ')');
  // circle.setAttributeNS(null, 'r', Math.sqrt(Math.pow(el.offsetWidth,2) + Math.pow(el.offsetHeight,2)));
  const [shit, setShit] = useState("");

  const transitions = useTransition(shit, null, {
    immediate: false,
    from: { transform: "scale(0,0)", fill: shit },
    enter: { transform: "scale(1,1)" },
    onRest: () => { console.log('restin', shit) },
    onDestroyed: () => { console.log('destroyed', shit) }
  });

  useEffect(() => {
    console.log(shit)
  }, [shit])

  return (
    <div>
    <button onClick={() => setShit("#8567AD")}>Purple</button>
    <button onClick={() => setShit("#5FA8C9")}>Blue</button>
    <button onClick={() => setShit("#D36962")}>Red</button>
    <button onClick={() => setShit("#F4BF6A")}>Yellow</button>

    <S.Container>
      <S.Paint>
        <S.G>
          {transitions.map(({ item, props }) => {
            return item && <S.Circle key={item} style={props}></S.Circle>;
          })}
        </S.G>
      </S.Paint>
    </S.Container>
    </div>
  )
}

export default Background;
