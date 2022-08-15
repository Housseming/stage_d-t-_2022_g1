import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navhome";
import "./nav.css";
import image from "./backgroundavocat.jpg";
axios.defaults.withCredentials = true;

function Home() {
  /* const sendLogout = async() =>{
    const res = await axios.post("/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("unable to logout");

  }
  const handleLogout = ()=>{
    sendLogout();
    

  }*/

  return (
    <>
      <Navbar></Navbar>
      <div className="imgbackground">
        <img src={image} alt="image" />
      </div>
      <div className="hellotext">
        <h1>Bienvenue dans notre site web !</h1>
        <p>Le meilleur espace pour gérer votre cabinet d'avocat</p>
      </div>
    </>
  );
}

export default Home;
