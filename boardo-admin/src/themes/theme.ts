import { createTheme, ThemeOptions } from "@mui/material/styles";

// assets
import colors from "../assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";

export const theme = () => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.grey50,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.grey100,
    divider: color.grey200,
  };

  interface ThemeOptions2 extends ThemeOptions {
    mainContent: {
      backgroundColor: string;
      width: string;
      minHeight: string;
      flexGrow: number;
      padding: string;
      marginTop: string;
    };
  }
  const themeOptions: ThemeOptions2 = {
    direction: "ltr",
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    mainContent: {
      backgroundColor: themeOption.background,
      width: "100%",
      minHeight: "calc(100vh - 72px)",
      flexGrow: 1,
      padding: "16px",
      marginTop: "72px",
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 500,
      },
      h2: {
        fontSize: "2.1rem",
        fontWeight: 500,
      },
      h3: {
        fontSize: "1.8rem",
        fontWeight: 500,
      },
      h4: {
        fontSize: "1.6rem",
        fontWeight: 500,
      },
      h5: {
        fontSize: "1.4rem",
        fontWeight: 500,
      },
      h6: {
        fontSize: "1.2rem",
        fontWeight: 500,
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 400,
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 400,
      },
      body1: {
        fontSize: "1rem",
        color: themeOption.colors.grey600,
        fontWeight: 400,
      },
      body2: {
        fontSize: "0.875rem",
        color: themeOption.colors.grey600,
        fontWeight: 400,
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
      },
    },
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
