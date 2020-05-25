import styled from "styled-components";

import theme from "../../theme";

export const Toast = styled.div`
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #EDEDED;
  box-sizing: border-box;
  color: ${theme.text.dark};
  display: flex;
  height: 100%;
  padding: 0 2rem;
  width: 100%;
`

export const Message = styled.span`
  display: block;
  margin-left: 1.5rem;
`