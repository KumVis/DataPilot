import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f4f6f8",
    },
    primary: {
      main: "#1976d2",
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
