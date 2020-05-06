import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import * as S from "./ActiveChallenge.styled";

import { AuthContext } from "../AuthProvider";
import Timer from "../Timer/Timer";
import Leaderboard from "../Leaderboard/Leaderboard";
import ChallengeStatus from "../ChallengeStatus/ChallengeStatus";

interface ActiveChallengeProps {
  challenge: {
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
  }
}

interface Result {
  challengeResponses: ChallengeResponse[]
}

interface ChallengeResponse {
  user: {
    name: string;
    id: string;
  },
  reps: number,
  flex: number
}

const GET_RESPONSES = gql`
  query ChallengeResponse($challengeId: String!) {
    challengeResponses(challengeId: $challengeId) {
      user { name, id },
      flex,
      reps
    }
  }
`

const NEW_RESPONSE = gql`
  subscription($challengeId: String!) {
    newResponse(challengeId: $challengeId) {
      user { name, id },
      reps,
      flex
    }
  }
`

const ActiveChallenge: React.FC<ActiveChallengeProps> = ({
  challenge
}) => {
  const [ responses, setResponses ] = useState([] as ChallengeResponse[]);
  const { subscribeToMore, ...result } = useQuery<Result>(GET_RESPONSES, {
    variables: { challengeId: challenge.id }
  });

  useEffect(() => {
    if (!result.data) {
      return;
    }

    const responses = [
      ...result.data.challengeResponses,
      { user: challenge.user, flex: challenge.flex, reps: challenge.reps }
    ].sort((a, b) => a.flex < b.flex ? 1 : -1);

    setResponses(responses);
  }, [result.data]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NEW_RESPONSE,
      variables: { challengeId: challenge.id },
      updateQuery: (prev, { subscriptionData }) => {
        // ALERT: what is returned from this function MUST match the exact data format
        // returned by NEW_RESPONSE; otherwise Apollo will silently discard the update
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          // @ts-ignore
          // subscribeToMore typings assume the subscriptionData has the same keyname
          challengeResponses: [...prev.challengeResponses, subscriptionData.data.newResponse]
        };
      }
    });

    return () => unsubscribe();
  }, [challenge.id, subscribeToMore]);

  return (
    <React.Fragment>
      <S.Challenge>
        <Timer expiresAt={challenge.expiresAt} createdAt={challenge.createdAt}/>

        <ChallengeStatus challenge={challenge} responses={responses}/>
      </S.Challenge>

      <Leaderboard responses={responses}/>
    </React.Fragment>
  )
}

export default ActiveChallenge;
