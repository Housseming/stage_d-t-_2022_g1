import React from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
axios.defaults.withCredentials = true 
function Home() {
  const sendLogout = async() =>{
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
    

  }
  return (
    <div>Bienvenue ! 
        <Link to="/login">
        <button type="button" onClick={handleLogout}>Se connecter</button>
        </Link>
    </div>
    
  )
}

export default Home