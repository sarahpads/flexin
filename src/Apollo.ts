import { WebSocketLink } from "@apollo/link-ws";
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client"
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from "subscriptions-transport-ws";

const { REACT_APP_GRAPHQL, REACT_APP_SUBSCRIPTION } = process.env;

export function getClient(idToken: string) {
  const httpLink = new HttpLink({
    uri: REACT_APP_GRAPHQL,
    headers: {
      Authorization: `Bearer ${idToken}`,
    }
  });

  const wsClient = new SubscriptionClient(REACT_APP_SUBSCRIPTION as string, {
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

  return new ApolloClient({
    link,
    cache
  });
}