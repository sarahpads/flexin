import React from "react";
import { useSubscription, gql } from "@apollo/client";

import Challenge from "../../components/Challenge/Challenge";

interface HomeProps {}

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
  const { loading, data, error } = useSubscription(NEW_CHALLENGE)

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