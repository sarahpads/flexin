import styled from "styled-components";

import theme from "../../theme";
import { Circle } from "../../Layout/Typography.styled";
export { Button, H1, P } from "../../Layout/Typography.styled";

export const CompletedChallenge = styled.div`
  text-align: center;
`

export const Winner = styled(Circle)`
  background-color: white;
  box-sizing: border-box;
  padding-top: 4rem;
  position: relative;
`

export const WinningUser = styled.div`
  position: relative;
  z-index: 3;
`

export const WinnerName = styled.span`
  display: block;
  color: ${theme.text.dark};
  font-size: 6rem;
  font-weight: 700;
  letter-spacing: -4px;
  line-height: 0.8em;
`