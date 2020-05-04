import React, { useState, useRef } from "react";
import { TokenPayload } from "google-auth-library";

import AuthClient from "../Auth";

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
  const [isInitialized, setIsInitialized] = useState(false);
  const [client, setClient] = useState();
  const authClient = useRef(undefined as any);

  if (!authClient.current) {
    authClient.current = new AuthClient(config);

    authClient.current.init()
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
      .finally(() => setIsInitialized(true));
  }

  if (!isInitialized) {
    return <div>Yo, I'm a spinner</div>
  }

  return (
    <AuthContext.Provider value={client}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
