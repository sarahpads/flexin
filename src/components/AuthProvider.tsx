import React, { useState, useRef } from "react";
import AuthClient from "../Auth";

const config = {
  clientId: '34199951333-m9g3hi7joeusp6me2j5e07u1foit0mhg.apps.googleusercontent.com', //(string): Your client application's identifier as registered with the OIDC provider.
  clientSecret: 'FbNAH1Basr4lCykvikoZW_Y1',
  authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
  accessTokenUri: 'https://oauth2.googleapis.com/token',
  redirectUri: 'http://localhost:3000/consume',
  // occassionally need to add prompt: 'consent'
  // https://github.com/googleapis/google-api-python-client/issues/213#issuecomment-205886341
  query: { access_type: 'offline', prompt: 'consent' },
  scopes: ['openid', 'profile', 'email'],
}

export const AuthContext = React.createContext(undefined as any);

const AuthProvider: React.FC<any> = (props) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const authClient = useRef(undefined as any);

  if (!authClient.current) {
    authClient.current = new AuthClient(config);

    authClient.current.init()
      .finally(() => setIsInitialized(true));
  }

  if (!isInitialized) {
    return <div>Yo, I'm a spinner</div>
  }

  return (
    // TODO: let's not pass that ref all over the place...
    <AuthContext.Provider value={authClient.current}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
