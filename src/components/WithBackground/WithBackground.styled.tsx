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
  top: 0;
  min-height: 100vh;
  padding-top: ${theme.dimensions.navHeight};
  transition: clip-path .8s;
  width: 100%;

  &.shit-appear-active,
  &.shit-enter-active,
  &.shit-enter-done {
    clip-path: ${(props) => "circle(150% at " + props.origin + ")"};
    z-index: 1;
  }

  &.shit-exit-active {
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

  .shit-enter-done &,
  .shit-exit-active & {
    ${(props) => {
      if (props.animation === "fade") {
        return { opacity: 1, transform: "translateY(0)" }
      }
    }}
  }
`
