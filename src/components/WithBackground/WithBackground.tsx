import React, { useState, useEffect } from "react";

import * as S from "./WithBackground.styled";
import theme, { getRandomPalette } from "../../theme";
import ThemeContext from "../ThemeProvider";

const WithBackground = (Component: any) => {
  function Wrapper() {
    const [palette, setPalette] = useState();

    useEffect(() => {
      const p: string = getRandomPalette();
      setPalette(theme.colors[p]);
    }, [])

    return (
      <S.Container>
        <S.Component>
          <ThemeContext.Provider value={palette}>
            <Component/>
          </ThemeContext.Provider>
        </S.Component>

        <S.SVG>
          <S.G>
            <S.Circle color={palette?.neutral}></S.Circle>
          </S.G>
        </S.SVG>
      </S.Container>
    )
  }

  return Wrapper;
}

export default WithBackground;
