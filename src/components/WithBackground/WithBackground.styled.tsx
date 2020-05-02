import styled from "styled-components";

import theme, { Palette } from "../../theme";

interface ContainerProps {
  palette: Palette;
}

export const Container = styled.div<ContainerProps>`
  --palette-neutral: ${(props) => props.palette.neutral};
  --palette-dark: ${(props) => props.palette.dark};
  box-sizing: border-box;
  display: flex;
  position: absolute;
  top: 0;
  min-height: 100vh;
  padding-top: ${theme.dimensions.navHeight};
  width: 100%;

  &.shit-enter-active,
  &.shit-enter-done {
    z-index: 1;
  }

  &.shit-exit-active {
    z-index: 0;
  }
`

interface ComponentProps {
  animateOut: boolean;
}

export const Component = styled.div<ComponentProps>`
  flex: 1;
  opacity: 0;
  padding: ${theme.dimensions.pagePadding};
  transform: translateY(2rem);
  transition: opacity 0.3s, transform 0.3s;
  transition-timing-function: ease-out;
  width: 100%;

  .shit-enter-done & {
    opacity: 1;
    transform: translateY(0);
  }

  .shit-exit-active & {
    ${(props) => {
      return props.animateOut
        ? "transform: translateY(2rem); opacity: 1"
        : "transform: translateY(0); opacity: 0"
    }}
  }
`

export const SVG = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100vh;
  width: 100vw;
`

interface CircleProps {
  animateOut: boolean;
}

export const Circle = styled.circle<CircleProps>`
	transition: transform 0.8s, fill-opacity 0.4s;
	transition-timing-function: ease-out;
  transform: scale3d(0,0,1);
  fill: var(--palette-neutral);
  r: 150%;

  .shit-appear-active &,
  .shit-enter-active &,
  .shit-enter-done & {
    transform: scale3d(1,1,1);
  }

  .shit-exit-active & {
    transform: ${(props) => {
      return props.animateOut ? "scale3d(0,0,1)" : "scale3d(1,1,1)";
    }}
  }
`

interface GProps {
  origin: string;
}

export const G = styled.g<GProps>`
  display: block;
  transform: ${(props) => {
    return props.origin === "top-right" ? "translate(100%, 0)" : "translate(0, 100%)";
  }};
  width: 100%;
`