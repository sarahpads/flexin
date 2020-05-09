import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { IconContext } from "react-icons";
import { GiTrophy } from "react-icons/gi";

import * as S from "./CompletedChallenge.styled";
import { Challenge } from "../challenge.types";
import useIsAuthor from "../use-is-author";
import useSortedResponses from "../use-sorted-responses";
import useWinner from "../use-winner";
import useHasResponded from "../use-has-responded";
import ChallengeWimp from "./ChallengeWimp/ChallengeWimp";
import ChallengeWinner from "./ChallengeWinner/ChallengeWinner";
import ChallengeLoser from "./ChallengeLoser/ChallengeLoser";

interface CompletedChallengeProps {
  challenge: Challenge;
}

const CompletedChallenge: React.FC<CompletedChallengeProps> = ({ challenge }) => {
  // TODO: this won't include challenge response itself
  const hasResponded = useHasResponded(challenge.responses);
  const [winner, isWinner] = useWinner(challenge, challenge.responses);

  function getStatus() {
    switch(true) {
      case (!hasResponded):
        return <ChallengeWimp/>

      case (isWinner):
        return <ChallengeWinner/>

      default:
          return <ChallengeLoser/>
    }
  }

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

      {getStatus()}

      <S.Button as={Link} to="/create-challenge">
        Create Challenge
      </S.Button>
    </S.CompletedChallenge>
  );
}

export default CompletedChallenge;