import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Response } from "./challenge.types";

export default function useHasResponded(responses: Response[]) {
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