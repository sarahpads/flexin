import React, { useContext } from "react";

import * as S from "./Graphic.styled";
import ThemeContext from "../../components/ThemeProvider";

export const Graphic: React.FC = () => {
  const palette = useContext(ThemeContext);

  return <S.Graphic background={palette?.dark}/>
}

export default Graphic;
