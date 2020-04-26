import React, { useState, useEffect } from "react";

import * as S from "./Background.styled";
import theme from "../../theme";
import { useLocation } from "react-router-dom";

interface Circle {
  color: string;
  id: string;
}

const Background = (Component: any) => {
  function Wrapper() {
    const location = useLocation();
    const colors: string[] = [
      theme.colors.palettePurple.neutral,
      theme.colors.paletteBlue.neutral,
      theme.colors.paletteRed.neutral,
      theme.colors.paletteYellow.neutral
    ];

    const [color, setColor] = useState("transparent");

    useEffect(() => {
      // const index: number = Math.floor(Math.random() * 3);
      let background;

      switch (location.pathname) {
        case "/test1":
          background = colors[0];
          break;

        case "/test2":
          background = colors[1];
          break;

        case "/test3":
          background = colors[2];
          break;

        case "/test4":
          background = colors[3];
          break;
      }

      setColor(background as string);
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

export default Background;
