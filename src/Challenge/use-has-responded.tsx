import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

export default function useHasResponded(responses: any) {
  const { profile } = useContext(AuthContext);
  const [ hasResponded, setHasResponded ] = useState(false);

  useEffect(() => {
    if (!responses) {
      return;
    }

    const hasResponded = responses.some((response: any) => {
      return response.user.id === profile.sub;
    });

    setHasResponded(hasResponded);
  }, [responses])

  return hasResponded;
}