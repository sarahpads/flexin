import React from "react";

import theme from "../theme";

const ThemeContext = React.createContext(theme.defaultPalette);

export default ThemeContext;