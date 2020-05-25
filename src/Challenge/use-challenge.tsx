import React, { useState, useEffect, useContext } from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";
import ordinal from "ordinal/indicator";

import { Challenge } from "./challenge.types";
import { ToastContext } from "../Layout/Toast/ToastProvider";
import ChallengeToast from "./ChallengeToast/ChallengeToast";
import { AuthContext } from "../Auth/AuthProvider";

// TODO: on new challenge/response, create a toast with confetti
// advertise their rank

interface User {
  name: string;
  id: string
}

interface ResponseResult {
  updatedChallenge: Challenge
}

interface ChallengeResult {
  newChallenge: Challenge;
}

interface Result {
  users: User[],
  leaderboard: Challenge[]
}

const GET_DATA = gql`
  query {
    users { id, name }
    leaderboard {
      id,
      user { name, id },
      exercise { title, id },
      createdAt,
      expiresAt,
      responses { user { name, id }, reps, flex, gains, rank }
    }
  }
`

const NEW_RESPONSE = gql`
  subscription {
    updatedChallenge {
      id,
      user { name, id },
      exercise { title, id },
      createdAt,
      expiresAt,
      responses { user { name, id }, reps, flex, gains, rank }
    }
  }
`

const NEW_CHALLENGE = gql`
  subscription {
    newChallenge {
      id,
      user { name, id },
      exercise { title, id },
      createdAt,
      expiresAt,
      responses { user { name, id }, reps, flex, rank }
    }
  }
`


export default function useChallenge() {
  const { profile } = useContext(AuthContext);
  const { add } = useContext(ToastContext);
  const [challenges, setChallenges] = useState<Challenge[]>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const result = useQuery<Result>(GET_DATA);
  const challengeResult = useSubscription<ChallengeResult>(NEW_CHALLENGE);
  const responseResult = useSubscription<ResponseResult>(NEW_RESPONSE);

  useEffect(() => {
    setLoading(result.loading);
    setError(result.error);

    if (!result.data) {
      return;
    }

    setChallenges(result.data.leaderboard)
  }, [result.data, result.error, result.loading])

  useEffect(() => {
    setError(challengeResult.error);

    if (!challengeResult.data) {
      return;
    }

    const challenge = challengeResult.data.newChallenge;
    const message = challenge.user.id === profile.sub
      ? `You have challenged everyone to ${challenge.exercise.title}s!`
      : `${challenge.user.name} has challenged you to ${challenge.exercise.title}s!`;

    setChallenges([
      challenge,
      ...challenges || []
    ])

    add(<ChallengeToast uid={challenge.user.id} message={message}/>)
  }, [challengeResult.data, challengeResult.error, challengeResult.loading])

  useEffect(() => {
    setError(responseResult.error);

    if (!responseResult.data || !challenges) {
      return;
    }

    const challenge = responseResult.data.updatedChallenge;
    challenge.responses.sort((a, b) => {
      return a.flex > b.flex ? -1 : 1;
    });

    const respondees = challenges[0].responses.map((response) => response.user.id);
    let newResponse;

    for (let response of challenge.responses) {
      if (!respondees.includes(response.user.id)) {
        newResponse = response;
        break;
      }
    }

    const newChallenges = [...challenges]
    newChallenges[0] = challenge;

    setChallenges(newChallenges);

    if (!newResponse) {
      return;
    }

    const yourResponse = challenge.responses.find((response) => response.user.id === profile.sub);
    const message = yourResponse && yourResponse.rank > newResponse.rank
      ? `${newResponse.user.name} has out-flexed you and bumped you into ${yourResponse.rank}${ordinal(yourResponse.rank)} place!`
      : `${newResponse.user.name} has flexed into ${newResponse.rank}${ordinal(newResponse.rank)} place!`


    add(<ChallengeToast uid={newResponse.user.id} message={message}/>)
  }, [responseResult.data, responseResult.error, responseResult.loading]);

  return { loading, error, data: { challenges, users: result.data?.users }};
}
