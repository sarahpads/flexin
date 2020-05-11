import React, { useState, useEffect } from "react";

import { Challenge } from "../../challenge.types";
import useRank from "../../use-rank";
import Rank from "../../Rank/Rank";

interface ChallengeRespondedProps {
  challenge: Challenge;
}

const ChallengeResponded: React.FC<ChallengeRespondedProps> = ({
  challenge
}) => {
  const rank = useRank(challenge);
  const [message, setMessage] = useState();

  useEffect(() => {
    setMessage(getMessage(rank));
  }, [rank]);

  function getMessage(rank: number) {
    switch (true) {
      case rank === 1:
        return "Nice! Those waffles are as good as yours."

      case rank === challenge.responses.length:
        return "Yikes, last place. There are no waffles in last place."

      case rank === 2:
        return "The glory won't be yours, but neither will the shame.";

      case rank === challenge.responses.length - 1:
        return "At least you're better than someone.";

      default:
        return "Hey, not bad. Not great, but not bad."
    }
  }

  return (
    <React.Fragment>
      <Rank challenge={challenge}/>

      <span>{message}</span>
    </React.Fragment>
  )
};

export default ChallengeResponded;
