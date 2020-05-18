import styled from "styled-components";

export const Header = styled.div`
  align-items: center;
  box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.2);
  display: flex;
  padding-bottom: 2rem;
  position: relative;
  z-index: 3;
`;

export const Picture = styled.div`
  border: 5px solid var(--palette-dark);
  border-radius: 50%;
  height: 7rem;
  margin: 0 auto 0.5rem;
  width: 7rem;
`

export const Section = styled.div`
  flex-basis: 33%;
  text-align: center;
`

export const UserName = styled.div`
  text-transform: uppercase;
`

export const Crown = styled.div`
  position: absolute;
  left: 50%;
  top: -2.7rem;
  transform: translateX(-50%);
`

export const Number = styled.span`
  font-size: 4rem;
  font-weight: 550;
`