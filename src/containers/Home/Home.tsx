import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import * as S from "./Home.styled";
import { AuthContext } from "../../components/AuthProvider";
import Challenge from "../../components/Challenge/Challenge";
import WithBackground from "../../components/WithBackground/WithBackground";
import ThemeContext from "../../components/ThemeProvider";

interface HomeProps {}

const GET_DATA = gql`
  query ($id: String!) {
    user(id: $id) { name },
    activeChallenge { id, exercise { title } }
  }
`

const NEW_CHALLENGE = gql`
  subscription {
    newChallenge {
      user { name, id },
      exercise { title, id },
      reps
    }
  }
`

const Home: React.FC<HomeProps> = () => {
  const palette = useContext(ThemeContext);
  const auth = useContext(AuthContext)
  const { subscribeToMore, ...result} = useQuery(GET_DATA, {
    variables: { id: auth.profile?.sub }
  });

  useEffect(() => {
    subscribeToMore({
      document: NEW_CHALLENGE,
      updateQuery: (prev, { subscriptionData }) => {
        // ALERT: what is returned from this function MUST match the exact data format
        // returned by NEW_RESPONSE; otherwise Apollo will silently discard the update
        if (!subscriptionData.data) {
          return prev;
        }

        const { user: { name, id: userId }, exercise: { title, id: exerciseId }, reps } = subscriptionData.data.newChallenge;

        const newChallenge = {
          user: { name, id: userId },
          exercise: { title, id: exerciseId },
          reps
        }

        return newChallenge;
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
    return <Redirect to="/create-profile"/>
  } else if (result.error) {
    console.log(result.error)
  }

  // TODO: need to filter out challenges created by the current user
  // if they authored the challenge, let them snoop

  // if challenge, show prompt to respond
  if (result.data && result.data.activeChallenge) {
    return <Challenge challenge={result.data.activeChallenge}/>
  }

  // otherwise, prompt to challenge
  return (
    <S.Button as={Link} color={palette?.neutral} to="/create-challenge">
      Create Challenge
    </S.Button>
  );
}

export default WithBackground(Home);
