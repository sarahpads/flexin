import React, { useContext, useRef, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Switch, Route, useLocation } from 'react-router';
import { TransitionGroup, Transition } from "react-transition-group";
import { useTransition } from "react-spring";

import { AuthContext } from './components/AuthProvider';
import { getClient } from './Apollo';
import Nav from './components/Nav/Nav';
import Consume from './containers/Consume/Consume';
import AuthRoute from './components/AuthRoute';
import CreateProfile from './containers/CreateProfile/CreateProfile';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import CreateChallenge from './containers/CreateChallenge/CreateChallenge';
import Background from './components/Background/Background';
import { Link } from 'react-router-dom';

function App() {
  const auth = useContext(AuthContext)
  let client = useRef(null as any)

  if (!client.current) {
    // TODO: find out why client.current is null for 2 renders
    client.current = getClient(auth.getIdToken());
  }

  return (
    <ApolloProvider client={client.current}>
      <Nav/>
      <Link to="/test1">Test 1</Link>
      <Link to="/test2">Test 2</Link>
      <Link to="/test3">Test 3</Link>

      <Background></Background>

      {/* TODO: routing transitions: https://reacttraining.com/react-router/web/example/animated-transitions */}
      <Switch>
        <Route exact path="/test1" component={Test}/>
        <Route exact path="/test2" component={Test}/>
        <Route exact path="/test3" component={Test}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/consume" component={Consume}/>
        <AuthRoute exact path="/create-profile" component={CreateProfile}/>
        <AuthRoute exact path="/create-challenge" component={CreateChallenge}/>
        <AuthRoute exact path="/" component={Home}/>
      </Switch>
    </ApolloProvider>
  );
}

export default App;

function Test() {
  return <div>Test</div>
}
