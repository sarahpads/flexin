import styled from "styled-components";

import theme from "../../theme";
import { Circle as C, Button as B } from "../../Layout/Typography.styled";
export { H1, P } from "../../Layout/Typography.styled";

export const CompletedChallenge = styled.div`
  height: 100%;
  padding: 0 ${theme.dimensions.pagePadding};
  text-align: center;
`;

export const Circle = styled(C)`
  margin-bottom: 1rem;
`;

export const Content = styled.div`
  /* TODO: some of these styles are shared */
  box-sizing: border-box;
  height: 100%;
  padding: 8rem 0 10rem;
  position: relative;
  z-index: 3;
`;

export const Standing = styled.div`
  font-size: 7rem;
  font-weight: 550;
  line-height: 15rem;
  position: relative;
`;

export const Suffix = styled.span`
  bottom: 0;
  font-size: 2rem;
  font-weight: 400;
  line-height: 11rem;
  position: absolute;
`;

export const Wimp = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: 2rem;
  height: 100%;
  justify-content: center;
  padding: 1rem;
`;

export const Message = styled.p`
  align-items: flex-end;
  color: ${theme.text.dark};
  display: flex;
  font-size: 1.8rem;
  font-weight: 550;
  justify-content: center;
  width: 100%;
`;

export const Waffle = styled.img`
  height: 4rem;
  margin-left: 0.5rem;
`;

export const Explanation = styled.p`
  color: ${theme.text.dark};
`;

export const Button = styled(B)`
  bottom: 4rem;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
`;