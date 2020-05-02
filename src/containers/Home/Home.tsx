import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import * as S from "./Home.styled";
import { AuthContext } from "../../components/AuthProvider";
import Challenge from "../../components/Challenge/Challenge";
import WithBackground from "../../components/WithBackground/WithBackground";
import Graphic from "../../components/Graphic/Graphic";
import WithAuth from "../../components/WithAuth";

interface HomeProps {}

const GET_USER = gql`
  query ($id: String!) {
    user(id: $id) { name }
  }
`

const GET_CHALLENGE = gql`
  query {
    activeChallenge {
      id,
      user { name, id },
      exercise { title, id },
      reps,
      date,
      expiresAt
    }
  }
`

const NEW_CHALLENGE = gql`
  subscription {
    newChallenge {
      id,
      user { name, id },
      exercise { title, id },
      reps,
      date,
      expiresAt
    }
  }
`

const Home: React.FC<HomeProps> = () => {
  const auth = useContext(AuthContext)
  const result = useQuery(GET_USER, {
    variables: { id: auth.profile?.sub }
  });

  const { subscribeToMore, ...challengeResult } = useQuery(GET_CHALLENGE)

  useEffect(() => {
    subscribeToMore({
      document: NEW_CHALLENGE,
      onError: (error) => console.log(error),
      updateQuery: (prev, { subscriptionData }) => {
        // ALERT: what is returned from this function MUST match the exact data format
        // returned by NEW_CHALLENGE; otherwise Apollo will silently discard the update
        if (!subscriptionData.data) {
          return prev;
        }

        return { activeChallenge: subscriptionData.data.newChallenge };
      }
    });
  }, [subscribeToMore])

  if (result.loading) {
    return <div>loading</div>
  }

  // TODO: make this not gross
  // TODO: this is causing a memory leak
  // Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  if (result.error && result.error.graphQLErrors[0]?.extensions?.exception.statusCode === 404) {
    // return <Redirect to="/create-profile"/>
  } else if (result.error) {
    // console.log(result.error)
  }

  // TODO: need to filter out challenges created by the current user
  // if they authored the challenge, let them snoop

  // if challenge, show prompt to respond
  if (challengeResult.data && challengeResult.data.activeChallenge) {
    return <Challenge challenge={challengeResult.data.activeChallenge}/>
  }

  // otherwise, prompt to challenge
  return (
    <S.Home>
      <Graphic/>
      <S.H1>No one is flexin'</S.H1>
      <S.P>Your friends are being wimps; show 'em how it's done!</S.P>
      <S.Button as={Link} to="/create-challenge">
        Create Challenge
      </S.Button>
    </S.Home>
  );
}

export default WithBackground(WithAuth(Home));
