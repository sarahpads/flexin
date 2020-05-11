import { useState, useEffect } from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";

import { Challenge, Response } from "./challenge.types";

interface ChallengeResult {
  latestChallenge: Challenge;
}

interface ResponseResult {
  newResponse: Response
}

const NEW_RESPONSE = gql`
  subscription {
    newResponse {
      user { name, id },
      reps,
      flex
    }
  }
`

const GET_CHALLENGE = gql`
  query {
    latestChallenge {
      id,
      user { name, id },
      exercise { title, id },
      createdAt,
      expiresAt,
      responses { user { name, id }, reps, flex }
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
  const [challenge, setChallenge] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { subscribeToMore, ...challengeResult } = useQuery<ChallengeResult>(GET_CHALLENGE)
  const responseResult = useSubscription<ResponseResult>(NEW_RESPONSE);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NEW_CHALLENGE,
      updateQuery: (prev, { subscriptionData }) => {
        // ALERT: what is returned from this function MUST match the exact data format
        // returned by NEW_CHALLENGE; otherwise Apollo will silently discard the update
        if (!subscriptionData.data) {
          return prev;
        }

        // @ts-ignore
        return { latestChallenge: subscriptionData.data.newChallenge };
      }
    });

    return () => unsubscribe();
  }, [])

  useEffect(() => {
    setLoading(challengeResult.loading);
    setError(challengeResult.error);

    if (!challengeResult.data) {
      return;
    }

    setChallenge({
      ...challengeResult.data.latestChallenge,
      responses: sortResponses([...challengeResult.data.latestChallenge.responses])
    })
  }, [challengeResult.data, challengeResult.error, challengeResult.loading])

  useEffect(() => {
    setError(responseResult.error);

    if (!responseResult.data) {
      return;
    }

    setChallenge({
      ...challenge,
      responses: sortResponses([
        ...challenge.responses,
        responseResult.data.newResponse
      ])
    });
  }, [responseResult.data, responseResult.error, responseResult.loading])

  return { data: challenge, error, loading };
}

function sortResponses(responses: Response[]) {
  return responses.sort((a, b) => {
    return a.flex < b.flex ? 1 : -1;
  });
}
