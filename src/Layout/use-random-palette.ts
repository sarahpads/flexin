import { useEffect, useState } from "react";

import theme, { Palette } from "../theme";

let currentPalette: Palette;

export default function useRandomPalette() {
  const [palette, setPalette] = useState({} as Palette);

  const palettes = [
    theme.colors.palettePurple,
    theme.colors.paletteBlue,
    theme.colors.paletteRed,
    theme.colors.paletteGreen
  ];

  useEffect(() => {
    const available = palettes.filter((p) => p !== currentPalette);
    const index: number = Math.floor(Math.random() * available.length);

    setPalette(palettes[index]);
  }, [])

  return palette;
}