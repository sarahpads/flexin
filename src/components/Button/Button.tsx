import React, { useContext } from "react";

import * as S from "../Button.styled";
import ThemeContext from "../ThemeProvider";

interface ButtonProps {
  children: React.ElementRef<any>;
  onClick: Function;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  const palette = useContext(ThemeContext);
  console.log(palette)

  return (
    <S.Button
      color={palette?.neutral}
      onClick={(event: DocumentEvent) => onClick(event)}>
      {children}
    </S.Button>
  )
}

export default Button;