import styled from "styled-components";

import theme, { Palette } from "../../theme";

interface ContainerProps {
  palette: Palette;
  animateOut: boolean;
  origin: string;
}

export const Container = styled.div<ContainerProps>`
  --palette-neutral: ${(props) => props.palette.neutral};
  --palette-dark: ${(props) => props.palette.dark};
  background-color: var(--palette-neutral);
  box-sizing: border-box;
  clip-path: ${(props) => "circle(0% at " + props.origin + ")"};
  display: flex;
  position: absolute;
  height: 100vh;
  overflow: hidden;
  padding-top: ${theme.dimensions.navHeight};
  top: 0;
  transition: clip-path .8s;
  width: 100%;

  &.background-appear-active,
  &.background-enter-active,
  &.background-enter-done {
    clip-path: ${(props) => "circle(150% at " + props.origin + ")"};
    z-index: 1;
  }

  &.background-enter-done {
    height: auto;
    min-height: 100vh;
  }

  &.background-exit-active {
    clip-path: ${(props) => {
      return props.animateOut
        ? "circle(0% at " + props.origin + ")"
        : "circle(150% at " + props.origin + ")"
    }};
    z-index: 0;
  }
`

interface ComponentProps {
  animation: string;
  animateOut: boolean;
}

export const Component = styled.div<ComponentProps>`
  box-sizing: border-box;
  flex: 1;
  padding: ${theme.dimensions.pagePadding};
  transition: opacity 0.3s, transform 0.3s;
  transition-timing-function: ease-out;
  width: 100%;

  ${(props) => {
    if (props.animation === "fade") {
      return { opacity: 0, transform: "translateY(2rem)" }
    }
  }}

  .background-enter-done &,
  .background-exit-active & {
    ${(props) => {
      if (props.animation === "fade") {
        return { opacity: 1, transform: "translateY(0)" }
      }
    }}
  }
`
