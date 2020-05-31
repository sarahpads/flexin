import styled from "styled-components";

import theme from "../../theme";
import { Button as B } from "../../Layout/Typography.styled";
export { H1, P } from "../../Layout/Typography.styled";

export const CreateProfile = styled.div`
  padding: ${theme.dimensions.pagePadding};
`;

export const Button = styled(B)`
  margin-top: 3rem;
`;
