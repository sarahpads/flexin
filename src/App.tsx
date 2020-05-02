import React, { useContext, useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Switch, Route, useLocation } from 'react-router';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { AuthContext } from './components/AuthProvider';
import { getClient } from './Apollo';
import Nav from './components/Nav/Nav';
import Consume from './containers/Consume/Consume';
import CreateProfile from './containers/CreateProfile/CreateProfile';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import CreateChallenge from './containers/CreateChallenge/CreateChallenge';

function App() {
  const location = useLocation();
  const auth = useContext(AuthContext)
  let client = useRef(null as any)

  if (!client.current) {
    // TODO: find out why client.current is null for 2 renders
    client.current = getClient(auth.getIdToken());
  }

  return (
    <ApolloProvider client={client.current}>
      <Nav/>

      <TransitionGroup component={null}>
        <CSSTransition classNames="shit" key={location.key} appear={true} timeout={800} unmountOnExit>
          <Switch location={location}>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/consume" component={Consume}/>
            <Route exact path="/create-profile" component={CreateProfile}/>
            <Route exact path="/create-challenge" component={CreateChallenge}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </ApolloProvider>
  );
}

export default App;
