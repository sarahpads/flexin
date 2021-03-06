import styled from "styled-components";

import theme from "../../theme";

export const Leaderboard = styled.div`
  color: ${theme.text.dark};
  padding-top: 8rem;
`;

export const Ranks = styled.div`
  background-color: #fff;
  color: ${theme.text.dark};
  flex: 1;
  position: relative;
  z-index: 2;
`;

export const PWA = styled.div`
  bottom: 1rem;
  left: 25%;
  position: fixed;
  transform: translateX(-50%);
  z-index: 2;
`