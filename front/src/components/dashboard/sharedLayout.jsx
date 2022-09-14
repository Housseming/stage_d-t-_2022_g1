import React from "react";
import {Outlet} from "react-router-dom";
import Example from "./Example";
import Navbar from "../../newNavbar/Navbar";
import Sidebar from "../../newNavbar/Sidebar";
export const Sharedlayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </>
  );
};