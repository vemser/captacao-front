import { createTheme } from "@mui/material";
import { ptBR } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";


export const theme = createTheme(
  {
    typography: {
      fontFamily: "Inter, sans-serif",
    },
    palette: {
      primary: {
        main: "#1E62FE",
        light: "#F2F2F2",
      },
      secondary: {
        main: "#040C2C",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: "none",
            "& .MuiDataGrid-cell": {
              color: "#040C2C",
            },
          },
        },
      },
    },
  },
  ptBR
);
