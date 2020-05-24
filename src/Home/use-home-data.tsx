import { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";

import { Challenge, Standing } from "../Challenge/challenge.types";
import useChallenge from "../Challenge/use-challenge";


export default function useHomeData() {
  const result = useChallenge();
  const [challenge, setChallenge] = useState<Challenge>();
  const [leaderboard, setLeaderboard] = useState<Standing[]>();


  useEffect(() => {
    if (!result.data || !result.data.challenges || !result.data.users) {
      return;
    }

    const challenge: Challenge = result.data.challenges[0];

    const users: { [key: string]: number } = {};

    for (let user of result.data.users) {
      users[user.id] = 0;
    }

    for (let challenge of result.data.challenges) {
      if (challenge.expiresAt > new Date().toISOString()) {
        continue;
      }

      for (let response of challenge.responses) {
        users[response.user.id] += response.gains || 0;
      }
    }

    const scores = new Set<number>();

    for (let user in users) {
      scores.add(users[user]);
    }

    const ranks = Array.from(scores).sort((a, b) => a < b ? 1 : -1);

    const standings = result.data.users
      .map((user) => {
        const rank = ranks.indexOf(users[user.id]);

        return {
          user,
          waffles: users[user.id],
          rank: rank + 1
        }
      })
      .sort((a, b) => {
        return a.waffles > b.waffles ? -1 : 1;
      })

    setChallenge(challenge);
    setLeaderboard(standings);
  }, [result.data.challenges])

  if (!leaderboard) {
    return { error: result.error, loading: true }
  }

  return { data: { leaderboard, challenge }, error: result.error, loading: result.loading };
}
