import { useState, useEffect, useContext } from "react";
import { Challenge, Response } from "./challenge.types";
import { AuthContext } from "../Auth/AuthProvider";

export default function useWinner(challenge: Challenge, responses: Response[]) {
  const { profile } = useContext(AuthContext);
  const [winner, setWinner] = useState();
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    const winner = responses ? responses[0] : undefined;
    const isWinner = winner?.user.id === profile.sub;

    setWinner(winner);
    setIsWinner(isWinner);
  }, [challenge]);

  return [winner, isWinner];
}
