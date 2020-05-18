import { useState, useEffect, useContext } from "react";

import { UserStanding } from "./leaderboard.types";
import { AuthContext } from "../Auth/AuthProvider";

interface User {
  name: string;
  id: string
}

interface Challenge {
  id: string;
  responses: { flex: number, user: { id: string } }[]
}

export default function useLeaderboard(users: User[] | undefined, challenges: Challenge[] | undefined) {
  const { profile } = useContext(AuthContext);
  const [standings, setStandings] = useState()
  const [userStanding, setUserStanding] = useState();

  useEffect(() => {
    if (!users || !challenges) {
      return;
    }

    const userMap: { [key: string]: number[] } = {};

    for (let user of users) {
      userMap[user.id] = [];
    }

    for (let challenge of challenges) {
      // order responses from lowest to highest
      const responses = [...challenge.responses].sort((a, b) => a.flex > b.flex ? 1 : -1);
      // modifier value depending on number of people
      const lobby = responses.length / users.length

      for (let i = 0, len = responses.length; i < len; i++) {
        const response = responses[i];
        userMap[response.user.id].push((Math.round(i * lobby) * 2) / 2); // round ot nearest .5
      }
    }

    const standings: UserStanding[] = users
      .map((user) => {
        // get total number of waffles earned
        const waffles = userMap[user.id].reduce((total, waffle) => total += waffle, 0);

        return {
          user,
          waffles
        }
      })
      .sort((a, b) => {
        return a.waffles < b.waffles ? 1 : -1;
      })
      .map((standing, i) => {
        return { ...standing, rank: i + 1 };
      });

    const userStanding = standings.find((standing) => standing.user.id === profile.sub);

    setUserStanding(userStanding);
    setStandings(standings);
  }, [users, challenges])

  return { standings, userStanding };
}