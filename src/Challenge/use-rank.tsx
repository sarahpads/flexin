import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Auth/AuthProvider";
import useSortedResponses from "./use-sorted-responses";
import { Challenge } from "./challenge.types";

export default function useRank(challenge: Challenge) {
  const { profile } = useContext(AuthContext);
  const sortedResponses = useSortedResponses(challenge);
  const [rank, setRank] = useState();

  useEffect(() => {
    const rank = sortedResponses?.findIndex((response) => {
      return response.user.id === profile.sub;
    });

    if (rank !== undefined && rank > -1) {
      setRank(rank + 1);
    }
  }, [sortedResponses])

  return rank;
}