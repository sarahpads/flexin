import styled from "styled-components";

import theme from "../../theme";

export const Nav = styled.div`
  align-items: flex-start;
  display: flex;
  height: ${theme.dimensions.navHeight};
  justify-content: flex-end;
  position: relative;
  z-index: 10;
`

export const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin: 1rem;
  outline: none;
  padding: 0;
`

export const Settings = styled.div`
  position: relative;
  z-index: 5;
`