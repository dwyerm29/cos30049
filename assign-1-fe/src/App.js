import React from "react";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/searchresults" element={<SearchResults />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
