import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import ordinal from "ordinal/indicator";

import * as S from "./CompletedChallenge.styled";
import { Challenge } from "../challenge.types";
import useStanding from "../use-standing";

interface CompletedChallengeProps {
  challenge: Challenge;
}

const CompletedChallenge: React.FC<CompletedChallengeProps> = ({ challenge }) => {
  const elRef = useRef<any>();
  const [suffix, setSuffix] = useState();
  const { rank, waffles, explanation } = useStanding(challenge);

  useEffect(() => {
    setSuffix(ordinal(rank));
  }, [rank])

  return (
    <S.CompletedChallenge className="background--light" ref={elRef}>
      <Confetti height={elRef.current?.offsetHeight} width={elRef.current?.offsetWidth} opacity={0.6}/>

      <S.Content>
        <S.Circle>
          {rank === -1
            ? <S.Wimp>{"You wimped out"}</S.Wimp>
            : <S.Standing>
                {rank}
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