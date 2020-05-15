import styled from "styled-components";

import theme from "../../theme";
import { Button as B } from "../Typography.styled";

export const Button = styled(B)`
  align-self: stretch;
  color: ${theme.text.dark};
  font-size: 1rem;
  line-height: 2rem;
  margin: 0;
  width: 15rem;
`