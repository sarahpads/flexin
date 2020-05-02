import styled from "styled-components";

export const Leaderboard = styled.div`
  box-sizing: border-box;
  color: grey;
  flex: 1;
  margin: 0 auto;
  padding: 2rem;
  z-index: 3;
`

interface TitleProps {
  color: string;
}

export const Title = styled.span<TitleProps>`
  border-bottom: 1px solid #EDEDED;
  color: ${(props) => props.color};
  display: block;
  font-weight: 600;
  padding-bottom: 1.5rem;
  text-align: left;
  text-transform: uppercase;
`