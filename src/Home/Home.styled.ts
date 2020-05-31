import styled from "styled-components";
import { animated } from "react-spring";

import theme from "../theme";
import { Link } from "react-router-dom";
export { Button, H1, P } from "../Layout/Typography.styled";

export const Home = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  text-align: center;
  width: 100vw;
`;

export const Content = styled.div`
  background-color: #fff;
  flex: 1;
  position: relative;
`;

export const Nav = styled.div`
  padding-top: 2rem;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

export const Track = styled.div`
  background-color: #F6F9FC;
  border: 2px solid transparent;
  border-right-color: #F0F2F3;
  border-bottom-color: #F0F2F3;
  border-radius: 2rem;
  display: flex;
  height: 3rem;
  margin: auto;
  position: relative;
  width: 30rem;
`;

export const Background = styled(animated.div)`
  background-color: var(--palette-neutral);
  border-radius: 2rem;
  bottom: 0;
  position: absolute;
  top: 0;
  width: 15rem;
  z-index: 1;
`;

interface LabelProps {
  active: number;
}

export const Label = styled(Link)<LabelProps>`
  color: ${(props) => props.active ? "white" : theme.text.dark};
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 3rem;
  text-align: center;
  text-decoration: none;
  width: 15rem;
  z-index: 2;
`;

export const Pages = styled.div`
  display: flex;
  position: absolute;
  width: 200vw;
  height: 100%;
`;

export const AnimatedPage = styled(animated.div)`
  background-color: white;
  overflow-y: auto;
  position: relative;
  width: 100vw;
  height: 100%;
`;
