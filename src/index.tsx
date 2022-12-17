import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/theme";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "shared/features/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
