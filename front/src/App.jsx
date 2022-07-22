import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
//import Axios from 'axios';
import Parametreglobal from "./components/dashboard/Parametreglobal.jsx"
import PrimeHuissier from "./components/dashboard/primehuissier.jsx";
import { Sharedlayout } from "./components/dashboard/sharedLayout.jsx";
import { AccountBox, RegisterBox } from "./components/accountBox/index.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<AccountBox />} />
          <Route path="/register" element={<RegisterBox />} />
          <Route path="/" element={<Sharedlayout />}>
            <Route path="Parametreglobal" element={<Parametreglobal />} />
            <Route path="primehuissier" element={<PrimeHuissier />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
                  }

export default App;
