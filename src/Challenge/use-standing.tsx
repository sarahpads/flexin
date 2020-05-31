import { useState, useEffect, useContext } from "react";

import { Challenge } from "./challenge.types";
import { AuthContext } from "../Auth/AuthProvider";

export default function useStanding(challenge: Challenge) {
  const { profile } = useContext(AuthContext);
  const [explanation, setExplanation] = useState();
  const [waffles, setWaffles] = useState();
  const [rank, setRank] = useState();
  const [vanquishedFoes, setVanquishedFoes] = useState();

  useEffect(() => {
    const response = challenge.responses.find((response) => response.user.id === profile.sub);

    if (!response) {
      setWaffles(0);
      setRank(-1);
      setExplanation("Quitters don't get waffles.");
      return;
    }

    const vanquishedFoes = challenge.responses.filter((r) => {
      return response.rank < r.rank;
    });

    setRank(response.rank);
    setWaffles(response.gains);
    setVanquishedFoes(vanquishedFoes);

    if (response.rank === 1 && !vanquishedFoes.length) {
      setExplanation("You came in first, but you didn't beat anyone.");
    } else if (!vanquishedFoes.length) {
      setExplanation("You came in last; there are no waffles in last place");
    } else {
      setExplanation(`You beat ${vanquishedFoes.length} ${vanquishedFoes.length > 1 ? "people" : "person"}!`);
    }
  }, [challenge]);

  return { rank, waffles, explanation, vanquishedFoes };
}