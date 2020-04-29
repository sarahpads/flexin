import React, { useContext } from "react";

import * as S from "./Button.styled";
import ThemeContext from "../ThemeProvider";

interface ButtonProps {
  children: React.ElementRef<any>;
  onClick?: Function;
}

const Button: React.FC<ButtonProps> = ({ onClick = () => {}, children }) => {
  const palette = useContext(ThemeContext);

  return (
    <S.Button
      onClick={() => onClick()}
      color={palette?.neutral}>
      {children}
    </S.Button>
  )
}

export default Button;