import styled from "styled-components";

import theme from "../../theme";
export { Button, H1, P, Circle } from "../../Layout/Typography.styled";

export const Login = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${theme.dimensions.pagePadding};
  text-align: center;
`;

export const Logo = styled.div`
  margin: 0 auto;
  position: relative;
  width: ${theme.circle.dimension};
`;

export const Graphic = styled.div`
  background-image: url("/logo.svg");
  background-size: contain;
  height: ${theme.circle.dimension};
  position: absolute;
  top: 0;
  width: ${theme.circle.dimension};
`;

export const Credit = styled.span`
  display: block;
  font-size: 1.2rem;
  margin-top: auto;

  a {
    color: white;
  }
`;