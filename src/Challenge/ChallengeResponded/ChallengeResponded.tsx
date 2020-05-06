import React from "react";

interface ChallengeRespondedProps {
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

const ChallengeResponded: React.FC<ChallengeRespondedProps> = ({
  challenge
}) => {
  return <div>Responded</div>
};

export default ChallengeResponded;
