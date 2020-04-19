import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Route, RouteComponentProps, Redirect } from "react-router";

interface AuthRouteProps {
  component: React.ReactType;
  path: string;
  exact?: boolean
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  path,
  exact = false
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const auth = useContext(AuthContext);

  auth.init()
    .then((response: any) => console.log("success", response, auth.isValid()))
    .then((error: any) => console.log("error", error));
  auth.init()
    .finally(() => setIsInitialized(true));

  if (!isInitialized) {
    return <div>Yo, I'm a spinner</div>
  }

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