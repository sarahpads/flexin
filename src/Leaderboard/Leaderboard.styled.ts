import styled from "styled-components";

import theme from "../theme";

export const Leaderboard = styled.div`
  color: ${theme.text.dark};
  padding-top: 10rem;
`

export const Ranks = styled.div`
  background-color: #fff;
  color: ${theme.text.dark};
  flex: 1;
  position: relative;
  z-index: 2;
`;