import React, { useContext, useEffect, useState, useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Switch, Route, useLocation } from 'react-router';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSprings, animated } from 'react-spring';

import { AuthContext } from './Auth/AuthProvider';
import { getApolloClient } from './Apollo';
import Nav from './Layout/Nav/Nav';
import CreateProfile from './Auth/CreateProfile/CreateProfile';
import Home from './Home/Home';
import Login from './Auth/Login/Login';
import CreateChallenge from './Challenge/CreateChallenge/CreateChallenge';
import Spinner from './Layout/Spinner/Spinner';
import Scoreboard from './Scoreboard/Scoreboard';

import styled from 'styled-components';

function App() {
  const location = useLocation();
  const auth = useContext(AuthContext)
  const [client, setClient] = useState();

  useEffect(() => {
    getApolloClient(auth)
      .then((client) => setClient(client));
  }, [])

  const [props, set] = useSprings(2, i => ({ x: i * window.innerWidth }))

  function onClick(index: number) {
    // @ts-ignore
    set((i: number) => {
      if (i === index) {
        return { x: 0 }
      } else {
        return { x: (i - index) * window.innerWidth }
      }
    })
  }

  if (!client) {
    return <Spinner/>
  }

  return (
    <ApolloProvider client={client}>
      <Nav/>

      {/* <button onClick={() => onClick(0)}>Leaderboard</button> */}
      {/* <button onClick={() => onClick(1)}>Challenge</button> */}

      <Test>
        <Test2 style={{ display: props[0].display, transform: props[0].x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
          <CSSTransition in={true} classNames="background" appear={true} timeout={600}>
            <Scoreboard/>
          </CSSTransition>
        </Test2>

        <Test2 style={{ display: props[1].display, transform: props[1].x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
          <TransitionGroup component={null}>
            <CSSTransition classNames="background" key={location.key} appear={true} timeout={600} unmountOnExit>
              <Switch location={location}>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/create-profile" component={CreateProfile}/>
                <Route exact path="/create-challenge" component={CreateChallenge}/>
                <Route exact path="/" component={Home}/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Test2>
      </Test>
    </ApolloProvider>
  );
}

const Test2 = styled(animated.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  will-change: transform;
`

const Test = styled.div`
 position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;

`

export default App;
