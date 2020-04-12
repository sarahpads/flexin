import React from "react";
import AuthClient from "../Auth";

const config = {
  clientId: '34199951333-m9g3hi7joeusp6me2j5e07u1foit0mhg.apps.googleusercontent.com', //(string): Your client application's identifier as registered with the OIDC provider.
  clientSecret: 'FbNAH1Basr4lCykvikoZW_Y1',
  authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
  accessTokenUri: 'https://oauth2.googleapis.com/token',
  redirectUri: 'http://localhost:3000/consume',
  scopes: ['openid', 'profile', 'email'],
}

const authClient = new AuthClient(config);

export const AuthContext = React.createContext(undefined as any);

function AuthProvider(props: any) {
  return (
    <AuthContext.Provider value={authClient}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
