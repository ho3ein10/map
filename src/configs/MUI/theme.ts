// MUI Styles:
import { createTheme, Theme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import "@mui/styles";
import createCache from "@emotion/cache";
// Fonts:
import Poppins from "../../assets/fonts/poppins/Poppins.ttf";
import IranSans from "../../assets/fonts/IranSans/IRANSans.ttf";

declare module "@mui/private-theming" {
  interface DefaultTheme extends Theme {}
}

declare module "@mui/material/styles" {
  interface Palette {
    tertiary?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    blue?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    tertiary?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    blue?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary?: true;
    blue?: true;
  }
}

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});


export const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: [
      "IRANSans",
      "Poppins",
      "Arial",
      "Helvetica",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: "IRANSans";
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local("IRANSans"), local("IRANSans"), url(${IranSans}) format("truetype");
          unicoderange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
            U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
            U+FEFF;
        }

        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local("Poppins"), local("Poppins"), url(${Poppins}) format("truetype");
          unicoderange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
            U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
            U+FEFF;
        }

        body {
          direction: ltr
        }

        a {
          text-decoration: none;
          color: inherit
        }
      `,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#363C45",
      light: "#E3E3E3",
      dark: "#1C212D",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFD831",
      light: "#fff957",
      dark: "#ffc400",
      contrastText: "#1C212D",
    },
    tertiary: {
      main: "#FFFFFF",
      light: "#eceff1",
      dark: "#cfd8dc",
      contrastText: "#1C212D",
    },
    error: {
      main: "#EB4D4B",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#13DB63",
      light: "#99F3BD",
      dark: "#1b5e20",
      contrastText: "#FFFFFF",
    },
    blue: {
      main: "#3DC7FC",
      light: "#67d0f9",
      dark: "#27b3e9",
      contrastText: "#FFFFFF",
    },
    background: {
      paper: "#FFFFFF",
      default: "#ECECEC",
    },
    action: {
      disabled: "transparent",
    },
    text: {
      disabled: "none",
      primary: "#FFFFFF",
      secondary: "#292E3B",
    },
    divider: "#707070",
  },
});
