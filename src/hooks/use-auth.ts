import { useRef } from "react";

import AuthClient from "../Auth";

export default function useAuth() {
  const client = useRef<AuthClient>();

  if (!client.current) {
    client.current = new AuthClient({
      clientId: '34199951333-m9g3hi7joeusp6me2j5e07u1foit0mhg.apps.googleusercontent.com',
      clientSecret: 'FbNAH1Basr4lCykvikoZW_Y1',
      redirectUri: 'http://localhost:3000/consume',
      accessType: "offline",
      scopes: ['openid', 'profile', 'email'],
    })
  }
}
