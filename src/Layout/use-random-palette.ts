import { useEffect, useState } from "react";

import theme, { Palette } from "../theme";

export default function useRandomPalette(): Palette {
  const [palette, setPalette] = useState({} as Palette);

  const palettes = [
    theme.colors.palettePurple,
    theme.colors.paletteBlue,
    theme.colors.paletteRed,
    theme.colors.paletteGreen
  ];

  useEffect(() => {
    const index: number = Math.floor(Math.random() * palettes.length);

    setPalette(palettes[index]);
  }, []);

  return palette;
}