import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled",
        size: "small",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
  },
});
