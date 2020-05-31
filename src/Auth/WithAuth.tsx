import React, { useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
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
`;

function WithAuth<P>(Component: React.ComponentType<P>): React.ComponentType<P> {
  function Wrapper(props: P) {
    const auth = useContext(AuthContext);
    const location = useLocation();
    const result = useQuery<Result>(GET_USER_EXISTS, {
      variables: { id: auth?.profile?.sub },
      skip: !auth?.isValid()
    });

    if (!auth?.isValid()) {
      return <Redirect to="/login"/>;
    }

    if (result.loading) {
      return <Spinner/>;
    }

    if (result.error) {
      return <Error error={result.error}/>;
    }

    // Make sure we don't infinitely redirect when creating profile
    if (!result.data?.hasAccount && !location.pathname.includes("create-profile")) {
      return <Redirect to="/create-profile"/>;
    }

    return <Component {...props}/>;
  }

  return Wrapper;
};

export default WithAuth;
