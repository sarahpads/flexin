import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Spinner from "../Layout/Spinner/Spinner";

import { AuthContext } from "./AuthProvider";
import Error from "../Layout/Error/Error";

interface Result {
  hasAccount: boolean;
}

const GET_USER_EXISTS = gql`
  query ($id: String!) {
    hasAccount(id: $id)
  }
`

const WithAuth = (Component: any) => {
  function Wrapper() {
    const auth = useContext(AuthContext);
    const result = useQuery<Result>(GET_USER_EXISTS, {
      variables: { id: auth.profile?.sub },
      skip: !auth.isValid()
    });

    if (!auth.isValid()) {
      return <Redirect to="/login"/>
    }

    if (result.loading) {
      return <Spinner/>
    }

    if (result.error) {
      return <Error error={result.error}/>
    }

    if (!result.data?.hasAccount) {
      return <Redirect to="/create-profile"/>
    }

    return <Component/>
  }

  return Wrapper;
}

export default WithAuth;
