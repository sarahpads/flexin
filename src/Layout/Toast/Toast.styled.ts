import styled from "styled-components";

import theme from "../../theme";

export const ToastContainer = styled.div`
  bottom: 0;
  box-shadow: 0px -4px 5px 0px rgba(0,0,0,0.2);
  color: ${theme.text.dark};
  position: fixed;
  width: 100vw;
  z-index: 1;
`

export const Toast = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #EDEDED;
  height: 0;
  overflow: hidden;
  transition: 0.25s height;
  z-index: 1;

  &.toast-enter-active,
  &.toast-enter-done {
    height: 5rem;
  }

  &.toast-exit-active {
    z-index: 0;
  }
`