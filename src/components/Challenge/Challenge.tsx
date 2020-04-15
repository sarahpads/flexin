import React from "react";
import { useSubscription, gql } from "@apollo/client";

interface ChallengeProps {
  challenge: {
    id: string
  }
}

const Challenge: React.FC<ChallengeProps> = ({
  challenge
}) => {
  console.log(challenge)
  const NEW_RESPONSE = gql`
    subscription($challengeId: String!) {
      newResponse(challengeId: $challengeId) {
        user { name },
        reps
      }
    }
  `

  const { loading, data, error } = useSubscription(NEW_RESPONSE, {
    variables: { challengeId: challenge.id}
  });

  if (loading) {
    return <span>No data</span>
  }

  if (error) {
    console.log(error)
    return <span>Error</span>
  }

  return (
    <div>
      {JSON.stringify(challenge)}
      {JSON.stringify(data)}
    </div>
  )
}

export default Challenge;
