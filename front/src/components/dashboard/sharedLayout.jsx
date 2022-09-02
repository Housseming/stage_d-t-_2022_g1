import React from "react";
import { Outlet } from "react-router-dom";
import { DropMenu } from "../navbar/Menu";
export const Sharedlayout = () => {
  return (
    <>
      <DropMenu />
      <Outlet></Outlet>
    </>
  );
};