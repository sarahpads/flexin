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
} = process.env;

const config = {
  clientId: REACT_APP_CLIENT_ID as string,
  clientSecret: REACT_APP_CLIENT_SECRET as string,
  redirectUri: REACT_APP_REDIRECT as string,
  accessType: "offline",
  scopes: ["openid", "profile", "email"],
};

export interface Auth {
  profile: TokenPayload;
  init: Function;
  consume: Function;
  login: Function;
  getIdToken: Function;
  isValid: Function;
}

export const AuthContext = React.createContext<Auth>({} as Auth);

const AuthProvider: React.FC = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [isInitialized, setIsInitialized] = useState(false);
  const [client, setClient] = useState<Auth>({} as Auth);
  const [error, setError] = useState();
  // TODO: removing the "any" makes ref.current readonly
  const authClient = useRef<AuthClient>(null as any);

  useEffect(() => {
    if (!authClient.current) {
      authClient.current = new AuthClient(config);

      const isConsuming = location.pathname.includes("consume");

      const consume = isConsuming
        ? authClient.current.consume().then(() => history.push("/"))
        : Promise.resolve();

      consume
        .then(() => authClient.current.init())
        // @ts-ignore
        .then((profile: TokenPayload) => {
          setClient({
            profile,
            init: authClient.current.init.bind(authClient.current),
            consume: authClient.current.consume.bind(authClient.current),
            login: authClient.current.login.bind(authClient.current),
            getIdToken: authClient.current.getIdToken.bind(authClient.current),
            isValid: authClient.current.isValid.bind(authClient.current)
          });
        })
        .catch((error: any) => setError(error))
        .finally(() => setIsInitialized(true));
    }
  }, []);

  if (!isInitialized) {
    return <Spinner/>;
  }

  if (error) {
    return <Error error={error}/>;
  }

  return (
    <AuthContext.Provider value={client}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
