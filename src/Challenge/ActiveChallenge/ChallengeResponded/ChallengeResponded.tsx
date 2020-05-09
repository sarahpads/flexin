import React from "react";

import { Challenge } from "../../challenge.types";

interface ChallengeRespondedProps {
  challenge: Challenge;
}

const ChallengeResponded: React.FC<ChallengeRespondedProps> = ({
  challenge
}) => {
  return <div>Responded</div>
};

export default ChallengeResponded;
