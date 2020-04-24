import styled from "styled-components";
import { animated } from "react-spring";

export const Container = styled(animated.div)`
	overflow: hidden;
  position: relative;
  height: 50rem;
  transition-delay: 800;
`

export const Paint = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  height: 100%;
  width: 100%;
`

// entering, transform to 1,1,1
// entered, set background color and reset
// don't worry about exit
export const Circle = styled(animated.circle)<{}>`
	/* fill-opacity: 0; */
	/* transition: transform 0.8s, fill-opacity 0.4s; */
	/* transition-timing-function: ease-out; */
	fill-opacity: 1;
  /* transform: ${(props: any) => props.state === "entering" ? "scale3d(1,1,1)" : "scale3d(0,0,1)"}; */
  /* fill: ${(props: any) => props.color}; */
  /* fill: #5FA8C9; */
  r: 150%;
`

// position at bottom left of screen
export const G = styled.g`
  transform: translate(0, 100%)
`