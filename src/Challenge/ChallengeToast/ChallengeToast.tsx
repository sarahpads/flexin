import React from "react";

import * as S from "./ChallengeToast.styled";
import ProfilePicture from "../../Layout/ProfilePicture/ProfilePicture";

interface ChallengeToastProps {
  uid: string;
  message: string;
}

const ChallengeToast: React.FC<ChallengeToastProps> = ({
  uid,
  message
}) => {
  return (
    <S.Toast>
      <ProfilePicture id={uid}/>

      <S.Message>{message}</S.Message>
    </S.Toast>
  );
};

export default ChallengeToast;