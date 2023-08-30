import React from "react";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import FeaturedItems from "./pages/FeaturedItems";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Account from "./pages/Account";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Navbar />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/featureditems" element={<FeaturedItems />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
