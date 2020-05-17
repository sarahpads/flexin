import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import * as S from "./Scoreboard.styled";
import Spinner from "../Layout/Spinner/Spinner";
import Error from "../Layout/Error/Error";
import Standing from "../Layout/Standing/Standing";
import WithBackground from "../Layout/WithBackground/WithBackground";
import Header from "./Header/Header";
import { AuthContext } from "../Auth/AuthProvider";
import PWA from "../Layout/PWA/PWA";

interface Standing {
  user: {
    name: string;
    id: string;
  }
  waffles: number;
}

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

// TODO: make sure this updates with new responses
const Scoreboard: React.FC = () => {
  const { profile } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [standings, setStandings] = useState()
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

    const standings: Standing[] = result.data.users
      .map((user) => {
        // get total number of waffles earned
        const waffleTotal = userMap[user.id].reduce((total, waffle) => total += waffle, 0);

        return {
          user,
          waffles: Math.round(waffleTotal * 2) / 2 // round to nearest .5
        }
      })
      .sort((a, b) => {
        return a.waffles < b.waffles ? 1 : -1;
      })

    const userIndex = standings.findIndex((standing: Standing) => standing.user.id === profile.sub);
    const user = standings[userIndex];

    setUser({ ...user, rank: userIndex + 1 });

    setStandings(standings);
  }, [result.data])

  if (result.loading || !user) {
    return <Spinner/>
  }

  if (result.error) {
    return <Error error={result.error}/>
  }

  return (
    <S.Scoreboard>
      <S.Ranks>
        {standings && standings.map((standing: Standing, index: number) => {
          return <Standing key={standing.user.id} user={standing.user} rank={index + 1} waffles={standing.waffles}/>
        })}
      </S.Ranks>

      {/* <span>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></span> */}
      <PWA/>
    </S.Scoreboard>
  )
}

export default Scoreboard;
