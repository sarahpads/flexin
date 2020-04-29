import styled from "styled-components";

export const Timer = styled.div`
  position: relative;
`

export const Countdown = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  z-index: 2;
`

export const CountdownSeconds = styled.span`
  font-family: "ManRope";
  font-size: 8rem;
  font-weight: 600;
  letter-spacing: -0.5rem;
  /* text-align: center; */
  width: 100%;
`

export const CountdownLabel = styled.span`
  display: block;
  font-size: 2rem;
  text-transform: uppercase;
`

export const SVG = styled.svg`
  height: 25rem;
  position: relative;
  width: 25rem;
  z-index: 1;
`

export const G = styled.g`
  position: absolute;
  transform: translate(50%, 50%);
`

interface CircleProps {
  background: string;
  total: number;
  complete: number;
}

export const Circle = styled.circle<CircleProps>`
  fill: ${(props) => props.background};
  r: calc(50% - 0.5rem);
  stroke: white;
  stroke-dasharray: ${(props) => props.total};
  stroke-dashoffset: ${(props) => props.complete};
  stroke-width: 0.5rem;
  transform: rotate(-90deg)
`