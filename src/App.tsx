import React, { useContext, useEffect, useState } from 'react';
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
  const [client, setClient] = useState();

  useEffect(() =>{
    setClient(getClient(auth.getIdToken()));
  }, [auth])

  if (!client) {
    return <div>loading</div>
  }

  return (
    <ApolloProvider client={client}>
      <Nav/>

      <TransitionGroup component={null}>
        <CSSTransition classNames="background" key={location.key} appear={true} timeout={600} unmountOnExit>
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
