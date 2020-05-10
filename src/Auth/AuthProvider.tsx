import React, { useState, useRef, useEffect } from "react";
import { TokenPayload } from "google-auth-library";

import AuthClient from "../Auth";
import Spinner from "../Layout/Spinner/Spinner";
import { useLocation, useHistory } from "react-router-dom";
import Error from "../Layout/Error/Error";

const {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_REDIRECT
} = process.env

const config = {
  clientId: REACT_APP_CLIENT_ID,
  clientSecret: REACT_APP_CLIENT_SECRET,
  redirectUri: REACT_APP_REDIRECT,
  accessType: "offline",
  scopes: ['openid', 'profile', 'email'],
}

export const AuthContext = React.createContext(undefined as any);

const AuthProvider: React.FC = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [isInitialized, setIsInitialized] = useState(false);
  const [client, setClient] = useState();
  const [error, setError] = useState();
  const authClient = useRef(undefined as any);

  useEffect(() => {
    if (!authClient.current) {
      authClient.current = new AuthClient(config);

      const isConsuming = location.pathname.includes("consume");

      const consume = isConsuming
        ? authClient.current.consume().then(() => history.push("/"))
        : Promise.resolve()

      consume
        .then(() => authClient.current.init())
        .then((profile: TokenPayload) => {
          setClient({
            profile,
            init: authClient.current.init.bind(authClient.current),
            consume: authClient.current.consume.bind(authClient.current),
            login: authClient.current.login.bind(authClient.current),
            getIdToken: authClient.current.getIdToken.bind(authClient.current),
            isValid: authClient.current.isValid.bind(authClient.current)
          })
        })
        .catch((error: any) => setError(error))
        .finally(() => setIsInitialized(true));
    }
  }, [])

  if (!isInitialized) {
    return <Spinner/>
  }

  if (error) {
    return <Error error={error}/>
  }

  return (
    <AuthContext.Provider value={client}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
