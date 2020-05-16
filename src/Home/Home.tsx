import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { gql, useQuery, useApolloClient } from "@apollo/client";

import { AuthContext } from "../Auth/AuthProvider";
import WithBackground from "../Layout/WithBackground/WithBackground";
import WithAuth from "../Auth/WithAuth";
import Challenge from "../Challenge/Challenge";
import Spinner from "../Layout/Spinner/Spinner";
import Error from "../Layout/Error/Error";

interface Result {
  hasAccount: boolean;
}

const GET_USER_EXISTS = gql`
  query ($id: String!) {
    hasAccount(id: $id)
  }
`

const Home: React.FC = () => {
  const { profile } = useContext(AuthContext)
  const result = useQuery<Result>(GET_USER_EXISTS, {
    variables: { id: profile?.sub }
  });

    return <Spinner/>
  if (result.loading) {
    return <Spinner/>
  }

  if (result.error) {
    return <Error error={result.error}/>
  }

  if (!result.data?.hasAccount) {
    return <Redirect to="/create-profile"/>
  }

  return <Challenge/>;
}

export default WithBackground(WithAuth(Home));
