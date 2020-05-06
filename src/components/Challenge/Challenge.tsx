import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import ActiveChallenge from "../../components/ActiveChallenge/ActiveChallenge";
import CompletedChallenge from "../CompletedChallenge/CompletedChallenge";
import { DateTime } from "luxon";

const GET_CHALLENGE = gql`
  query {
    latestChallenge {
      id,
      user { name, id },
      exercise { title, id },
      flex,
      reps,
      createdAt,
      expiresAt
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
      expiresAt
    }
  }
`

const Challenge: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { subscribeToMore, ...result } = useQuery(GET_CHALLENGE)

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

        return { latestChallenge: subscriptionData.data.newChallenge };
      }
    });

    return () => unsubscribe();
  }, [subscribeToMore])

  if (!result.data) {
    return <div>loading</div>
  }

  return isActive
    ? <ActiveChallenge challenge={result.data.latestChallenge}/>
    : <CompletedChallenge challenge={result.data.latestChallenge}/>
}

export default Challenge;
