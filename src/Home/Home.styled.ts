import styled from "styled-components";
import { animated } from "react-spring";

import theme from "../theme";
export { Button, H1, P } from "../Layout/Typography.styled";

export const Nav = styled.div`
  padding-top: 2rem;
  position: absolute;
  width: 100%;
  z-index: 1;
`

export const Track = styled.div`
  background-color: #F6F9FC;
  border: 2px solid transparent;
  border-right-color: #F0F2F3;
  border-bottom-color: #F0F2F3;
  border-radius: 2rem;
  display: flex;
  height: 2.5rem;
  margin: auto;
  position: relative;
  width: 30rem;
`

export const Background = styled(animated.div)`
  background-color: var(--palette-neutral);
  border-radius: 2rem;
  bottom: 0;
  position: absolute;
  top: 0;
  width: 15rem;
  z-index: 1;
`

export const Home = styled.div`
  margin-left: -${theme.dimensions.pagePadding};
  height: calc(100% + 2rem);
  text-align: center;
  width: 100vw;
`

export const Label = styled.label`
  color: ${theme.text.dark};
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2.4rem;
  text-align: center;
  width: 15rem;
  z-index: 2;
`

export const Radio = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + label {
    color: white;
  }
`

export const Pages = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  will-change: transform;
`

export const AnimatedPage = styled(animated.div)`
  background-color: white;
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
`
