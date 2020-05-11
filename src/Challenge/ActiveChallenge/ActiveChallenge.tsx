import React from "react";

import * as S from "./ActiveChallenge.styled";

import Timer from "../../Layout/Timer/Timer";
import Leaderboard from "../Leaderboard/Leaderboard";
import ChallengeResponseForm from "./ChallengeResponseForm/ChallengeResponseForm";
import ChallengeResponded from "./ChallengeResponded/ChallengeResponded";
import { Challenge } from "../challenge.types";
import useHasResponded from "../use-has-responded";

interface ActiveChallengeProps {
  challenge: Challenge;
  onComplete: Function;
}

const ActiveChallenge: React.FC<ActiveChallengeProps> = ({
  challenge,
  onComplete
}) => {
  const hasResponded = useHasResponded(challenge.responses);

  function getStatus() {
    return hasResponded
      ? <ChallengeResponded challenge={challenge}/>
      : <ChallengeResponseForm challenge={challenge}/>;
  }

  return (
    <React.Fragment>
      <S.Challenge>
        <Timer expiresAt={challenge.expiresAt} createdAt={challenge.createdAt} onComplete={onComplete}/>

        {getStatus()}
      </S.Challenge>

      <Leaderboard responses={challenge.responses}/>
    </React.Fragment>
  )
}

export default ActiveChallenge;
