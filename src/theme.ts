export interface Palette {
  dark: string;
  neutral: string;
  light: string;
}

const paletteGreen = {
  dark: "#54904f",
  neutral: "#66a261",
  light: "#66a2611f"
}

const palettePurple = {
  dark: "#755BA8",
  neutral: "#8567AD",
  light: "#8567ad1f"
}

const paletteBlue = {
  dark: "#5196BE",
  neutral: "#5FA8C9",
  light: "#5fa8c91f"
}

const paletteRed = {
  dark: "#C25B53",
  neutral: "#D36962",
  light: "#D369621f"
}

const paletteYellow = {
  dark: "#E8B45F",
  neutral: "#F4BF6A",
  light: "#F4BF6A1f"
}

const paletteGrey = {
  dark: "grey",
  neutral: "grey",
  light: "grey"
}

const colors: { [key: string]: Palette } = {
  palettePurple,
  paletteBlue,
  paletteRed,
  paletteYellow,
  paletteGrey,
  paletteGreen
}

const theme = {
  colors,
  text: {
    default: "white",
    dark: "#464646"
  },
  dimensions: {
    navHeight: "5rem",
    pagePadding: "2rem"
  },
  circle: {
    dimension: "22rem",
    fontSize: "7rem"
  }
}

export default theme;
