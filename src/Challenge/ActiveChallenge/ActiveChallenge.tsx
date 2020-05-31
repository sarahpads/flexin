import React from "react";

import * as S from "./ActiveChallenge.styled";

import Timer from "../../Layout/Timer/Timer";
import { Challenge, Response } from "../challenge.types";
import useHasResponded from "../use-has-responded";
import Rank from "../../Layout/Rank/Rank";
import CreateResponse from "../CreateResponse/CreateResponse";

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

        {!hasResponded && <CreateResponse challenge={challenge}/>}
      </S.Challenge>

      <S.Title>Challengers</S.Title>
      {challenge.responses.map((response: Response) => {
        return <Rank key={response.user.id} user={response.user} percentage={response.flex} rank={response.rank}/>;
      })}
    </React.Fragment>
  );
};

export default ActiveChallenge;
