import React, { useEffect, useState } from "react";
import { gql, useSubscription } from "@apollo/client";

import * as S from "./ActiveChallenge.styled";

import Timer from "../../Layout/Timer/Timer";
import Leaderboard from "../Leaderboard/Leaderboard";
import ChallengeResponseForm from "./ChallengeResponseForm/ChallengeResponseForm";
import ChallengeResponded from "./ChallengeResponded/ChallengeResponded";
import { Challenge, Response } from "../challenge.types";
import Error from "../../Layout/Error/Error";
import useHasResponded from "../use-has-responded";
import useSortedResponses from "../use-sorted-responses";

interface ActiveChallengeProps {
  challenge: Challenge;
  onComplete: Function;
}

interface Result {
  newResponse: Response
}

const NEW_RESPONSE = gql`
  subscription {
    newResponse {
      user { name, id },
      reps,
      flex
    }
  }
`

const ActiveChallenge: React.FC<ActiveChallengeProps> = ({
  challenge: c,
  onComplete
}) => {
  const [challenge, setChallenge] = useState(c);
  // const { subscribeToMore, ...result } = useQuery<Result>(GET_RESPONSES)
  const result = useSubscription<Result>(NEW_RESPONSE, {
  });
  const responses = useSortedResponses(challenge)
  const hasResponded = useHasResponded(challenge.responses);

  useEffect(() => {
    if (!result.data) {
      return;
    }

    setChallenge({
      ...challenge,
      responses: [...challenge.responses, result.data.newResponse]
    });
  }, [c, result.data]);

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

      {result.error && <Error error={result.error}/>}

      <Leaderboard responses={responses}/>
    </React.Fragment>
  )
}

export default ActiveChallenge;
