import styled from "styled-components";

import theme from "../theme";

export const Scoreboard = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -${theme.dimensions.pagePadding};
  height: calc(100% + 2rem);
  width: 100vw;
`

export const Ranks = styled.div`
  background-color: #fff;
  color: ${theme.text.dark};
  flex: 1;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;