import React, { useState, useEffect } from "react";
import ordinal from "ordinal/indicator";
import { IconContext } from "react-icons";
import { GiQueenCrown } from "react-icons/gi";

import * as S from "./Header.styled";
import ProfilePicture from "../../Layout/ProfilePicture/ProfilePicture";
import { Standing } from "../../Challenge/challenge.types";

interface HeaderProps {
  standing: Standing;
}

const Header: React.FC<HeaderProps> = ({
  standing
}) => {
  const [suffix, setSuffix] = useState();

  useEffect(() => {
    if (!standing) {
      return;
    }

    setSuffix(ordinal(standing.rank));
  }, [standing]);

  if (!standing) {
    return <></>;
  }

  return (
    <S.Header>
      <S.Section>
        <S.Number>{standing.rank}</S.Number>{suffix}
      </S.Section>

      <S.Section>
        <S.Picture>
          <S.Crown>
            {standing.rank === 1 && <IconContext.Provider value={{ color: "#F4D466", size: "3rem" }}>
              <GiQueenCrown/>
            </IconContext.Provider>}
          </S.Crown>

          <ProfilePicture size={"7rem"} id={standing.user.id}/>
        </S.Picture>
      </S.Section>

      <S.Section>
        <S.Number>{standing.waffles}</S.Number>wfls
      </S.Section>

    </S.Header>
  );
};

export default Header;
