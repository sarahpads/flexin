import React, { useState, useEffect } from "react";

import * as S from "./WithBackground.styled";
import theme, { getRandomPalette, Palette } from "../../theme";

const WithBackground = (Component: any) => {
  function Wrapper() {
    const [palette, setPalette] = useState({} as Palette);

    useEffect(() => {
      const p: string = getRandomPalette();
      setPalette(theme.colors[p]);
    }, [])

    return (
      <S.Container palette={palette}>
        <S.Component>
          <Component/>
        </S.Component>

        <S.SVG>
          <S.G>
            <S.Circle/>
          </S.G>
        </S.SVG>
      </S.Container>
    )
  }

  return Wrapper;
}

export default WithBackground;
