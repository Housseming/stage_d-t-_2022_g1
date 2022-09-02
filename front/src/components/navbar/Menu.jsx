import React from "react";
import "./menu.css";
import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar, NavDropdown} from "react-bootstrap"
import { ScaleIcon } from "@heroicons/react/outline";

export  function DropMenu () {
  return (
    <div className="App">
      <Navbar bg="light" variant="black" expand="sm">
        <Navbar.Brand>
          <img src={require("../../images/balance1.png")} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <NavDropdown title="Paramètres">
              <NavDropdown.Item href="/home/Parametreglobale">
                {" "}
                Paramètre globale
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/emplacementdossier">
                {" "}
                Emplacement Dossier
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href=""> Debours</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="">Type Dossier</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/primehuissier">
                {" "}
                Huissier
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/underconstruction">
                {" "}
                Prmeorateur
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/underconstruction">
                Prime Greffier
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/honoraireenextra">
                Honoraire en extra
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/Tribunaux_et_administrations">
                Tribunaux et Administrations
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/utilisateur">
                Utilisateur
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/collaborateurs">
                Collaborateur
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="">Greffier</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Clients">
              <NavDropdown.Item href="/home/gestionclient">
                {" "}
                Gestion client
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="home/underconstruction">
                Fiche Signalitique
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Dossiers">
              <NavDropdown.Item href="/home/recherchedossier">
                Recherche
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/dossiers">
                Emplacement Dossier
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/creationdossier">
                Creation
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/underconstruction">
                Gestion Archive
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/home/underconstruction">Rappel</Nav.Link>
            <Nav.Link href="/home/underconstruction">Réglement</Nav.Link>
            <Nav.Link href="/home/underconstruction">Etat Huissier</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}