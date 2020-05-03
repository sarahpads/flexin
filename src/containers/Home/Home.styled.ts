import styled from "styled-components";

export { Button, H1, P } from "../../components/Typography.styled";

export const Home = styled.div`
  text-align: center;
`

export const Test = styled.div`
  background-color: white;
  clip-path: circle(12.5rem);
  height: 100vh;
  left: 0;
  margin: auto;
  position: absolute;
  top: -5rem;
  transition: clip-path .8s, top .8s;
  width: 100vw;
  z-index: 5;
    /* clip-path: circle(100%); */

  &.challenge-enter,
  &.challenge-enter-done {
    clip-path: circle(100%);
  }

  &.challenge-exit,
  &.challenge-exit-done {
    top: calc(-100vh - 5rem);
  }
`

export const Test2 = styled.span`
color: black;
  display: block;
  position: absolute;
  transition: transform 2s;
  transition-timing-function: cubic-bezier(.26,.85,.85,.26);
  transform: translateY(100vh);
  width: 100%;

  .challenge-enter-done &,
  .challenge-exit-active &,
  .challenge-exit-done & {
    transform: translateY(-100%)
  }
`