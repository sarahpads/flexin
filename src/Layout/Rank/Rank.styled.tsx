import styled from "styled-components";

import theme from "../../theme";

interface StandingProps {
  highlight: boolean;
}

export const Standing = styled.div<StandingProps>`
  align-items: center;
  background-color: ${(props) => props.highlight ? "var(--palette-light)" : "transparent"};
  border-bottom: 1px solid #EDEDED;
  box-sizing: border-box;
  color: ${theme.text.dark};
  display: flex;
  padding: 1.5rem 2rem;

  &:last-child {
    border: none;
  }
`

export const Rank = styled.div`
  font-weight: 600;
  text-align: center;
  width: 3rem;
`

export const Avatar = styled.div`
  background-color: #EDEDED;
  border-radius: 50%;
  height: 3.5rem;
  margin: 0 1rem 0 1.5rem;
  width: 3.5rem;
`

export const Name = styled.span``

export const Waffles = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
`

export const Waffle = styled.img`
  display: inherit;
  height: 3.5rem;
`

export const WaffleCount = styled.span`
  font-size: 2rem;
  font-weight: 500;
  margin-right: 1rem;
`

export const Flex = styled.span`
  margin-left: auto;
`