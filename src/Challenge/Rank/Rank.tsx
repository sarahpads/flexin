import React, { useEffect, useState } from "react";
import ordinal from "ordinal/indicator";

import * as S from "./Rank.styled";
import { Challenge } from "../challenge.types";
import useRank from "../use-rank";

interface RankProps {
  challenge: Challenge;
}

const Rank: React.FC<RankProps> = ({ challenge }) => {
  const rank = useRank(challenge)
  const [suffix, setSuffix] = useState();

  useEffect(() => {
    setSuffix(ordinal(rank));
  }, [rank])

  return (
    <S.Rank>
      <S.Number>{rank}</S.Number>
      <S.Suffix>{suffix}</S.Suffix>
    </S.Rank>
  )
}

export default Rank;