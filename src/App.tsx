import React, { useContext } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

import { AuthContext } from './components/AuthProvider';

const GET_USERS = gql`
  {
    users {
      id,
      email
    }
  }
`

function App() {
  const auth = useContext(AuthContext)

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    request: (operation) => {
      operation.setContext((context: any) => ({
        headers: {
          ...context.headers,
          authorization: `Bearer ${auth.getIdToken()}`,
        },
      }));
    }
  });

  if (window.location.href.includes('consume')) {
    console.log(auth.consume());
  }

  const user = auth.getUser()

  return (
    <ApolloProvider client={client}>
      {user.sub}
      <button onClick={auth.login}>Login</button>

      <Query query={GET_USERS}>
        {({ loading, error, data }: any) => {
          if (!data) {
            return <span>Loading or something</span>
          }

          return (
            <div>
              {data.users.map((user: any) => {
                return <span key={user.id}>{user.email}</span>
              })}
            </div>
          );
        }}
      </Query>
    </ApolloProvider>
  );
}

export default App;
