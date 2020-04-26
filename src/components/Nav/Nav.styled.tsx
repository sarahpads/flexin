import styled from "styled-components";

import theme from "../../theme";

export const Nav = styled.div`
  height: ${(props) => theme.dimensions.navHeight};
  position: relative;
  z-index: 2;
`