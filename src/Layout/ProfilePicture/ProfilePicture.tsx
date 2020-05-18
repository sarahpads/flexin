import React from "react";

import * as S from "./ProfilePicture.styled";

interface ProfilePicutreProps {
  size?: string
}

const ProfilePicture: React.FC<ProfilePicutreProps> = ({ size = "3.5rem" }) => {
  return <S.ProfilePicture src="/snack.svg" size={size}/>
}

export default ProfilePicture;
