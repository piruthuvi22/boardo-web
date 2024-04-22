/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

import { PaletteOptions } from "@mui/material";

export default function themePalette(theme: any): PaletteOptions {
  return {
    mode: theme?.customization?.navType,
    common: {
      black: theme.colors?.darkPaper,
    },
    primary: {
      "300": theme.colors?.primaryLighter,
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      dark: theme.colors?.primaryDark,
    },
    secondary: {
      "300": theme.colors?.secondaryLighter,
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain,
      dark: theme.colors?.secondaryDark,
    },
    success: {
      "300": theme.colors?.successLighter,
      light: theme.colors?.successLight,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark,
    },
    grey: {
      50: theme.colors?.grey50,
      100: theme.colors?.grey100,
      500: theme.darkTextSecondary,
      600: theme.heading,
      700: theme.darkTextPrimary,
      900: theme.textDark,
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
      // primary: "#f00",
      // secondary: "#0f0",
    },
  };
}
