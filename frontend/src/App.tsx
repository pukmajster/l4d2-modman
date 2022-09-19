import { Box, CssBaseline } from "@mui/material";
import { Stack, ThemeProvider } from "@mui/system";
import Header from "./components/Header";
import ModLibrary from "./components/ModLibrary";
import Sidebar from "./components/Sidebar";
import { theme } from "./constants/theme";

const App: React.FC = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Stack maxHeight="100vh" overflow={"hidden"}>
          <Header />

          <Box
            display="grid"
            gridTemplateColumns={"256px 1fr"}
            height="calc(100vh - 52px)"
          >
            <Sidebar />
            <ModLibrary />
          </Box>
        </Stack>
      </ThemeProvider>
    </div>
  );
};

export default App;
