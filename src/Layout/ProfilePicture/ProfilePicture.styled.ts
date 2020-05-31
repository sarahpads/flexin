import styled from "styled-components";

interface ProfilePictureProps {
  size: string;
}

export const ProfilePicture = styled.img<ProfilePictureProps>`
  height: ${(props) => props.size};
`;