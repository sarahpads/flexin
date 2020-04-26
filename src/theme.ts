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

const colors: { [key: string]: Palette } = {
  palettePurple,
  paletteBlue,
  paletteRed,
  paletteYellow
}

const theme = {
  colors,
  dimensions: {
    navHeight: "5rem"
  }
}

let currentTheme = "";

export function getRandomTheme() {
  const available = Object.keys(colors).filter((c) => c !== currentTheme);
  const index: number = Math.floor(Math.random() * available.length);
  currentTheme = available[index];

  return available[index];
}

export default theme;
