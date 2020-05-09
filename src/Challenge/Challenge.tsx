import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { DateTime } from "luxon";

import ActiveChallenge from "./ActiveChallenge/ActiveChallenge";
import CompletedChallenge from "./CompletedChallenge/CompletedChallenge";
import Spinner from "../Layout/Spinner/Spinner";
import { Challenge as C } from "./challenge.types";
import Error from "../Layout/Error/Error";

// TDOO: not C
interface Result {
  latestChallenge: C;
}

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

const Challenge: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { subscribeToMore, ...result } = useQuery<Result>(GET_CHALLENGE)

  // TODO: need to setIsActive to false after expirey
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

  function onComplete() {
    setIsActive(false);
  }

  if (result.error) {
    return <Error error={result.error}/>
  }

  if (result.loading || !result.data) {
    return <Spinner/>
  }

  return isActive
    ? <ActiveChallenge challenge={result.data.latestChallenge} onComplete={onComplete}/>
    : <CompletedChallenge challenge={result.data.latestChallenge} />
}

export default Challenge;
