import { useState, useEffect } from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";

import { Challenge } from "./challenge.types";

// TODO: on new challenge/response, create a toast with confetti
// advertise their rank

interface User {
  name: string;
  id: string
}

interface ResponseResult {
  updatedChallenge: Challenge
}

interface ChallengeResult {
  newChallenge: Challenge;
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
      responses { user { name, id }, reps, flex, gains, rank }
    }
  }
`

const NEW_RESPONSE = gql`
  subscription {
    updatedChallenge {
      id,
      user { name, id },
      exercise { title, id },
      createdAt,
      expiresAt,
      responses { user { name, id }, reps, flex, gains, rank }
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


export default function useChallenge() {
  const [challenges, setChallenges] = useState<Challenge[]>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const result = useQuery<Result>(GET_DATA);
  const challengeResult = useSubscription<ChallengeResult>(NEW_CHALLENGE);
  const responseResult = useSubscription<ResponseResult>(NEW_RESPONSE);

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
      challengeResult.data.newChallenge,
      ...challenges || []
    ])
  }, [challengeResult.data, challengeResult.error, challengeResult.loading])

  useEffect(() => {
    setError(responseResult.error);

    if (!responseResult.data || !challenges) {
      return;
    }

    const newChallenges = [...challenges]
    newChallenges[0] = responseResult.data.updatedChallenge;

    setChallenges(newChallenges);
  }, [responseResult.data, responseResult.error, responseResult.loading]);

  return { loading, error, data: { challenges, users: result.data?.users }};
}
