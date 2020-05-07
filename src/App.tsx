import React, { useContext, useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Switch, Route, useLocation } from 'react-router';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { AuthContext } from './Auth/AuthProvider';
import { getClient } from './Apollo';
import Nav from './Layout/Nav/Nav';
import Consume from './Auth/Consume/Consume';
import CreateProfile from './Auth/CreateProfile/CreateProfile';
import Home from './Home/Home';
import Login from './Auth/Login/Login';
import CreateChallenge from './Challenge/CreateChallenge/CreateChallenge';
import Spinner from './Layout/Spinner/Spinner';

function App() {
  const location = useLocation();
  const auth = useContext(AuthContext)
  const [client, setClient] = useState();

  // TODO: on consume, this is invoked before the consume process is done
  useEffect(() => {
    setClient(getClient(auth.getIdToken()));
  }, [])

  if (!client) {
    return <Spinner/>
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
