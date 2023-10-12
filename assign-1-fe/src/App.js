import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth/AuthWrap";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice.js";
import { setCart } from "./store/cartSlice";
import Web3 from "web3";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const dispatch = useDispatch();

  if (localStorage.getItem("user") != null) {
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  }

  if (localStorage.getItem("cart") != null) {
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
  }

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
