import { FaCreditCard, FaBook, FaBriefcase } from 'react-icons/fa';
import React from 'react';
const sublinks = [
  {
    page: "Paramètres",
    links: [
      { label: "Paramètre globale", icon: <FaCreditCard />, url: "/products" },
      { label: "Honoraire en extra", icon: <FaCreditCard />, url: "/products" },
      {
        label: "Emplacement dossier",
        icon: <FaCreditCard />,
        url: "/products",
      },
      {
        label: "Tribunaux et Administrations",
        icon: <FaCreditCard />,
        url: "/products",
      },
      {
        label: "Type Dossier",
        icon: <FaCreditCard />,
        url: "/products",
      },
      {
        label: "Utilisateur",
        icon: <FaCreditCard />,
        url: "/products",
      },
      {
        label: "Huissier",
        icon: <FaCreditCard />,
        url: "/products",
      },
      {
        label: "Collaborateur",
        icon: <FaCreditCard />,
        url: "/products",
      },
      {
        label: "Greffier",
        icon: <FaCreditCard />,
        url: "/products",
      },
      {
        label: "Prime Greffier",
        icon: <FaCreditCard />,
        url: "/products",
      },
    ],
  },
  {
    page: "Debours",
    links: [
      { label: "Timbre", icon: <FaBriefcase />, url: "/products" },
      { label: "Photocopie", icon: <FaBriefcase />, url: "/products" },
      { label: "Transport", icon: <FaBriefcase />, url: "/products" },
      { label: "Recette Du Finance", icon: <FaBriefcase />, url: "/products" },
    ],
  },
  {
    page: "Clients",
    links: [
      { label: "Gestion client", icon: <FaBook />, url: "/products" },
      { label: "Fiche Signalitique", icon: <FaBook />, url: "/products" },
    ],
  },
  {
    page: "Dossiers",
    links: [
      { label: "Recherche Dossier", icon: <FaBriefcase />, url: "/products" },
      { label: "Emplacement Dossier", icon: <FaBriefcase />, url: "/products" },
      { label: "Création Dossier", icon: <FaBriefcase />, url: "/products" },
      { label: "Gestion Archive", icon: <FaBriefcase />, url: "/products" },
    ],
  },
  {
    page: "Rappel",
    links: [
      { label: "Tâche", icon: <FaBriefcase />, url: "/products" },
      { label: "Huissier", icon: <FaBriefcase />, url: "/products" },
      { label: "Echéance", icon: <FaBriefcase />, url: "/products" },
      { label: "Recouvrement", icon: <FaBriefcase />, url: "/products" },
      { label: "Expert", icon: <FaBriefcase />, url: "/products" },
    ],
  },
  {
    page: "Réglement",
    links: [
      { label: "réglement", icon: <FaBriefcase />, url: "/products" },
      
    ],
  },
  {
    page: "Etat Huissier",
    links: [
      { label: "Etat Huissier", icon: <FaBriefcase />, url: "/products" },
     
    ],
  },
];

export default sublinks;
