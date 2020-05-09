import { useState, useEffect } from "react";
import { Response, Challenge } from "./challenge.types";

export default function useSortedResponses(challenge: Challenge | undefined) {
  const [sortedResponses, setSortedResponses] = useState<Response[]>();

  useEffect(() => {
    if (!challenge) {
      return;
    }

    const sortedResponses = [...challenge.responses].sort((a, b) => a.flex < b.flex ? 1 : -1);

    setSortedResponses(sortedResponses)
  }, [challenge])

  return sortedResponses;
}
