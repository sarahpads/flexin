import React, { useState, useEffect } from "react";

import * as S from "./ProfilePicture.styled";

interface ProfilePicutreProps {
  size?: string;
  id: string;
}

const ProfilePicture: React.FC<ProfilePicutreProps> = ({ size = "3.5rem", id }) => {
  const [pictureId, setPictureId] = useState();

  useEffect(() => {
    const pictureId = Math.round(parseInt(id.slice(-2)) / 99 * 15);

    setPictureId(pictureId);
  }, [id]);

  return <S.ProfilePicture src={`/profiles/${pictureId}.svg`} size={size}/>;
};

export default ProfilePicture;
