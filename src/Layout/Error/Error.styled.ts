import styled from "styled-components";

import theme from "../../theme";
import { Button as B } from "../Typography.styled";

export const Error = styled.div`
  background-color: white;
  box-sizing: border-box;
  clip-path: circle(0%);
  color: #464646;
  height: 100vh;
  left: 0;
  padding: 5rem 2rem;
  position: absolute;
  top: -${theme.dimensions.navHeight};
  transition: clip-path .8s;
  width: 100vw;
  z-index: 10;

  &.error-appear-active,
  &.error-enter-active,
  &.error-enter-done {
    clip-path: circle(150%);
    transition-delay: 1s;
  }
`

export const Message = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`

export const Stack = styled.code`
  display: block;
  height: 50vh;
  margin: 3rem 0;
  overflow: auto;
`

export const Button = styled(B)`
  background-color: #FF6162;
  color: white;
`