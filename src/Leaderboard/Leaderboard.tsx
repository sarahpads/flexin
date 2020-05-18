import React from "react";
import { gql, useQuery } from "@apollo/client";

import * as S from "./Leaderboard.styled";
import Spinner from "../Layout/Spinner/Spinner";
import Error from "../Layout/Error/Error";
import Standing from "../Layout/Standing/Standing";
import PWA from "../Layout/PWA/PWA";
import useLeaderboard from "./use-leaderboard";
import { UserStanding } from "./leaderboard.types";

interface Result {
  users: { id: string, name: string }[],
  challenges: {
    id: string;
    responses: { user: { id: string }, flex: number }[]
  }[]
}

const GET_DATA = gql`
  query {
    users {
      id,
      name
    },
    challenges {
      id,
      responses {
        user { id },
        flex
      }
    }
  }
`

// TODO: make sure this updates with new responses
const Leaderboard: React.FC = () => {
  const result = useQuery<Result>(GET_DATA);
  const standings = useLeaderboard(result.data?.users, result.data?.challenges)

  if (result.loading) {
    return <Spinner/>
  }

  if (result.error) {
    return <Error error={result.error}/>
  }

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
