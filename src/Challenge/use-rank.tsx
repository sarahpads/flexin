import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Auth/AuthProvider";
import { Challenge } from "./challenge.types";

export default function useRank(challenge: Challenge) {
  const { profile } = useContext(AuthContext);
  const [rank, setRank] = useState();

  useEffect(() => {
    const rank = challenge.responses.findIndex((response) => {
      return response.user.id === profile.sub;
    });

    if (rank !== undefined && rank > -1) {
      setRank(rank + 1);
    }
  }, [challenge])

  return rank;
}