import React, { useState, useRef } from "react";
import AuthClient from "../Auth";

const config = {
  clientId: '34199951333-m9g3hi7joeusp6me2j5e07u1foit0mhg.apps.googleusercontent.com', //(string): Your client application's identifier as registered with the OIDC provider.
  clientSecret: 'FbNAH1Basr4lCykvikoZW_Y1',
  redirectUri: 'http://localhost:3000/consume',
  accessType: "offline",
  scopes: ['openid', 'profile', 'email'],
}

export const AuthContext = React.createContext(undefined as any);

const AuthProvider: React.FC<any> = (props) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [client, setClient] = useState();
  const authClient = useRef(undefined as any);

  if (!authClient.current) {
    authClient.current = new AuthClient(config);

    authClient.current.init()
      .then((profile: any) => {
        console.log(profile)
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
