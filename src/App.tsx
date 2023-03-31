import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./css/App.css";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Links from "./pages/Links";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import UserContext from "./contexts/userContext";
import galleryAPI from "./utils/axios";
import Edit from "./pages/Edit";
import Create from "./pages/Create";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkToken()
  }, []);

  const checkToken = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
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
        console.log(err);
        localStorage.removeItem("jwt");
      }
    } else {
      setLoading(false)
    }
  }


  return (
    <BrowserRouter>
    <UserContext.Provider value={{loggedIn, setLoggedIn, loading, setLoading}}>
      <Navbar />
      <div className="container mx-auto lg:max-w-4xl" id="home">
        <Routes>
          <Route index={true} element={<Home />} />
          <Route path="gallery/*" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="links" element={<Links />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/edit/*" element={<Edit />} />
          <Route path="admin/create-new" element={<Create />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
