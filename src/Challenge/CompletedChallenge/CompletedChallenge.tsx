import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { IconContext } from "react-icons";
import { GiTrophy } from "react-icons/gi";
import ordinal from "ordinal/indicator";
import useWindowSize from 'react-use/lib/useWindowSize'

import * as S from "./CompletedChallenge.styled";
import { Challenge } from "../challenge.types";
import useWinner from "../use-winner";
import useHasResponded from "../use-has-responded";
import useRank from "../use-rank";

interface CompletedChallengeProps {
  challenge: Challenge;
}

const CompletedChallenge: React.FC<CompletedChallengeProps> = ({ challenge }) => {
  const { width, height } = useWindowSize()
  const rank = useRank(challenge);
  const [suffix, setSuffix] = useState();
  const hasResponded = useHasResponded(challenge.responses);

  useEffect(() => {
    setSuffix(ordinal(rank));
  }, [rank])

  return (
    <S.CompletedChallenge className="background--light">
      <Confetti height={height} width={width} opacity={0.6}/>

      <S.Content>
        <S.Test>
          {!hasResponded
            ? <S.Wimp>You Wimped Out</S.Wimp>
            : <S.Standing>
                You placed<br/>
                <S.Number>7</S.Number>{suffix}
              </S.Standing>
            }
        </S.Test>

        <S.Button as={Link} to="/create-challenge">
          Create Challenge
        </S.Button>
      </S.Content>
    </S.CompletedChallenge>
  );
}

export default CompletedChallenge;