import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Links from "./pages/Links";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import UserContext from "./contexts/userContext";
import galleryAPI from "./utils/axios";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    checkToken()
  }, []);

  const checkToken = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        setLoading(true)
        const response = await galleryAPI.post("/api/users/check-token", {},{
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setLoading(false)
        if (response.status === 200) {
          setLoggedIn(true);
        }
      } catch (err) {
        console.log("bad token");
        console.log(err);
        localStorage.removeItem("jwt");
      }
    }
  }


  return (
    <BrowserRouter>
    <UserContext.Provider value={{loggedIn, setLoggedIn, loading, setLoading}}>
      <Navbar />
      <div className="page">
        <Routes>
          <Route index={true} element={<Home />} />
          <Route path="gallery/*" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="links" element={<Links />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
