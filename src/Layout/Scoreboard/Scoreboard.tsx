import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

interface Result {
  users: {
    name: string,
    responses: {flex: number}[]
  }[]
}

const GET_DATA = gql`
  query {
    users {
      name,
      responses {
        flex
      }
    }
  }
`

const Scoreboard: React.FC = () => {
  const [users, setUsers] = useState()
  const result = useQuery<Result>(GET_DATA);

  useEffect(() => {
    if (!result.data) {
      return;
    }

    const users = result.data.users.map((user) => {
      return {
        ...user,
        waffles: user.responses.reduce((waffles, response) => {
          return waffles += response.flex;
        }, 0)
      }
    });

    setUsers(users);
  }, [result.data])

  if (result.loading) {
    return <Spinner/>
  }

  if (result.error) {
    return <Error error={result.error}/>
  }

  console.log(result.data)
  return (
    <React.Fragment>
      {users && users.map((user: any) => {
        return <span>{user.name} {user.waffles} <img src="/waffle.svg"/></span>
      })}

    <span>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></span>
    </React.Fragment>
  )
}

export default Scoreboard;
