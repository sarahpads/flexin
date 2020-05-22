import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

import ActiveChallenge from "./ActiveChallenge/ActiveChallenge";
import CompletedChallenge from "./CompletedChallenge/CompletedChallenge";
import { Challenge as C } from "./challenge.types";

interface ChallengeProps {
  challenge?: C
}

const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!challenge) {
      return;
    }

    const now = DateTime.fromISO(challenge.expiresAt);

    setIsActive(now.diffNow().as("seconds") > 0)
  }, [challenge])

  function onComplete() {
    setIsActive(false);
  }

  if (!challenge) {
    return <></>;
  }

  return isActive
    ? <ActiveChallenge challenge={challenge} onComplete={onComplete}/>
    : <CompletedChallenge challenge={challenge}/>
}

export default Challenge;
