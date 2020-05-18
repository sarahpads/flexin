import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import ordinal from "ordinal/indicator";

import * as S from "./CompletedChallenge.styled";
import { Challenge } from "../challenge.types";
import useHasResponded from "../use-has-responded";
import useRank from "../use-rank";

interface CompletedChallengeProps {
  challenge: Challenge;
}

const CompletedChallenge: React.FC<CompletedChallengeProps> = ({ challenge }) => {
  const elRef = useRef<any>();
  const rank = useRank(challenge);
  const [suffix, setSuffix] = useState();
  const hasResponded = useHasResponded(challenge.responses);

  useEffect(() => {
    setSuffix(ordinal(rank));
  }, [rank])

  return (
    <S.CompletedChallenge className="background--light" ref={elRef}>
      <Confetti height={elRef.current?.offsetHeight} width={elRef.current?.offsetWidth} opacity={0.6}/>

      <S.Content>
        <S.Circle>
          {!hasResponded
            ? <S.Wimp>You Wimped Out</S.Wimp>
            : <S.Standing>
                7
                <S.Suffix>{suffix}</S.Suffix>
              </S.Standing>
            }
        </S.Circle>

        {!hasResponded
          ? <S.Message>No waffles for you</S.Message>
          : <S.Message>You earned 5 x <S.Waffle src="/waffle.png"/></S.Message>
        }

        <S.Button as={Link} to="/create-challenge">
          Create Challenge
        </S.Button>
      </S.Content>
    </S.CompletedChallenge>
  );
}

export default CompletedChallenge;