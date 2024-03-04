import React, { useContext } from "react";
import NavigationBar from "./shared/components/NavigationBar";
import Router from "./Router";
import axios from "axios";

import Signup from "./users/pages/Signup";
import Login from "./users/pages/Login";
import AuthContext, { AuthContextProvider } from "./shared/context/AuthContext";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};

export default App;
