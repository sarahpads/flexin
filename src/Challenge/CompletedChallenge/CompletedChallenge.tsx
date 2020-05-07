import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { IconContext } from "react-icons";
import { GiTrophy } from "react-icons/gi";

import * as S from "./CompletedChallenge.styled";
import { Challenge } from "../challenge.types";
import useIsAuthor from "../use-is-author";
import useSortedResponses from "../use-sorted-responses";

interface CompletedChallengeProps {
  challenge: Challenge;
}

const CompletedChallenge: React.FC<CompletedChallengeProps> = ({ challenge }) => {
  const [winner, setWinner] = useState();
  const isAuthor = useIsAuthor(challenge);
  const responses = useSortedResponses(challenge, challenge.responses);

  useEffect(() => {
    const winner = responses?.shift();

    setWinner(winner);
  }, [challenge]);

  return (
    <S.CompletedChallenge>
      <S.Winner>
        <Confetti height={250} width={250} opacity={0.6}/>

        <S.WinningUser>
          <IconContext.Provider value={{ color: "#F4D466", size: "5rem" }}>
            <GiTrophy/>
          </IconContext.Provider>

          <S.WinnerName>{winner?.user.name}</S.WinnerName>
        </S.WinningUser>
      </S.Winner>

      {isAuthor
        ? (<>
            <S.H1>You got your ass beat!</S.H1>
            <S.P>Tired of having their glory rubbed in your face? You better rematch.</S.P>
          </>)
        : (<>
          <S.H1>You kicked everyone's ass!</S.H1>
          <S.P>Congratulations! Keep flexin' your foes into submission!</S.P>
        </>)
      }

      <S.Button as={Link} to="/create-challenge">
        Create Challenge
      </S.Button>
    </S.CompletedChallenge>
  );
}

export default CompletedChallenge;