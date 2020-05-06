import styled, { keyframes } from "styled-components";

export const Spinner = styled.div`
  padding-top: 30vh;
  text-align: center;
`

const rotate = keyframes`
  0% { transform: scaleX(1) }
  50% { transform: scaleX(-1) }
`

export const Icon = styled.div`
  animation: ${rotate} 0.3s step-end infinite;
`

interface MessageProps {
  color: string;
}

export const Message = styled.span<MessageProps>`
  color: ${(props) => props.color};
  display: block;
  font-size: 2rem;
  text-transform: uppercase;
`
