// React Creator:
import React from "react";
import { createRoot } from "react-dom/client";
// Redux Creator:
import { Provider } from "react-redux";
import { store } from "./app/store";
// MUI Components:
import { SnackbarProvider } from "notistack";
// Components:
import App from "./App";
// MUI Styles:
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { theme, cacheRtl } from "./configs/MUI/theme";
// Service worker
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.Fragment>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <SnackbarProvider maxSnack={3} autoHideDuration={6000}>
            <App />
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  </React.Fragment>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
