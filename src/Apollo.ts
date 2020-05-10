import { WebSocketLink } from "@apollo/link-ws";
import { ApolloClient, InMemoryCache, HttpLink, split, NormalizedCacheObject, ApolloLink } from "@apollo/client"
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from "subscriptions-transport-ws";
import { CachePersistor } from 'apollo-cache-persist'
import { setContext } from '@apollo/link-context'
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types";

const { REACT_APP_GRAPHQL, REACT_APP_SUBSCRIPTION } = process.env;
const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

// https://rubygarage.org/blog/pwa-with-react-apollo
export async function getApolloClient(auth: any) {

  const authLink = setContext(({ headers }: any) => {
    const token = auth.getIdToken();

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const httpLink = new HttpLink({ uri: REACT_APP_GRAPHQL });

  const wsClient = new SubscriptionClient(REACT_APP_SUBSCRIPTION as string, {
    reconnect: true
  });

  const wsLink = new WebSocketLink(wsClient);

  const cache = new InMemoryCache();

  // https://www.apollographql.com/docs/react/v3.0-beta/data/subscriptions/
  const splitLink = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  const link = ApolloLink.from([
    authLink, splitLink
  ])

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
  })

  const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore()
  } else {
    await persistor.purge()
    window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }

  return new ApolloClient({
    link,
    cache
  });
}