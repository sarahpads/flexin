import styled, { keyframes } from "styled-components";

import theme from "../../theme";

export const Spinner = styled.div`
  padding-top: 30vh;
  text-align: center;
`

const rotate = keyframes`
  0% { transform: rotate(0) }
  100% { transform: rotate(360deg) }
`

export const Waffle = styled.img`
  animation: ${rotate} 1s infinite;
  height: 6rem;
`

export const Message = styled.span`
  color: ${"var(--palette-text, " + theme.text.dark + ")"};
  display: block;
  font-size: 2rem;
  text-transform: uppercase;
`
