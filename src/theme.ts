export interface Palette {
  dark: string;
  neutral: string;
}

const paletteGreen = {
  dark: "#54904f",
  neutral: "#66a261"
}

const palettePurple = {
  dark: "#755BA8",
  neutral: "#8567AD"
}

const paletteBlue = {
  dark: "#5196BE",
  neutral: "#5FA8C9"
}

const paletteRed = {
  dark: "#C25B53",
  neutral: "#D36962"
}

const paletteYellow = {
  dark: "#E8B45F",
  neutral: "#F4BF6A"
}

const paletteGrey = {
  dark: "grey",
  neutral: "grey"
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
    default: "white"
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
