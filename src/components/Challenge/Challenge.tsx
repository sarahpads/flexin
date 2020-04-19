import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import ChallengeResponseForm from "../ChallengeResponseForm/ChallengeResponseForm";
import { AuthContext } from "../AuthProvider";

interface ChallengeProps {
  challenge: {
    id: string,
    exercise: {
      title: string
    }
    responses: any[]
  }
}

const GET_RESPONSES = gql`
  query ChallengeResponse($challengeId: String!) {
    challengeResponses(challengeId: $challengeId) {
      user { name, id },
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
  const { session } = useContext(AuthContext);

  // TODO: throughout { ...result, subscribeToMore }
  const { subscribeToMore, ...result } = useQuery(GET_RESPONSES, {
    variables: { challengeId: challenge.id }
  });

  useEffect(() => {
    const hasResponded = result.data && result.data.challengeResponses.some((response: any) => {
      return response.user.id === session.sub;
    });

    setHasResponded(hasResponded);
  }, [result.data, session.sub]);

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
      {challenge.id}: {challenge.exercise.title}
      {result.data && result.data.challengeResponses.map((response: any) => {
        return <p key={response.user.id}>{response.user.name} {response.reps}</p>
      })}

      {!hasResponded
        ? <ChallengeResponseForm challenge={challenge}/>
        : <span>Watch 'em roll</span>
      }
    </React.Fragment>
  )
}

export default Challenge;
