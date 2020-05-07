import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

export default function useIsAuthor(challenge: any) {
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