import React, { SetStateAction, useState, Dispatch, useContext } from "react";
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
    <div>
      {!loggedIn ? (
        <Login />
      ) : (
        <div>
          <p>dashboard</p>
          <button onClick={logout}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
