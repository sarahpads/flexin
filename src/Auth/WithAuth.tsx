import React, { useContext } from "react";

import { AuthContext } from "./AuthProvider";
import { Redirect } from "react-router-dom";

const WithAuth = (Component: any) => {
  function Wrapper() {
    const auth = useContext(AuthContext);

    if (auth.isValid()) {
      return <Component/>
    }

    return <Redirect to="/login"/>
  }

  return Wrapper;
}

export default WithAuth;
