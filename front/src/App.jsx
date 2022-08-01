import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
//import Axios from 'axios';
import Parametreglobale from "./components/dashboard/Parametreglobale"
import PrimeHuissier from "./components/dashboard/primehuissier.jsx";
import { Sharedlayout } from "./components/dashboard/sharedLayout.jsx";
import { AccountBox, RegisterBox } from "./components/accountBox/index.jsx";
import { ToastContainer } from "react-toastify";
import Gestionclient from "./components/dashboard/Gestionclient.jsx";
import "react-toastify/dist/ReactToastify.css";
import Honoraireenextra from "./components/dashboard/honoraireenextra.jsx";
import Timbre from "./components/dashboard/timbre.jsx";
import Photocopie from "./components/dashboard/photocopie.jsx";
import Transport from "./components/dashboard/transport.jsx";
import Recettedufinance from "./components/dashboard/recettedufinance.jsx";
import Emplacementdossier from "./components/dashboard/emplacementdossier.jsx";
import Utilisateur from "./components/dashboard/utilisateur";
import Tribunale from "./components/dashboard/tribinaux_administrations/tribunale";
import Welcome from "./components/welcome/welcome";
import RechercheDossier from "./components/dashboard/recherchedossier";
import Home from "./components/welcome/Home";
import {Collabo} from "./components/dashboard/collaborateurs/collabo";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home></Home>}></Route>
        <Route path="/login" element={<AccountBox />} />
        <Route path="/register" element={<RegisterBox />} />
        <Route path="/" element={<Sharedlayout />}>
          <Route path="primehuissier" element={<PrimeHuissier />} />
          <Route path="utilisateur" element={<Utilisateur />} />
          <Route path="Parametreglobale" element={<Parametreglobale />} />
          <Route path="honoraireenextra" element={<Honoraireenextra />} />
          <Route path="timbre" element={<Timbre />} />
          <Route path="photocopie" element={<Photocopie />} />
          <Route path="transport" element={<Transport />} />
          <Route path="recettedufinance" element={<Recettedufinance />} />
          <Route path="emplacementdossier" element={<Emplacementdossier />} />
          <Route path="gestionclient" element={<Gestionclient />} />
          <Route path="collab" element={<Collabo></Collabo>}></Route>
          <Route path="Tribunale" element={<Tribunale />} />
          <Route path="welcome" element={<Welcome></Welcome>}></Route>
          <Route path="recherchedossier" element={<RechercheDossier/>}></Route>

          {/*<Route
            path="/tribunale"
            element={<Tribunale/>}
  ></Route>*/}
        </Route>
      </Routes>
      <ToastContainer position="top-center"></ToastContainer>
    </BrowserRouter>
  );
                  }

export default App;
