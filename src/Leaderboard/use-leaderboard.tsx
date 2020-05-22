import { useState, useEffect, useContext } from "react";

import { UserStanding } from "./leaderboard.types";
import { AuthContext } from "../Auth/AuthProvider";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { Challenge, Response } from "../Challenge/challenge.types";

interface User {
  name: string;
  id: string
}

interface ResponseResult {
  newResponse: Response
}

interface ChallengeResult {
  latestChallenge: Challenge;
}

interface Result {
  users: User[],
  leaderboard: Challenge[]
}

const GET_DATA = gql`
  query {
    users { id, name }
    leaderboard {
      id,
      user { name, id },
      exercise { title, id },
      createdAt,
      expiresAt,
      responses { user { name, id }, reps, flex }
    }
  }
`

const NEW_RESPONSE = gql`
  subscription {
    newResponse {
      user { name, id },
      reps,
      flex
    }
  }
`

const NEW_CHALLENGE = gql`
  subscription {
    newChallenge {
      id,
      user { name, id },
      exercise { title, id },
      createdAt,
      expiresAt,
      responses { user { name, id }, reps, flex }
    }
  }
`

// subscription for "challengeResult"
// which will send along updated challengeResponses, with populated
// rank and score fields

export default function useLeaderboard() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState<Challenge[]>();
  const [matrix, setMatrix] = useState()
  const [userLeaderboard, setUserLeaderboard] = useState();
  const [challengeLeaderboard, setChallengeLeaderboard] = useState();

  const result = useQuery<Result>(GET_DATA);
  const challengeResult = useSubscription<ChallengeResult>(NEW_CHALLENGE);
  const responseResult = useSubscription<ResponseResult>(NEW_RESPONSE);



  const [standings, setStandings] = useState<any[]>()

  // maybe this stuff comes from useChallenge?
  useEffect(() => {
    setLoading(result.loading);
    setError(result.error);

    if (!result.data) {
      return;
    }

    setChallenges(result.data.leaderboard)
  }, [result.data, result.error, result.loading])

  useEffect(() => {
    setError(challengeResult.error);

    if (!challengeResult.data) {
      return;
    }

    setChallenges([
      challengeResult.data.latestChallenge,
      ...challenges || []
    ])
  }, [challengeResult.data, challengeResult.error, challengeResult.loading])

  useEffect(() => {
    setError(responseResult.error);

    if (!responseResult.data || !challenges) {
      return;
    }

    challenges[0].responses = [
      ...challenges[0].responses,
      responseResult.data.newResponse
    ]

    setChallenges(challenges);
  }, [responseResult.data, responseResult.error, responseResult.loading]);

  // set matrix
  useEffect(() => {
    if (!challenges || !result.data) {
      return;
    }

    const xKeys: { [key: string]: number } = {};
    const yKeys: { [key: string]: number } = {};
    const matrix: number[][][] = [];

    for (let i = 0, len = result.data.users.length; i < len; i++) {
      const user = result.data.users[i];
      yKeys[user.id] = i;
    }

    for (let x = 0, len = challenges.length; x < len; x++) {
      const challenge = challenges[x];
      xKeys[challenge.id] = x;
      matrix[x] = [];

      const ranks = getRanks(challenge.responses);
      const length = ranks.length;

      for (let response of challenge.responses) {
        const y = yKeys[response.user.id];
        const rank = ranks.indexOf(response.flex);
        const score = (length - rank) * .25;

        matrix[x][y] = [rank + 1, score];
      }
    }

    console.table(matrix)
    setMatrix({ xKeys, yKeys, matrix})
  }, [challenges, result.data?.users])

  // set challenge leaderboard

  // set user leaderboard
  useEffect(() => {
    if (!matrix) {
      return;
    }

    const keys = Object.keys(matrix.yKeys);

    for (let y = 0, len = keys.length; y < len; y++) {
      const id = keys[y];
      console.log(id)
    }
        // const rank = ranks.indexOf(response.flex);
        // const score = (length - rank) * .25;
  }, [matrix])

  useEffect(() => {
    if (!challenges || !result.data?.users) {
      return;
    }

    const userMap: { [key: string]: number[] } = {};

    for (let user of result.data.users) {
      userMap[user.id] = [];
    }


    for (let challenge of challenges) {
      // if challenge isn't done, ignore
      if (challenge.expiresAt > new Date().toISOString()) {
        return;
      }

      const scores = new Set();

      for (let response of challenge.responses) {
        scores.add(response.flex)
      }

      const ranks = Array.from(scores).sort();
      const length = ranks.length;

      for (let response of challenge.responses) {
        const rank = ranks.indexOf(response.flex);
        const score = (length - rank) * .25;
        userMap[response.user.id].push(score);
      }
    }

    const scores = new Set<number>();
    const userScores: { [key: string]: number } = {}

    for (let user in userMap) {
      const total = userMap[user].reduce((total, waffle) => total += waffle, 0);
      scores.add(total);
      userScores[user] = total;
    }

    const ranks = Array.from(scores).sort((a, b) => a > b ? -1 : 1);

    const standings: UserStanding[] = result.data.users
      .map((user) => {
        const rank = ranks.indexOf(userScores[user.id]) + 1;
        const waffles = userScores[user.id];

        return {
          user,
          waffles,
          rank
        }
      });

    setStandings(standings);
  }, [challenges, result.data?.users])

  function getRanks(responses: Response[]) {
    let ranks = new Set();

    for (let response of responses) {
      ranks.add(response.flex)
    }

    return Array.from(ranks).sort();
  }

  return { data: { standings, challenges }, error, loading };
}
