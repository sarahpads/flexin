import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

import ActiveChallenge from "./ActiveChallenge/ActiveChallenge";
import CompletedChallenge from "./CompletedChallenge/CompletedChallenge";
import useChallenge from "./use-challenge";
import Spinner from "../Layout/Spinner/Spinner";
import Error from "../Layout/Error/Error";

const Challenge: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { data: challenge, error, loading } = useChallenge();

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

  if (error) {
    return <Error error={error}/>
  }

  if (loading || !challenge) {
    return <Spinner/>
  }


  return isActive
    ? <ActiveChallenge challenge={challenge} onComplete={onComplete}/>
    : <CompletedChallenge challenge={challenge}/>
}

export default Challenge;
