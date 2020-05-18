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

  function drawRain(ctx: any) {
    const light = new Path2D("M381.347,161.376c-3.541-6.743-6.601-12.567-8.116-15.938c-4.768-10.598-27.465-46.614-47.618-75.564 C281.917,7.11,268.519,1.058,257.624,0.105c-14.367-1.255-31.547,8.221-68.694,58.553c-21.794,29.53-42.536,62.858-50.987,79.225 l-3.617,6.996c-29.283,56.593-59.562,115.113-59.562,185.888c0,99.933,81.301,181.233,181.234,181.233 c48.654,0,94.352-18.985,128.675-53.459c34.103-34.253,52.769-79.659,52.559-127.856 C436.957,267.24,400.781,198.374,381.347,161.376z");
    ctx.fillStyle = "#A2D8F4";
    ctx.fill(light)

    let dark = new Path2D("M381.328,161.372c-3.541-6.743-6.601-12.567-8.116-15.938c-4.768-10.598-27.465-46.614-47.618-75.564 C281.9,7.106,268.502,1.054,257.607,0.101l-1.626,511.896c48.654,0,94.352-18.985,128.675-53.459 c34.103-34.253,52.769-79.659,52.559-127.856C436.938,267.237,400.762,198.371,381.328,161.372z");
    ctx.fillStyle = "#7CC8F0";
    ctx.fill(dark)

    const shine = new Path2D("M233.071,434.712c-54.751,0-99.294-44.543-99.294-99.294c0-10.304,8.354-18.658,18.658-18.658 c10.304,0,18.658,8.354,18.658,18.658c0,34.176,27.803,61.977,61.977,61.977c10.304,0,18.658,8.354,18.658,18.658 C251.73,426.358,243.377,434.712,233.071,434.712z");
    ctx.fillStyle = "#D0EEFC";
    ctx.fill(shine);

    ctx.arc(281, 411, 18, 0, 2 * Math.PI);
    ctx.fillStyle = "#B5DFF7"
    ctx.fill()

    // @ts-ignore
    ctx.translate(this.x, this.y)
    ctx.scale(0.05, 0.05)
  }

  return (
    <S.CompletedChallenge className="background--light" ref={elRef}>
      <Confetti height={elRef.current?.offsetHeight} width={elRef.current?.offsetWidth} opacity={0.6} drawShape={drawRain}/>

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