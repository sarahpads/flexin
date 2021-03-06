import styled from "styled-components";

import theme from "../../theme";
import { Circle as C, Button as B } from "../../Layout/Typography.styled";
export { H1, P } from "../../Layout/Typography.styled";

export const CompletedChallenge = styled.div`
  box-sizing: border-box;
  min-height: 100%;
  padding: 0 ${theme.dimensions.pagePadding} 4rem;
  text-align: center;
`;

export const Circle = styled(C)`
  margin: 0 auto;
`;

export const Content = styled.div`
  /* TODO: some of these styles are shared */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding-top: 8rem;
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
  margin: auto auto 0;
`;