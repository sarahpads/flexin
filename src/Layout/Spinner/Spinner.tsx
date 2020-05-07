import React from "react";
import { MdFitnessCenter } from "react-icons/md";
import { IconContext } from "react-icons";

import * as S from "./Spinner.styled";
import useRandomPalette from "../use-random-palette";

const Spinner: React.FC = () => {
  const palette = useRandomPalette();

  return (
    <S.Spinner>

      <S.Icon>
        <IconContext.Provider value={{ color: palette.dark, size: "5rem" }}>
          <MdFitnessCenter/>
        </IconContext.Provider>
      </S.Icon>

      <S.Message color={palette.dark}>Loading...</S.Message>
    </S.Spinner>
  )
}

export default Spinner;