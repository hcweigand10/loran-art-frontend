import React, { useContext } from "react";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import userContext from "../contexts/userContext";

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
