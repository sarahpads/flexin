import React from "react";
import { gql, useQuery } from "@apollo/client";

import * as S from "./Leaderboard.styled";
import Standing from "../Layout/Standing/Standing";
import PWA from "../Layout/PWA/PWA";
import { UserStanding } from "./leaderboard.types";

interface LeaderboardProps {
  standings: UserStanding[]
}

// TODO: make sure this updates with new responses
const Leaderboard: React.FC<LeaderboardProps> = ({ standings }) => {
  return (
    <S.Leaderboard>
      <S.Ranks>
        {standings && standings.map((standing: UserStanding, index: number) => {
          return <Standing key={standing.user.id} user={standing.user} rank={index + 1} waffles={standing.waffles}/>
        })}
      </S.Ranks>

      <PWA/>
    </S.Leaderboard>
  )
}

export default Leaderboard;
