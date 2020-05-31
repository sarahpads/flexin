import React from "react";

import * as S from "./WithBackground.styled";
import { Palette } from "../../theme";
import useRandomPalette from "../../Layout/use-random-palette";

type Origin = "top right" | "bottom left";
type Animation = "fade" | "clip";

interface WithBackgroundProps {
  origin?: Origin;
  animateOut?: boolean;
  palette?: Palette;
  animation?: Animation;
}

const WithBackground = <T extends {}>(Component: React.ComponentType<T>, {
  animation = "fade",
  animateOut = false,
  origin = "bottom left",
  palette: p = {} as Palette
}: WithBackgroundProps = {}) => {
  function Wrapper(props: T) {
    const palette = useRandomPalette();

    return (
      <S.Container palette={palette} animateOut={animateOut} origin={origin}>
        <S.Component animateOut={animateOut} animation={animation}>
          <Component {...props}/>
        </S.Component>
      </S.Container>
    );
  }

  return Wrapper;
};

export default WithBackground;
