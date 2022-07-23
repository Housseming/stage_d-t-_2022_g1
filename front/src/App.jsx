import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
//import Axios from 'axios';
import Parametreglobale from "./components/dashboard/Parametreglobale"
import PrimeHuissier from "./components/dashboard/primehuissier.jsx";
import { Sharedlayout } from "./components/dashboard/sharedLayout.jsx";
import { AccountBox, RegisterBox } from "./components/accountBox/index.jsx";

import Gestionclient from "./components/dashboard/Gestionclient.jsx";

import Honoraireenextra from "./components/dashboard/honoraireenextra.jsx";
import Timbre from "./components/dashboard/timbre.jsx";
import Photocopie from "./components/dashboard/photocopie.jsx";
import Transport from "./components/dashboard/transport.jsx";
import Recettedufinance from "./components/dashboard/recettedufinance.jsx";
import Emplacementdossier from "./components/dashboard/emplacementdossier.jsx";
import Utilisateur from "./components/dashboard/utilisateur";


import {Collabo} from "./components/dashboard/collaborateurs/collabo"
function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="collab" element={<Collabo></Collabo>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
                  }

export default App;
