import React, { SetStateAction, useState, Dispatch, useContext } from "react";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import userContext from "../contexts/userContext";
import galleryAPI from "../utils/axios";

const Admin = () => {
  const { loggedIn, setLoggedIn } = useContext(userContext);

  const logout = () => {
    localStorage.removeItem("jwt")
    setLoggedIn(false);
  }

  return (
    <div className="pt-5">
      {!loggedIn ? (
        <Login />
      ) : (
        <Dashboard/>
      )}
    </div>
  );
};

export default Admin;
