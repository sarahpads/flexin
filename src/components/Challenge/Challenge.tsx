import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import * as S from "./Challenge.styled";

import ChallengeResponseForm from "../ChallengeResponseForm/ChallengeResponseForm";
import { AuthContext } from "../AuthProvider";
import Timer from "../Timer/Timer";
import Leaderboard from "../Leaderboard/Leaderboard";

interface ChallengeProps {
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
      reps
    }
  }
`

const Challenge: React.FC<ChallengeProps> = ({
  challenge
}) => {
  const [ hasResponded, setHasResponded ] = useState(false);
  const [ hasAuthored, setHasAuthored ] = useState(false);
  const [ responses, setResponses ] = useState([] as any[]);
  const { profile } = useContext(AuthContext);

  const { subscribeToMore, ...result } = useQuery(GET_RESPONSES, {
    variables: { challengeId: challenge.id }
  });

  useEffect(() => {
    setHasAuthored(challenge.user.id === profile.sub);
  }, [challenge]);

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
    const hasResponded = result.data && result.data.challengeResponses.some((response: any) => {
      return response.user.id === profile.sub;
    });

    setHasResponded(hasResponded);
  }, [result.data, profile.sub]);

  useEffect(() => {
    subscribeToMore({
      document: NEW_RESPONSE,
      variables: { challengeId: challenge.id },
      updateQuery: (prev, { subscriptionData }) => {
        // ALERT: what is returned from this function MUST match the exact data format
        // returned by NEW_RESPONSE; otherwise Apollo will silently discard the update
        if (!subscriptionData.data) {
          return prev;
        }

        const { user: { name, id }, reps } = subscriptionData.data.newResponse;

        const newResponse = {
          user: { name, id },
          reps
        }

        return {
          challengeResponses: [...prev.challengeResponses, newResponse]
        };
      }
    });
  }, [challenge.id, subscribeToMore]);

  if (result.error) {
    return <data>{JSON.stringify(result.error)}</data>
  }

  return (
    <React.Fragment>
      <S.Challenge>
        <S.H1>
          {hasAuthored
            ? "You flexed"
            : `${challenge.user.name} is flexin' at you`}
        </S.H1>

        <Timer expiresAt={challenge.expiresAt} createdAt={challenge.createdAt}></Timer>

        {result.data && result.data.challengeResponses.map((response: any) => {
          return <p key={response.user.id}>{response.user.name} {response.reps}</p>
        })}

        <S.Form>
          {/* {hasResponded || hasAuthored */}
          {hasResponded
            ? <span>Watch 'em roll</span>
            : <ChallengeResponseForm challenge={challenge}/>
          }
        </S.Form>
      </S.Challenge>

      <Leaderboard responses={responses}/>
    </React.Fragment>
  )
}

export default Challenge;
