import React, { useContext, useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { Switch, Route, useLocation } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { AuthContext } from "./Auth/AuthProvider";
import { getApolloClient } from "./Apollo";
import Nav from "./Layout/Nav/Nav";
import CreateProfile from "./Auth/CreateProfile/CreateProfile";
import Home from "./Home/Home";
import Login from "./Auth/Login/Login";
import CreateChallenge from "./Challenge/CreateChallenge/CreateChallenge";
import Spinner from "./Layout/Spinner/Spinner";
import ToastProvider from "./Layout/Toast/ToastProvider";

function App() {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [client, setClient] = useState();

  useEffect(() => {
    getApolloClient(auth)
      .then((client) => setClient(client));
  }, []);

  if (!client) {
    return <Spinner/>;
  }

  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <Nav />

        <TransitionGroup component={null}>
          <CSSTransition classNames="background" key={location.pathname.split("?")[0]} appear={true} timeout={600} unmountOnExit>
            <Switch location={location}>
              <Route exact path="/login" component={Login} />
              <Route exact path="/create-profile" component={CreateProfile} />
              <Route exact path="/create-challenge" component={CreateChallenge} />
              <Route exact path="/" component={Home} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </ToastProvider>
    </ApolloProvider>
  );
}

export default App;
