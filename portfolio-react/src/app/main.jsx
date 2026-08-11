import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "../styles/index.css";
import "../styles/cards.css";

import "../i18n/index.js";
import App from "./App.jsx";



const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("A root elem nem található az index.html fájlban.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);