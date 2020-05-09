import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Auth/AuthProvider";
import useSortedResponses from "./use-sorted-responses";
import { Challenge, Response } from "./challenge.types";

export default function useRank(challenge: Challenge, responses: Response[]) {
  const { profile } = useContext(AuthContext);
  const sortedResponses = useSortedResponses(challenge, responses);
  const [rank, setRank] = useState();

  useEffect(() => {
    const rank = sortedResponses?.findIndex((response) => {
      return response.user.id === profile.sub;
    });

    if (rank !== undefined) {
      setRank(rank);
    }
  }, [sortedResponses])

  return rank;
}