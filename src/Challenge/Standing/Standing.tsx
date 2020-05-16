import React, { useState, useEffect } from "react";
import { FaMedal } from "react-icons/fa";

import * as S from "./Standing.styled";
import { IconContext } from "react-icons";
import { Response } from "../challenge.types";

interface StandingProps {
  percentage?: number;
  waffles?: number;
  rank: number;
  userName: number;
}

enum Medals {
  "#F4D466" = 0,
  "#D5D6E8" = 1,
  "#F09A5C" = 2
}

const Standing: React.FC<StandingProps> = ({
  percentage,
  rank,
  userName,
  waffles
}) => {
  const [medal, setMedal] = useState();
  const [flex, setFlex] = useState();

  useEffect(() => {
    if (percentage === undefined) {
      return;
    }

    setFlex(`${percentage * 100}%`);
  }, [percentage]);

  useEffect(() => {
    setMedal(Medals[rank]);
  }, [rank])

  return (
    <S.Standing>
      <S.Rank>
        {medal
          ? <IconContext.Provider value={{ color: medal, size: "2.5rem" }}>
              <FaMedal/>
            </IconContext.Provider>
          : <span>{rank}</span>
        }
      </S.Rank>

      <S.Avatar/>
      <S.Name>{userName}</S.Name>

      <S.Waffles>
        <S.WaffleCount>{waffles} x </S.WaffleCount>
        <S.Waffle src="/waffle.png"/>
      </S.Waffles>

      {flex && <S.Flex>{flex}</S.Flex>}
    </S.Standing>
  )
}

export default Standing;