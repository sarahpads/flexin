import React from "react";

import * as S from "./Leaderboard.styled";
import PWA from "../../Layout/PWA/PWA";
import { Standing } from "../challenge.types";
import Rank from "../../Layout/Rank/Rank";

interface LeaderboardProps {
  standings: Standing[];
}

// TODO: make sure this updates with new responses
const Leaderboard: React.FC<LeaderboardProps> = ({ standings }) => {
  return (
    <S.Leaderboard>
      <S.Ranks>
        {standings && standings.map((standing: Standing) => {
          return <Rank key={standing.user.id} user={standing.user} rank={standing.rank} waffles={standing.waffles}/>;
        })}
      </S.Ranks>

      <PWA/>
    </S.Leaderboard>
  );
};

export default Leaderboard;
