import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import * as S from "./Background.styled";
import { Transition, TransitionGroup } from "react-transition-group";

interface Circle {
  color: string;
  id: string;
}

const Background: React.FC<{ color: string }> = ({ color = "transparent" }) => {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const circle = {
      color,
      id: uuid()
    };

    setCircles([...circles, circle]);
  }, [color])

  function onEntered(circle: Circle) {
    const index = circles.findIndex((c) => c.id === circle.id);
    console.log(index)
    // setCircles(circles.slice(0, index - 1));
  }

  // TODO: for routing animations, accept children and animate them in?
  return (
    <S.Container>
      <S.Paint>
        <S.G>
          <TransitionGroup appear={true} component={null}>
            {circles.map((circle: Circle, index: number) => {
              // TODO: include guid with color to allow two colors to animate at once
              return <Transition appear={true} key={circle.id} timeout={800} onEntered={() => onEntered(circle)}>
                {(state: any) => {
                  return <S.Circle state={state} color={circle.color}></S.Circle>;
                }}
              </Transition>
            })}
          </TransitionGroup>
        </S.G>
      </S.Paint>
    </S.Container>
  )
}

export default Background;
