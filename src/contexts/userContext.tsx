import React from "react";
import {userInterface} from "../interfaces/interfaces"

export default React.createContext<userInterface>({
  loggedIn: false,
  setLoggedIn: () => {},
  loading: false,
  setLoading: () => {}
});