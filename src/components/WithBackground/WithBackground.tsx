import React, { useState, useEffect } from "react";

import * as S from "./WithBackground.styled";
import theme, { getRandomTheme } from "../../theme";

const WithBackground = (Component: any) => {
  function Wrapper() {
    const [color, setColor] = useState("transparent");

    useEffect(() => {
      const palette: string = getRandomTheme();
      setColor(theme.colors[palette].neutral);
    }, [])

    return (
      <S.Container>
        <S.Component>
          <Component/>
        </S.Component>

        <S.SVG>
          <S.G>
            <S.Circle color={color}></S.Circle>
          </S.G>
        </S.SVG>
      </S.Container>
    )
  }

  return Wrapper;
}

export default WithBackground;
