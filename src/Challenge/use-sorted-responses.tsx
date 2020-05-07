import { useState, useEffect } from "react";
import { Response, Challenge } from "./challenge.types";

export default function useSortedResponses(challenge: Challenge, responses: Response[] =[]) {
  const [sortedReponses, setSortedResponses] = useState();

  useEffect(() => {
    const sortedResponses = [
      ...responses,
      { user: challenge.user, flex: challenge.flex, reps: challenge.reps }
    ].sort((a, b) => a.flex < b.flex ? 1 : -1);

    setSortedResponses(sortedResponses)
  }, [challenge, responses])

  return sortedReponses;
}
