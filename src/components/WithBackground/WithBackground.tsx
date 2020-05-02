import React, { useState, useEffect } from "react";

import * as S from "./WithBackground.styled";
import theme, { getRandomPalette, Palette } from "../../theme";

type Origin = "top-right" | "bottom-left";

interface WithBackgroundProps {
  origin?: Origin;
  animateOut?: boolean;
  palette?: Palette;
}

const WithBackground = <T extends {}>(Component: React.ComponentType<T>, {
  animateOut = false,
  origin = "bottom-left",
  palette: p = {} as Palette
}: WithBackgroundProps = {}) => {
  function Wrapper(props: T) {
    const [palette, setPalette] = useState(p);

    useEffect(() => {
      const p: string = getRandomPalette();
      setPalette(theme.colors[p]);
    }, [])

    return (
      <S.Container palette={palette}>
        <S.Component animateOut={animateOut}>
          <Component {...props}/>
        </S.Component>

        <S.SVG>
          <S.G origin={origin}>
            <S.Circle animateOut={animateOut}/>
          </S.G>
        </S.SVG>
      </S.Container>
    )
  }

  return Wrapper;
}

export default WithBackground;
