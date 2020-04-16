import React, { useContext } from "react";
import { useSubscription, gql, useQuery } from "@apollo/client";

import Challenge from "../../components/Challenge/Challenge";
import { AuthContext } from "../../components/AuthProvider";

interface HomeProps {}

const GET_USER = gql`
  query User($id: String!) {
    user(id: $id) { name }
  }
`

const NEW_CHALLENGE = gql`
  subscription {
    newChallenge {
      id,
      reps,
      exercise { title },
      user { name }
    }
  }
`

const Home: React.FC<HomeProps> = () => {
  const auth = useContext(AuthContext)
  const { loading: userLoading, error: userError, data: user } = useQuery(GET_USER, {
    variables: { id: auth.session.sub }
  });
  const { loading, data, error } = useSubscription(NEW_CHALLENGE)

  if (userLoading) {
    return <div>loading</div>
  }

  if (userError) {
    return <div>{JSON.stringify(userError)}</div>
  }

  // if the user doesn't have a profile, redirect to create-profile
  return <div>{user.name}</div>


  if (loading) {
    return <span>No data</span>
  }

  if (error) {
    console.log(error)
    return <span>Error</span>
  }

  return <Challenge challenge={data.newChallenge}/>
  // <div>{JSON.stringify(data)}</div>
}

export default Home;