import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {
  PlusIcon,
  ServerIcon,
  ScaleIcon,
  CogIcon,
  CreditCardIcon,
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
  ClockIcon,
  CurrencyYenIcon,
  FlagIcon,
  FolderOpenIcon,
  LibraryIcon,
  FolderIcon,
  UserCircleIcon,
  UserIcon,
  DocumentSearchIcon,
  ArchiveIcon,
  DocumentIcon,
} from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FolderAddIcon,
  PencilAltIcon,
  UserAddIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
const solutions = [
  {
    name: "Paramètre globale",
    description: "",
    href: "/home/Parametreglobale",
    icon: CogIcon,
  },
  {
    name: "honoraire en extra",
    description: "",
    href: "/home/honoraireenextra",
    icon: CreditCardIcon,
  },
];

const solutions1 = [
  {
    name: "Emplacement dossier",
    description: "",
    href: "/home/emplacementdossier",
    icon: FolderOpenIcon,
  },
  {
    name: "Tribunaux et Administrations",
    description: "",
    href: "/home/Tribunaux_et_administrations",
    icon: LibraryIcon,
  },
  {
    name: "Type dossier",
    description: " ",
    href: "#",
    icon: FolderIcon,
  },
  {
    name: "Utilisateur",
    description: " ",
    href: "/home/utilisateur",
    icon: UserAddIcon,
  },
  {
    name: "Huissier",
    description: " ",
    href: "/home/primehuissier",
    icon: UserCircleIcon,
  },
  {
    name: "Collaborateur",
    description: " ",
    href: "/home/collaborateurs",
    icon: UserGroupIcon,
  },
  {
    name: "primeorateur",
    description: "",
    href: "#",
    icon: CurrencyYenIcon,
  },
  {
    name: "Greffier",
    description: " ",
    href: "#",
    icon: PencilAltIcon,
  },
  {
    name: "Prime Greffier",
    description: " ",
    href: "#",
    icon: CreditCardIcon,
  },
];

const client0 = [
  {name: "Gestion Client", href: "/home/gestionclient", icon: UserIcon},
  {name: "Fiche Signalitique", href: "#", icon: DocumentIcon},
];

const resources2 = [
  {
    name: "Recherche",
    description: "",
    href: "/home/recherchedossier",
    icon: DocumentSearchIcon,
  },
  {
    name: "Emplacement Dossier",
    description: "",
    href: "/home/dossiers",
    icon: FolderIcon,
  },
  {
    name: "Creation",
    description: "",
    href: "/home/creationdossier",
    icon: FolderAddIcon,
  },
  {
    name: "Gestion Archive",
    description: "",
    href: "#",
    icon: ArchiveIcon,
  },
];
const resources3 = [
  {
    name: "Tâche",
    description: "",
    href: "#",
  },
  {
    name: "Huissier",
    description: "",
    href: "#",
  },
  {
    name: "Echéance",
    description: "",
    href: "#",
  },
  {
    name: "Recouvrement",
    description: "",
    href: "#",
  },
  {
    name: "Expert",
    description: "",
    href: "#",
  },
];

export default function Example() {
  return (
    <div className="App">
      <Navbar
        bg="light"
        variant="black"
        expand="sm"
        className="flex justify-between items-center px-1 py-6 sm:px-6 md:justify-start ">
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <NavDropdown
              title="Paramètres"
              className="relative -ml-7 mt-1 transform w-screen max-w-sm lg:max-w-3xl font-bold">
              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2 w-100 h-100">
                {solutions.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-m-1 p-1 flex items-start rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white sm:h-12 sm:w-12">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}

                {solutions1.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-m-2 p-2 flex items-start rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white sm:h-12 sm:w-12">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <p className="text-base font-medium text-gray-900 p-2">
                      {item.name}
                    </p>
                  </a>
                ))}
              </div>
            </NavDropdown>
            <NavDropdown title="Clients" className="font-bold">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {client0.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-4 p-1 flex items-start rounded-lg hover:bg-gray-50">
                      <div
                        className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-md bg-blue-500 
                              text-white sm:h-12 sm:w-12">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {item.name}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </NavDropdown>
            <NavDropdown title="Dossiers" className="font-bold ">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden ">
                <div className="relative grid gap-6 bg-white px-4 py-6 sm:gap-8 sm:p-5">
                  {resources2.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-4 p-2 flex items-start rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white sm:h-12 sm:w-12">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900 p-1">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </NavDropdown>
            <div className="font-bold">
              <Nav.Link href="/home/underconstruction">Rappel</Nav.Link>
            </div>
            <div className="font-bold">
              <Nav.Link href="/home/underconstruction" className="font-bold">
                Réglement
              </Nav.Link>
            </div>
            <div className="font-bold">
              <Nav.Link href="/home/underconstruction" className="font-bold">
                Etat Huissier
              </Nav.Link>
            </div>
            <div className="flex items-center md:ml-60">
              <a
                href="/"
                className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-500  ml-10">
                Se déconnecter
              </a>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
