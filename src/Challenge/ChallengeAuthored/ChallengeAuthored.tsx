import React from "react";

import { Challenge } from "../challenge.types";

interface ChallengeAuthoredProps {
  challenge: Challenge;
}

const ChallengeAuthored: React.FC<ChallengeAuthoredProps> = ({
  challenge
}) => {
  return <div>Authored</div>
}

export default ChallengeAuthored;
