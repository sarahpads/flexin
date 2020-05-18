import styled from "styled-components";

import theme from "../../theme";
import { Button as B } from "../Typography.styled";

export const Button = styled(B)`
  bottom: 1rem;
  left: 50%;
  position: fixed;
  transform: translateX(-50%);
  z-index: 2;
`