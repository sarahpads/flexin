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
  const [standing, setStanding] = useState();
  const [waffles, setWaffles] = useState();
  const [explanation, setExplanation] = useState();
  const [hasResponded, setHasResponded] = useState();
  const result = useQuery<Result>(GET_USERS, {
    skip: !hasResponded
  })

  useEffect(() => {
    const standing = challenge.responses.findIndex((response) => response.user.id === profile.sub);
    const hasResponded = standing > -1;

    setHasResponded(hasResponded);

    if (hasResponded) {
      setStanding(standing + 1);
    }
  }, [challenge])

  useEffect(() => {
    if (!result.data) {
      return;
    }

    if (!hasResponded) {
      setExplanation("There are no waffles for quitters")
      return;
    }

    const lobby = challenge.responses.length / result.data.users.length;
    const inverse = challenge.responses.length - standing;
    const waffles = Math.round((inverse * lobby) * 2) / 2;

    if (standing === 1 && challenge.responses.length === 1) {
      setExplanation("You came in first, but you didn't beat anyone.");
    } else if (standing === challenge.responses.length) {
      setExplanation("You came in last; there are no waffles in last place");
    } else {
      setExplanation(`You beat ${inverse} people!`);
    }

    setWaffles(waffles);
  }, [challenge, result.data])

  return { standing, waffles, explanation };
}