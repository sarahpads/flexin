import React, { useContext } from 'react';
import { WebSocketLink } from "@apollo/link-ws";
import { ApolloClient, InMemoryCache, HttpLink, gql, ApolloProvider, split, useQuery, useSubscription } from "@apollo/client"
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from "subscriptions-transport-ws";

import { AuthContext } from './components/AuthProvider';

const GET_USERS = gql`
  {
    users {
      id,
      email
    }
  }
`

const NEW_CHALLENGE = gql`
  subscription {
    newChallenge {
      id,
      reps,
      exercise { title },
      user { name }
    }
  }
`

function App() {
  const auth = useContext(AuthContext)

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      Authorization: `Bearer ${auth.getIdToken()}`,
    }
  });

  const wsClient = new SubscriptionClient("ws://localhost:4000/subscriptions", {
    reconnect: true
  });

  const wsLink = new WebSocketLink(wsClient);

  const cache = new InMemoryCache();

  // https://www.apollographql.com/docs/react/v3.0-beta/data/subscriptions/
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link,
    cache
  });

  if (window.location.href.includes('consume')) {
    console.log(auth.consume());
  }

  const user = auth.getSession();

  return (
    <ApolloProvider client={client}>
      {user.sub}

      <button onClick={() => auth.login()}>Login</button>
      <Test/>
      <Test2/>
    </ApolloProvider>
  );
}

function Test() {
  const { loading, data, error } = useQuery(GET_USERS);

  if (loading) {
    return <span>No data</span>
  }

  if (error) {
    console.log(error)
    return <span>Error</span>
  }

  return (
    <div>
      {data.users.map((user: any) => {
        return <span key={user.email}>{user.email}</span>
      })}
    </div>
  )
}

function Test2() {
  const { loading, data, error } = useSubscription(NEW_CHALLENGE)

  if (loading) {
    return <span>No data</span>
  }

  if (error) {
    console.log(error)
    return <span>Error</span>
  }

  return <Challenge challenge={data.newChallenge}/>
  // <div>{JSON.stringify(data)}</div>
}

function Challenge({ challenge }: any) {
  console.log(challenge)
  const NEW_RESPONSE = gql`
    subscription($challengeId: String!) {
      newResponse(challengeId: $challengeId) {
        user { name },
        reps
      }
    }
  `

  const { loading, data, error } = useSubscription(NEW_RESPONSE, {
    variables: { challengeId: challenge.id}
  });

  if (loading) {
    return <span>No data</span>
  }

  if (error) {
    console.log(error)
    return <span>Error</span>
  }

  return (
    <div>
      {JSON.stringify(challenge)}
      {JSON.stringify(data)}
    </div>
  )
}

export default App;
