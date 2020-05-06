import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { DateTime } from "luxon";

import ActiveChallenge from "./ActiveChallenge/ActiveChallenge";
import CompletedChallenge from "./CompletedChallenge/CompletedChallenge";
import Spinner from "../Layout/Spinner/Spinner";

interface Result {
  latestChallenge: {
    id: string,
    expiresAt: string,
    createdAt: string,
    flex: number,
    reps: number,
    exercise: {
      title: string;
      id: string;
    },
    user: { id: string, name: string }
    responses: {
      user: {
        name: string;
        id: string;
      };
      reps: number;
      flex: number;
    }[]
  }
}

const GET_CHALLENGE = gql`
  query {
    latestChallenge {
      id,
      user { name, id },
      exercise { title, id },
      flex,
      reps,
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
      flex,
      reps,
      createdAt,
      expiresAt,
      responses { user { name, id }, reps, flex }
    }
  }
`

const Challenge: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { subscribeToMore, ...result } = useQuery<Result>(GET_CHALLENGE)

  useEffect(() => {
    if (!result.data) {
      return;
    }

    const now = DateTime.fromISO(result.data.latestChallenge.expiresAt);

    setIsActive(now.diffNow().as("seconds") > 0)
  }, [result.data])

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NEW_CHALLENGE,
      onError: (error) => console.log(error),
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
  }, [subscribeToMore])

  if (!result.data) {
    return <Spinner/>
  }

  return isActive
    ? <ActiveChallenge challenge={result.data.latestChallenge} />
    : <CompletedChallenge challenge={result.data.latestChallenge} />
}

export default Challenge;
