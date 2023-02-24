import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Links from "./pages/Links";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route index={true} element={<Home />} />
          <Route path="gallery/*" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="links" element={<Links />} />
          <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
