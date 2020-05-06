import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import * as S from "./ActiveChallenge.styled";

import { AuthContext } from "../../Auth/AuthProvider";
import Timer from "../../Layout/Timer/Timer";
import Leaderboard from "../Leaderboard/Leaderboard";
import ChallengeResponseForm from "../ChallengeResponseForm/ChallengeResponseForm";
import ChallengeAuthored from "../ChallengeAuthored/ChallengeAuthored";
import ChallengeResponded from "../ChallengeResponded/ChallengeResponded";
import { Challenge, Response } from "../challenge.types";

interface ActiveChallengeProps {
  challenge: Challenge
}

interface Result {
  challengeResponses: Response[]
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
  const { profile } = useContext(AuthContext);
  const [ responses, setResponses ] = useState([] as Response[]);
  const [ hasResponded, setHasResponded ] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false)
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
    setIsAuthor(challenge.user.id === profile.sub);
  }, [challenge, profile.sub])

  useEffect(() => {
    const hasResponded = responses.some((response) => {
      return response.user.id === profile.sub;
    });

    setHasResponded(hasResponded);
  }, [responses, profile.sub]);

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

  function getStatus() {
    switch(true) {
      case isAuthor:
        return <ChallengeAuthored challenge={challenge}/>

      case hasResponded:
        return <ChallengeResponded challenge={challenge}/>

      default:
        return <ChallengeResponseForm challenge={challenge}/>
    }
  }

  return (
    <React.Fragment>
      <S.Challenge>
        <Timer expiresAt={challenge.expiresAt} createdAt={challenge.createdAt}/>

        {getStatus()}
      </S.Challenge>

      <Leaderboard responses={responses}/>
    </React.Fragment>
  )
}

export default ActiveChallenge;
