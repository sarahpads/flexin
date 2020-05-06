import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { IconContext } from "react-icons";
import { GiTrophy } from "react-icons/gi";

import * as S from "./CompletedChallenge.styled";
import { AuthContext } from "../../Auth/AuthProvider";

interface CompletedChallengeProps {
  challenge: {
    id: string,
    expiresAt: string,
    createdAt: string,
    flex: number,
    reps: number,
    exercise: {
      title: string;
      id: string;
    },
    user: { id: string, name: string }
    responses: {
      user: {
        name: string;
        id: string;
      };
      reps: number;
      flex: number;
    }[]
  }
}

// TODO: need access to responses
const CompletedChallenge: React.FC<CompletedChallengeProps> = ({ challenge }) => {
  const { profile } = useContext(AuthContext);
  const [winner, setWinner] = useState();
  const [isAuthor, setIsAuthor] = useState(false)

  useEffect(() => {
    const winner = [
      ...challenge.responses,
      { user: challenge.user, flex: challenge.flex, reps: challenge.reps }
    ]
    .sort((a, b) => a.flex < b.flex ? 1 : -1)
    .shift();

    setWinner(winner);
  }, [challenge]);

  useEffect(() => {
    if (!winner) {
      return;
    }

    setIsAuthor(winner.id === profile.sub);
  }, [winner])

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