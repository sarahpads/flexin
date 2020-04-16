import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Route, RouteComponentProps, Redirect } from "react-router";

interface AuthRouteProps {
  component: React.ReactType;
  path: string;
  exact: boolean
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  path,
  exact = false
}) => {
  const auth = useContext(AuthContext);
  console.log(auth.isValid())

  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps) => {
        if (auth.isValid()) {
          return <Component {...props}/>
        }

        return <Redirect to="/login"/>
      }}
    />
  )
}

export default AuthRoute;