import styled from "styled-components";

import theme from "../../theme";

export const Nav = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: ${theme.dimensions.navHeight};
  padding: 1rem;
  position: absolute;
  width: 100%;
  z-index: 10;
`

export const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  margin-left: auto;
  padding: 0;
`

export const Settings = styled.div`
  position: relative;
  z-index: 5;
`