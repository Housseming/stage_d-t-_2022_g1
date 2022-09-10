import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
//import Axios from 'axios';
import Parametreglobale from "./components/dashboard/Parametreglobale";
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
import { Collabo } from "./components/dashboard/collaborateurs/collabo";
import CreationDossier from "./components/dashboard/creationdossier";
import Footer from "./components/FOOTER/footer";
import Dossiers from "./components/dashboard/Dossiers";
import About from "./components/welcome/about";
import Error from "./components/dashboard/error";
import Underconstruction from "./components/dashboard/underconstruction";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import Typedossier from "./components/dashboard/typedossier";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

axios.defaults.withCredentials = true;

function Router() {
 // const { loggedIn } = useContext(AuthContext);

  return (
    /*<BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Home></Home>
            }
          ></Route>
          <Route
            path="login"
            element={
              loggedIn == false ? (
                <AccountBox />
              ) : (
                <Navigate  to={"/home"} />
              )
            }
          ></Route>

          <Route
            path="register"
            element={
              loggedIn == false ? (
                <RegisterBox />
              ) : (
                <Navigate to={"/home"} />
              )
            }
          />

          <>
            <Route
               path="home"
              element={
                loggedIn === true ? (
                  <Sharedlayout />
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            >
              <Route
                 path="primehuissier"
                element={
                  
                    <PrimeHuissier />
                 
                }
              />
              <Route
                 path="utilisateur"
                element={
                  loggedIn == true ? (
                    <Utilisateur />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route
                path="Parametreglobale"
                element={
                  loggedIn == true ? (
                    <Parametreglobale />
                  ) : (
                    <Navigate  to={"/login"} />
                  )
                }
              />
              <Route
                path="honoraireenextra"
                element={
                  loggedIn == true ? (
                    <Honoraireenextra />
                  ) : (
                    <Navigate  to={"/login"} />
                  )
                }
              />
              <Route
                path="timbre"
                element={
                  loggedIn == true ? (
                    <Timbre />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route
                path="photocopie"
                element={
                  loggedIn == true ? (
                    <Photocopie />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route
                path="transport"
                element={
                  loggedIn == true ? (
                    <Transport />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route
                path="recettedufinance"
                element={
                  loggedIn == true ? (
                    <Recettedufinance />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route
                path="emplacementdossier"
                element={
                  loggedIn == true ? (
                    <Emplacementdossier />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route
                path="gestionclient"
                element={
                  loggedIn == true ? (
                    <Gestionclient />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route
                path="collaborateurs"
                element={
                  loggedIn == true ? (
                    <Collabo></Collabo>
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              ></Route>
              <Route
                path="Tribunaux_et_administrations"
                element={
                  loggedIn == true ? (
                    <Tribunale />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />

              <Route
                path="recherchedossier"
                element={
                  loggedIn == true ? (
                    <RechercheDossier />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              ></Route>
              <Route
                path="creationdossier"
                element={
                  loggedIn == true ? (
                    <CreationDossier />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              ></Route>
              <Route
                path="dossiers"
                element={
                  loggedIn == true ? (
                    <Dossiers />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              ></Route>
              <Route
                path="underconstruction"
                element={
                  loggedIn == true ? (
                    <Underconstruction></Underconstruction>
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              ></Route>
            </Route>
          </>

          <Route
            path="*"
            element={
              loggedIn == true ? (
                <Error></Error>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          ></Route>
        </Route>
      </Routes>
    
      <ToastContainer position="top-center"></ToastContainer>
    </BrowserRouter>*/
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home></Home>}></Route>

          <Route path="login" element={<AccountBox />}></Route>

          <Route path="register" element={<RegisterBox />} />

          <Route path="home" element={<Sharedlayout />}>
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
            <Route path="collaborateurs" element={<Collabo></Collabo>}></Route>
            <Route
              path="Tribunaux_et_administrations"
              element={<Tribunale />}
            />
            <Route path="welcome" element={<Welcome></Welcome>}></Route>
            <Route
              path="recherchedossier"
              element={<RechercheDossier />}
            ></Route>
            <Route path="creationdossier" element={<CreationDossier />}></Route>
            <Route path="typedossier" element={<Typedossier />}></Route>
            <Route path="dossiers" element={<Dossiers />}></Route>
            <Route
              path="underconstruction"
              element={<Underconstruction></Underconstruction>}
            ></Route>
          </Route>

          <Route path="*" element={<Error></Error>}></Route>
        </Route>
      </Routes>

      <ToastContainer position="top-center"></ToastContainer>
    </BrowserRouter>
  );
}

export default Router;
