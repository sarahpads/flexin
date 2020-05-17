import styled from "styled-components";

import theme from "../../theme";
import { Circle } from "../../Layout/Typography.styled";
export { Button, H1, P } from "../../Layout/Typography.styled";

export const CompletedChallenge = styled.div`
  height: 100%;
  text-align: center;
`

export const Test = styled(Circle)`
`

export const Content = styled.div`
  padding-top: 10rem;
  position: relative;
  z-index: 3;
`

export const Standing = styled.div`
  padding-top: 3rem;
`

export const Wimp = styled.div`
  align-items: center;
  display: flex;
  font-size: 2rem;
  height: 100%;
  justify-content: center;
`

export const WinnerName = styled.span`
  display: block;
  color: ${theme.text.dark};
  font-size: 6rem;
  font-weight: 700;
  letter-spacing: -4px;
  line-height: 0.8em;
`

export const Number = styled.span`
  font-size: 4rem;
  font-weight: 550;
`