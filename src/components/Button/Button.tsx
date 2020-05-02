import React from "react";

import * as S from "./Button.styled";

interface ButtonProps {
  children: React.ElementRef<any>;
  onClick?: Function;
}

const Button: React.FC<ButtonProps> = ({ onClick = () => {}, children }) => {
  return (
    <S.Button onClick={() => onClick()}>
      {children}
    </S.Button>
  )
}

export default Button;