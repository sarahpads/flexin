import styled from "styled-components";

import  theme from "../../../theme";
import { P as p, Button as B } from "../../../Layout/Typography.styled";
export { RepsInput } from "../../../Layout/Typography.styled";

export const Form = styled.form`
  color: ${theme.text.dark};
`

export const Button = styled(B)`
  margin-top: 3rem;
`

export const P = styled(p)`
  margin: 1rem 0;
`