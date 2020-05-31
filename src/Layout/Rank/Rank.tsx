import React, { useState, useEffect, useContext } from "react";
import { FaMedal } from "react-icons/fa";

import * as S from "./Rank.styled";
import { IconContext } from "react-icons";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { AuthContext } from "../../Auth/AuthProvider";

interface RankProps {
  percentage?: number;
  waffles?: number;
  rank: number;
  user: {
    name: string;
    id: string;
  };
}

enum Medals {
  "#F4D466" = 1,
  "#D5D6E8" = 2,
  "#F09A5C" = 3
}

const Rank: React.FC<RankProps> = ({
  percentage,
  rank,
  user,
  waffles
}) => {
  const { profile } = useContext(AuthContext);
  const [medal, setMedal] = useState();
  const [flex, setFlex] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    const names = user.name.split(" ");
    const lastInitial = names[1]
      ? `${names[1].charAt(0)}.`
      : undefined;

    setName([names[0], lastInitial].join(" "));
  }, [user]);

  useEffect(() => {
    if (percentage === undefined) {
      return;
    }

    setFlex(`${percentage * 100}%`);
  }, [percentage]);

  useEffect(() => {
    setMedal(Medals[rank]);
  }, [rank]);

  return (
    <S.Standing highlight={profile.sub === user.id}>
      <S.Rank>
        {medal
          ? <IconContext.Provider value={{ color: medal, size: "2.5rem" }}>
            <FaMedal/>
          </IconContext.Provider>
          : <span>{rank}</span>
        }
      </S.Rank>

      <S.Avatar>
        <ProfilePicture id={user.id}/>
      </S.Avatar>
      <S.Name>{name}</S.Name>

      {flex && <S.Flex>{flex} flex</S.Flex>}

      {waffles !== undefined && <S.Waffles>
        <S.WaffleCount>{waffles} x </S.WaffleCount>
        <S.Waffle src="/waffle.png"/>
      </S.Waffles>}

    </S.Standing>
  );
};

export default Rank;