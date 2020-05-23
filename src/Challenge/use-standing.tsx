import { Challenge } from "./challenge.types";
import { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../Auth/AuthProvider";

const GET_USERS = gql`
  query {
    users{ id, name }
  }
`

interface Result {
  users: { id: string, name: string }[]
}

export default function useStanding(challenge: Challenge) {
  const { profile } = useContext(AuthContext);
  const [explanation, setExplanation] = useState();
  const [waffles, setWaffles] = useState();
  const [rank, setRank] = useState();

  useEffect(() => {
    const response = challenge.responses.find((response) => response.user.id === profile.sub);

    if (!response) {
      setWaffles(0);
      setRank(-1);
      setExplanation("Quitters don't get waffles.")
      return;
    }

    setRank(response.rank);
    setWaffles(response.gains);

    const vanquishedFoes = challenge.responses.filter((r) => {
      return response.rank < r.rank;
    });

    if (response.rank === 1 && !vanquishedFoes.length) {
      setExplanation("You came in first, but you didn't beat anyone.");
    } else if (!vanquishedFoes.length) {
      setExplanation("You came in last; there are no waffles in last place");
    } else {
      // TODO: this probably isn't going to be acurrate. Look at rank and below for
      // lowers and disregard those with the same gains
      setExplanation(`You beat ${vanquishedFoes.length} ${vanquishedFoes.length > 1 ? "people" : "person"}!`);
    }
  }, [challenge])

  return { rank, waffles, explanation };
}