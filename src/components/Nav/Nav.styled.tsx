import styled from "styled-components";

import theme from "../../theme";

export const Nav = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => theme.dimensions.navHeight};
  justify-content: flex-end;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
`

export const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`