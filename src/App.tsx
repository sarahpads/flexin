import React, { useContext, useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Switch, Route } from 'react-router';

import { AuthContext } from './components/AuthProvider';
import { getClient } from './Apollo';
import Nav from './components/Nav/Nav';
import Consume from './containers/Consume/Consume';
import AuthRoute from './components/AuthRoute';
import CreateProfile from './containers/CreateProfile/CreateProfile';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import CreateChallenge from './containers/CreateChallenge/CreateChallenge';

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

      {/* TODO: routing transitions: https://reacttraining.com/react-router/web/example/animated-transitions */}
      <Switch>
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
