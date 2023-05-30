import React, { useState, useContext } from "react";
import galleryAPI from "../utils/axios";
import userContext from "../contexts/userContext";


const Settings = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const {setLoggedIn} = useContext(userContext)


  const changePassword = async (e: any) => {
    e.preventDefault()
    if (newPassword === confirmPassword) {
      const res = await galleryAPI.put(`/api/users/1`, {
        password: newPassword,
      });
      if (res.status === 200) {
          setLoggedIn(false)
          localStorage.removeItem("jwt")
          window.alert("Password changed successfully! You will now be sent to the login page")
          window.location.assign("/admin")
      }
    } else {
      window.alert("Passwords don't match");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h3 className="text-2xl">Change Password</h3>
      <form>
        <div className="my-2">
          <label htmlFor="new-password">New Password</label>
          <div>
            <input
              type="password"
              id="new-password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>
        </div>
        <div className="my-2">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div>
            <input
              type="password"
              id="confirm-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
        </div>
        <button
          onClick={changePassword}
          className="bg-blue-500 rounded text-white p-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Settings;
