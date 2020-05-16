import styled from "styled-components";

import theme from "../../theme";

export const AnimatedScoreboard = styled.div`
  background-color: white;
  border-radius: 0 20px 20px 0;
  box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.2);
  color: ${theme.text.dark};
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 10;
`

export const Scoreboard = styled.div`
  padding: 2rem;
`