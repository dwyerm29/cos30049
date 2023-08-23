import React from 'react';
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
