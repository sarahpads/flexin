import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import ordinal from "ordinal/indicator";

import * as S from "./CompletedChallenge.styled";
import { Challenge } from "../challenge.types";
import useHasResponded from "../use-has-responded";
import useRank from "../use-rank";
import useStanding from "../use-standing";

interface CompletedChallengeProps {
  challenge: Challenge;
}

const CompletedChallenge: React.FC<CompletedChallengeProps> = ({ challenge }) => {
  const elRef = useRef<any>();
  const rank = useRank(challenge);
  const [suffix, setSuffix] = useState();
  const [hasStanding, setHasStanding] = useState();
  const hasResponded = useHasResponded(challenge.responses);
  const { standing, waffles, explanation } = useStanding(challenge);

  useEffect(() => {
    setHasStanding(hasResponded && challenge.responses.length > 1);
  }, [hasResponded, challenge])

  useEffect(() => {
    setSuffix(ordinal(rank));
  }, [rank])

  return (
    <S.CompletedChallenge className="background--light" ref={elRef}>
      <Confetti height={elRef.current?.offsetHeight} width={elRef.current?.offsetWidth} opacity={0.6}/>

      <S.Content>
        <S.Circle>
          {!hasStanding
            ? <S.Wimp>{hasResponded ? "No Contest" : "You wimped out"}</S.Wimp>
            : <S.Standing>
                {standing}
                <S.Suffix>{suffix}</S.Suffix>
              </S.Standing>
            }
        </S.Circle>

        <S.Message>You earned {waffles} x <S.Waffle src="/waffle.png"/></S.Message>
        <S.Explanation>{explanation}</S.Explanation>

        <S.Button as={Link} to="/create-challenge">
          Create Challenge
        </S.Button>
      </S.Content>
    </S.CompletedChallenge>
  );
}

export default CompletedChallenge;