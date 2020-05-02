import React, { useState, useEffect } from "react";
import { FaMedal } from "react-icons/fa";

import * as S from "./Standing.styled";
import { IconContext } from "react-icons";

interface StandingProps {
  response: any;
  rank: number;
}

enum Medals {
  "#F4D466" = 0,
  "#D5D6E8" = 1,
  "#F09A5C" = 2
}

const Standing: React.FC<StandingProps> = ({
  response,
  rank
}) => {
  const [medal, setMedal] = useState();

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
      <S.Name>Dude Rock</S.Name>
      <S.Flex>150%</S.Flex>
    </S.Standing>
  )
}

export default Standing;