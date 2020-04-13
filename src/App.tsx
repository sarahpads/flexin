import React, { useContext } from 'react';
import { WebSocketLink } from "@apollo/link-ws";
import { ApolloClient, InMemoryCache, HttpLink, gql, ApolloProvider, split } from "@apollo/client"
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from "subscriptions-transport-ws";

import { AuthContext } from './components/AuthProvider';

/*const GET_USERS = gql`
  {
    users {
      id,
      email
    }
  }
`

const NEW_CHALLENGE = gql`
  subscription {
    challengeCreated {
      reps,
      exercise { title },
      user { name }
    }
  }
`*/

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

  /*const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    request: (operation) => {
      operation.setContext((context: any) => ({
        headers: {
          ...context.headers,
          authorization: `Bearer ${auth.getIdToken()}`,
        },
      }));
    }
  });*/

  if (window.location.href.includes('consume')) {
    console.log(auth.consume());
  }

  const user = auth.getUser()

  return (
    <ApolloProvider client={client}>
      {user.sub}
      <button onClick={auth.login}>Login</button>

    </ApolloProvider>
  );
}

export default App;
