import styled from "styled-components";

export const Leaderboard = styled.div`
  background-color: white;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.2);
  box-sizing: border-box;
  color: grey;
  flex: 1;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
  /* width: 100%; */
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