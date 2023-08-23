import React from 'react';
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Gallary from "./pages/Gallary";
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
          <Route path="/gallary" element={<Gallary />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
