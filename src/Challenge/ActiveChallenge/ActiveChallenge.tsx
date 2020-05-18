import React from "react";

import * as S from "./ActiveChallenge.styled";

import Timer from "../../Layout/Timer/Timer";
import ChallengeResponseForm from "./ChallengeResponseForm/ChallengeResponseForm";
import { Challenge } from "../challenge.types";
import useHasResponded from "../use-has-responded";
import Standing from "../../Layout/Standing/Standing";

interface ActiveChallengeProps {
  challenge: Challenge;
  onComplete: Function;
}

const ActiveChallenge: React.FC<ActiveChallengeProps> = ({
  challenge,
  onComplete
}) => {
  const hasResponded = useHasResponded(challenge.responses);

  return (
    <React.Fragment>
      <S.Challenge className="background--light">
        <Timer expiresAt={challenge.expiresAt} createdAt={challenge.createdAt} onComplete={onComplete}/>

        {!hasResponded && <ChallengeResponseForm challenge={challenge}/>}
      </S.Challenge>

      <S.Title>Challengers</S.Title>
      {challenge.responses.map((response: any, index: number) => {
        return <Standing key={index} user={response.user} percentage={response.flex} rank={index + 1}></Standing>
      })}
    </React.Fragment>
  )
}

export default ActiveChallenge;
