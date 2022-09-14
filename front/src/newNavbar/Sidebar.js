import React from 'react'
import { useContext } from 'react';
import { FaTimes } from 'react-icons/fa'
import sublinks from './data'
import AuthContext from "../context/AuthContext";



const Sidebar = () => {
    const {
      openSidebar,
      closeSidebar,
      openSubmenu,
      closeSubmenu,
      isSidebarOpen,
      isSubmenuOpen,
    } = useContext(AuthContext);
  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? "sidebar-wrapper1 show1" : "sidebar-wrapper1"
        }`}
      ></aside>
      <div className="sidebar1">
        <button className="close-btn1" onClick={closeSidebar}>
          <FaTimes></FaTimes>
        </button>
      </div>
    </>
  );
}

export default Sidebar
