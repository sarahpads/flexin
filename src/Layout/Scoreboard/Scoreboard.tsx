import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import * as S from "./Scoreboard.styled";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import Standing from "../../Challenge/Standing/Standing";

interface Result {
  users: { id: string, name: string }[],
  challenges: {
    id: string;
    responses: { user: { id: string }, flex: number }[]
  }[]
}

const GET_DATA = gql`
  query {
    users {
      id,
      name
    },
    challenges {
      id,
      responses {
        user { id },
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

    const userMap: { [key: string]: number[] } = {};

    for (let user of result.data.users) {
      userMap[user.id] = [];
    }

    for (let challenge of result.data.challenges) {
      // order responses from lowest to highest
      const responses = [...challenge.responses].sort((a, b) => a.flex > b.flex ? 1 : -1);
      // modifier value depending on number of people
      const lobby = responses.length / result.data.users.length

      for (let i = 0, len = responses.length; i < len; i++) {
        const response = responses[i];
        userMap[response.user.id].push(i * lobby);
      }
    }

    const users = result.data.users
      .map((user) => {
        // get total number of waffles earned
        const waffleTotal = userMap[user.id].reduce((total, waffle) => total += waffle, 0);

        return {
          ...user,
          name: user.name.split(" ")[0],
          waffles: Math.round(waffleTotal * 2) / 2 // round to nearest .5
        }
      })
      .sort((a, b) => {
        return a.waffles < b.waffles ? 1 : -1;
      })

    setUsers(users);
  }, [result.data])

  if (result.loading) {
    return <Spinner/>
  }

  if (result.error) {
    return <Error error={result.error}/>
  }

  return (
    <S.AnimatedScoreboard>
      <S.Scoreboard>
        {users && users.map((user: any, index: number) => {
          return <Standing
            key={user.id}
            rank={index}
            userName={user.name}
            waffles={user.waffles}
            percentage={user.percentage}/>
        })}

      <span>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></span>
      </S.Scoreboard>
    </S.AnimatedScoreboard>
  )
}

export default Scoreboard;
