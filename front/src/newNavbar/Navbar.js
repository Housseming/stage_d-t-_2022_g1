import React from 'react'
import { useContext } from 'react';
import { FaBars } from 'react-icons/fa'
import "./newNav.css";
import AuthContext from "../context/AuthContext";
const Navbar = () => {
  const {openSidebar,
          closeSidebar,
          openSubmenu,
          closeSubmenu,
          isSidebarOpen,
          isSubmenuOpen} = useContext(AuthContext);


  return (
   <nav className='nav1'>
    <div className="nav-center1">
      <div className="nav-header1">
        <button className='btn1 toggle-btn1' onClick={openSidebar}>
          <FaBars></FaBars>
        </button>

      </div>
      <ul className='nav-links1'>
        <li>
          <button className='link-btn1'>
            products
          </button>
        </li>

      </ul>
      <button className='btn1 signin-btn1'>Se déconnecter</button>
    </div>
   </nav>
  );
}

export default Navbar
