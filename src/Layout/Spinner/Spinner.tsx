import React from "react";

import * as S from "./Spinner.styled";
import useRandomPalette from "../use-random-palette";

const Spinner: React.FC = () => {
  return (
    <S.Spinner>
      <S.Waffle src="/food.svg"/>
      <S.Message>Loading...</S.Message>
    </S.Spinner>
  );
};

export default Spinner;