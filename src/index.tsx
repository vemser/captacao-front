import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/theme";
import { Provider } from "react-redux";
import { store } from "shared/features/store";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>
);
