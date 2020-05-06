import React, { useState, useContext, useEffect } from "react";

import * as S from "./ChallengeStatus.styled";
import { AuthContext } from "../AuthProvider";
import ChallengeResponseForm from "../ChallengeResponseForm/ChallengeResponseForm";

interface ChallengeStatusProps {
  challenge: {
    id: string,
    expiresAt: string,
    createdAt: string,
    flex: number,
    reps: number,
    exercise: {
      title: string;
      id: string;
    },
    user: { id: string, name: string }
  }
  responses: {
    user: {
      name: string;
      id: string;
    },
    reps: number,
    flex: number
  }[];
}

const ChallengeStatus: React.FC<ChallengeStatusProps> = ({
  challenge,
  responses
}) => {
  const [ hasAuthored, setHasAuthored ] = useState(false);
  const [ hasResponded, setHasResponded ] = useState(false);
  const { profile } = useContext(AuthContext);

  useEffect(() => {
    const hasResponded = responses.some((response) => {
      return response.user.id === profile.sub;
    });

    setHasResponded(hasResponded);
  }, [responses, profile.sub]);


  return (
    <div>
      <S.H1>
        {hasAuthored
          ? "You flexed"
          : `${challenge.user.name} is flexin' at you`}
      </S.H1>

      <S.Form>
        {hasResponded
          ? <span>Watch 'em roll</span>
          : <ChallengeResponseForm challenge={challenge}/>
        }
      </S.Form>
    </div>
  )
}

export default ChallengeStatus;
