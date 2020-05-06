import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { AuthContext } from "../../components/AuthProvider";
import WithBackground from "../../components/WithBackground/WithBackground";
import WithAuth from "../../components/WithAuth";
import Challenge from "../../components/Challenge/Challenge";

const GET_USER = gql`
  query ($id: String!) {
    user(id: $id) { name }
  }
`

const Home: React.FC = () => {
  const auth = useContext(AuthContext)
  const result = useQuery(GET_USER, {
    variables: { id: auth.profile?.sub }
  });

  if (result.loading) {
    return <div>loading</div>
  }

  // TODO: make this not gross
  // TODO: this is causing a memory leak
  // Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  if (result.error && result.error.graphQLErrors[0]?.extensions?.exception.statusCode === 404) {
    return <Redirect to="/create-profile"/>
  }

  return <Challenge/>;
}

export default WithBackground(WithAuth(Home));
