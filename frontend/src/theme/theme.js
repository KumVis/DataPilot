import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb", // professional blue
    },
    background: {
      default: "#f1f5f9",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
