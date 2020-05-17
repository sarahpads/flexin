import React, { useState, useEffect } from "react";
import ordinal from "ordinal/indicator";

import * as S from "./Header.styled";
import ProfilePicture from "../../Layout/ProfilePicture/ProfilePicture";
import { IconContext } from "react-icons";
import { GiQueenCrown } from "react-icons/gi";

interface HeaderProps {
  rank: number;
  waffles: number;
}

const Header: React.FC<HeaderProps> = ({
  rank,
  waffles
}) => {
  const [suffix, setSuffix] = useState();

  useEffect(() => {
    setSuffix(ordinal(rank));
  }, [rank])

  return (
    <S.Header>
      <S.Section>
        <S.Number>{rank}</S.Number>{suffix}
      </S.Section>

      <S.Section>
        <S.Picture>
          <S.Crown>
            {rank === 1 && <IconContext.Provider value={{ color: "#F4D466", size: "3rem" }}>
              <GiQueenCrown/>
            </IconContext.Provider>}
          </S.Crown>

          <ProfilePicture size={"7rem"} />
        </S.Picture>
      </S.Section>

      <S.Section>
        <S.Number>{waffles}</S.Number>wfls
      </S.Section>

    </S.Header>
  )
}

export default Header;
