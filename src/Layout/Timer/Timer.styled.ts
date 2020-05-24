import styled from "styled-components";

import theme from "../../theme";

export const Timer = styled.div`
  position: relative;
`

export const Countdown = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`

export const CountdownSeconds = styled.span`
  font-family: "ManRope";
  font-size: ${theme.circle.fontSize};
  font-weight: 600;
  width: 100%;
`

export const CountdownLabel = styled.span`
  display: block;
  font-size: 1.5rem;
  text-transform: uppercase;
`

export const SVG = styled.svg`
  height: ${theme.circle.dimension};
  position: relative;
  width: ${theme.circle.dimension};
  z-index: 1;
`

export const G = styled.g`
  position: absolute;
  transform: translate(50%, 50%);
`

interface CircleProps {
  progress: number;
}

export const Circle = styled.circle.attrs<CircleProps>((props) => {
  if (!props.progress) {
    return;
  }

  return {
    strokeDashoffset: 440 * (1 - props.progress)
  }
})<CircleProps>`
  fill: var(--palette-neutral);
  r: calc(50% - 0.5rem);
  stroke: var(--palette-dark);
  stroke-dasharray: 440;
  stroke-width: 0.5rem;
  transform: rotate(-90deg);
  transition: stroke-dashoffset 1s linear;
`