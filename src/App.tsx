import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./css/App.css";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
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
import WallArt from "./pages/WallArt";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<string[]>([])


  useEffect(() => {
    checkToken()
    fetchTags()
  }, []);

  const fetchTags = async () => {
    const tagsData: any = await galleryAPI.get("/api/tags");
    setTags(tagsData.data.map((tag: {id: number, name: string}) => tag.name))
  };

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
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }


  return (
    <BrowserRouter>
    <UserContext.Provider value={{loggedIn, setLoggedIn, loading, setLoading}}>
      <Navbar />
      <div className="container mx-auto" id="home">
        <Routes>
          <Route index={true} element={<Home />} />
          <Route path="gallery/wall-art" element={<WallArt/>} />
          <Route path="gallery/*" element={<Gallery/>} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
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
