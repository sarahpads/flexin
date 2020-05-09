import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Challenge } from "./challenge.types";

export default function useIsAuthor(challenge: Challenge) {
  const { profile } = useContext(AuthContext);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (!challenge) {
      return;
    }

    setIsAuthor(challenge.user.id === profile.sub);
  }, [challenge])

  return isAuthor;
}