import React from "react";

interface ChallengeAuthoredProps {
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

const ChallengeAuthored: React.FC<ChallengeAuthoredProps> = ({
  challenge
}) => {
  return <div>Authored</div>
}

export default ChallengeAuthored;
