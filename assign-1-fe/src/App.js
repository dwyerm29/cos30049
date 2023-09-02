import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth/AuthWrap";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <BrowserRouter>
          <AuthWrapper />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
