import { createThemeBuilder } from "@tamagui/theme-builder";

import { colors } from "./constants/colors";

const palettes = {
  light: [
    colors.white,
    colors["purple-9"],
    colors["gray-3"],
    colors["gray-7"],
    colors.black,
    colors["gray-10"],
    colors["gray-7"],
    colors["purple-1"],
  ],
};
const templates = {
  base: {
    bg: 0,
    border: 2,
    muted: 3,
    primary: 1,
    primaryLight: 7,
    textAccent: 5,
    textMuted: 6,
    textPrimary: 4,
  },
};

export const themes = createThemeBuilder()
  .addPalettes(palettes)
  .addTemplates(templates)
  .addThemes({
    light: {
      palette: "light",
      template: "base",
    },
  })
  .build();
