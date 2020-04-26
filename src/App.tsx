import React, { useContext, useRef, useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Switch, Route, useLocation, useParams } from 'react-router';
import { TransitionGroup, Transition, CSSTransition } from "react-transition-group";
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

import * as S from "./components/Background/Background.styled";

function App() {
  const [color, setColor] = useState();
  const location = useLocation();
  const auth = useContext(AuthContext)
  let client = useRef(null as any)

  if (!client.current) {
    // TODO: find out why client.current is null for 2 renders
    client.current = getClient(auth.getIdToken());
  }

  const routes: any[] = [
    { path: "/test1", component: Test, exact: true, color: "#8567AD" },
    { path: "/test2", component: Test, exact: true, color: "#5FA8C9" },
    { path: "/test3", component: Test, exact: true, color: "#D36962" },
    { path: "/test4", component: Test, exact: true, color: "#F4BF6A" }
  ]

  return (
    <ApolloProvider client={client.current}>
      <Nav/>
      <Link to="/test1">Purple</Link>
      <Link to="/test2">Blue</Link>
      <Link to="/test3">Red</Link>
      <Link to="/test4">Yellow</Link>

      <TransitionGroup>
        <CSSTransition classNames="shit" key={location.key} appear={true} timeout={800} unmountOnExit>
          <Switch location={location}>
            <Route path="/test1" component={Test}/>
            <Route path="/test2" component={Test}/>
            <Route path="/test3" component={Test}/>
            <Route path="/test4" component={Test}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>

      <Route exact path="/login" component={Login}/>
      <Route exact path="/consume" component={Consume}/>
      <AuthRoute exact path="/create-profile" component={CreateProfile}/>
      <AuthRoute exact path="/create-challenge" component={CreateChallenge}/>
      <AuthRoute exact path="/" component={Home}/>
    </ApolloProvider>
  );
}

export default App;

const Test = Background(function() {
  const location = useLocation()
  return <div>Test, {location.key}</div>
});