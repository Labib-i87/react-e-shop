// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const useAuth = () => {
//   const [loggedIn, setLoggedIn] = useState(false);

//   const getLoggedIn = async () => {
//     const loggedInRes = await axios.get("http://localhost:5000/auth/loggedIn");
//     setLoggedIn(loggedInRes.data);
//   };

//   const getLoggedOut = async () => {
//     await axios.get("http://localhost:5000/auth/logout");
//     getLoggedIn();
//   };

//   useEffect(() => {
//     getLoggedIn();
//   }, []);

//   return { loggedIn, getLoggedIn, getLoggedOut };
// };

// export default useAuth;
