interface Palette {
  dark: string;
  neutral: string;
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
  paletteGrey
}

const theme = {
  colors,
  text: {
    default: "white"
  },
  defaultPalette: paletteGrey,
  dimensions: {
    navHeight: "5rem",
    pageBuffer: "15vh"
  }
}

let currentTheme = "";

export function getRandomPalette() {
  const available = Object.keys(colors).filter((c) => c !== currentTheme);
  const index: number = Math.floor(Math.random() * available.length);
  currentTheme = available[index];

  return available[index];
}

export default theme;
