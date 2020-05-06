import styled from "styled-components";
import { animated } from "react-spring";

import theme from "../../theme";

export const AnimatedLeaderboard = styled(animated.div)`
  bottom: 0;
  background-color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.2);
  margin-left: -${theme.dimensions.pagePadding};
  overflow: hidden;
  position: absolute;
  touch-action: none;
  width: 100%;
  z-index: 5;
`

export const Leaderboard = styled.div`
  box-sizing: border-box;
  color: grey;
  flex: 1;
  margin: 0 auto;
  padding: 2rem;
  z-index: 3;
`

export const Title = styled.span`
  border-bottom: 1px solid #EDEDED;
  color: var(--palette-neutral);
  display: block;
  font-weight: 600;
  padding-bottom: 1.5rem;
  text-align: left;
  text-transform: uppercase;
`