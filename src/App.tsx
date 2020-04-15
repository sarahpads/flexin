import React, { useContext, useState } from 'react';
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

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const auth = useContext(AuthContext)
  const client = getClient(auth);
  console.log(auth.init())

  auth.init()
    .then(() => setIsAuthenticated(true))
    .catch(() => setIsAuthenticated(false));

  if (!isAuthenticated) {
    return <div>Loading</div>
  }

  return (
    <ApolloProvider client={client}>
      <Nav/>

      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/consume" component={Consume}/>
        <AuthRoute exact path="/create-profile" component={CreateProfile}/>
        <AuthRoute exact path="/" component={Home}/>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
