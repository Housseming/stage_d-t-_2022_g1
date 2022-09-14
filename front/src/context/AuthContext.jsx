import React from "react";
import { useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios";
import sublinks from "../newNavbar/data";
const AuthContext = createContext();
// this component is going to stock the state logged in
function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);

   const openSidebar = () => {
     setIsSidebarOpen(true);
   };
   const closeSidebar = () => {
     setIsSidebarOpen(false);
   };
   const openSubmenu = () => {
     setIsSubmenuOpen(true);
   };
   const closeSubmenu = () => {
     setIsSubmenuOpen(false);
   };

  const getLoggedIn = async () => {
    const loggedInresponse = await axios.get("/loggedIn");
    setLoggedIn(loggedInresponse.data);
    console.log(loggedInresponse.data);
  };
  useEffect(() => {
    getLoggedIn();
  },[]);
  return (
    <>
      <AuthContext.Provider
        value={{
          loggedIn,
          getLoggedIn,
          openSidebar,
          closeSidebar,
          openSubmenu,
          closeSubmenu,
          isSidebarOpen,
          isSubmenuOpen,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
}
export default AuthContext;
export { AuthContextProvider };
