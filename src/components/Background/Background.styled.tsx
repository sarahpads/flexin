import styled, { css } from "styled-components";

export const Container = styled.div`
	overflow: hidden;
  position: relative;
  height: 50rem;
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
export const Circle = styled.circle<any>`
	transition: transform 0.8s, fill-opacity 0.4s;
	transition-timing-function: ease-out;
  transform: scale3d(0,0,1);
  fill: ${(props: any) => props.color};
  r: 150%;

  ${(props: any) => {
    if (props.state === "entering" || props.state === "entered") {
      return css`transform: scale3d(1,1,1)`;
    }
  }}
`

// position at bottom left of screen
export const G = styled.g`
  transform: translate(0, 100%)
`