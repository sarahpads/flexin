import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

const GET_USERS = gql`
  {
    users {
      id,
      email
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <div>
      {data.users.map((user: any) => {
        return <span key={user.id}>{user.email}</span>
      })}
    </div>
  );
}

export default App;
