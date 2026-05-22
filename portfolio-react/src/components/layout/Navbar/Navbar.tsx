import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTransition } from "../../../app/providers/TransitionProvider";

import "./Navbar.css";
import { socials } from "../../../lib/socials";
import { useTranslation } from "react-i18next";

type Language = "hu" | "en" | "de";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsTransitioning } = usePageTransition();
  const { i18n } = useTranslation();

  const changeLanguage = (lng: Language) => {

    localStorage.setItem("lang", lng);
    i18n.changeLanguage(lng);
  };

  const handleNavigate = (path: string) => {
    setIsTransitioning(true);

    setTimeout(() => {
      navigate(path);
    }, 500);

    setTimeout(() => {
      setIsTransitioning(false);
      setMenuOpen(false);
    }, 1100);
  };

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    footer?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const lang = i18n.language || "en";

  const current: Language =
    lang.startsWith("hu") ? "hu" :
    lang.startsWith("de") ? "de" :
    lang.startsWith("en") ? "en" :
    "hu";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LEFT: language switch */}
        <div className="navbar-left">
          <div className="lang-switch" role="group" aria-label="Language switch">
            <button
              type="button"
              className={`lang-btn ${current === "hu" ? "active" : ""}`}
              onClick={() => changeLanguage("hu")}
              aria-pressed={current === "hu"}
            >
              HU
            </button>
            <button
              type="button"
              className={`lang-btn ${current === "en" ? "active" : ""}`}
              onClick={() => changeLanguage("en")}
              aria-pressed={current === "en"}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${current === "de" ? "active" : ""}`}
              onClick={() => changeLanguage("de")}
              aria-pressed={current === "de"}
            >
              DE
            </button>
          </div>
        </div>

        {/* CENTER: nav */}
        <div className="navbar-center">
          <span onClick={() => handleNavigate("/")}>Home</span>
          <span onClick={() => handleNavigate("/about")}>About</span>
          <span onClick={() => handleNavigate("/projects")}>Projects</span>
          <span onClick={() => handleNavigate("/experience")}>Experience</span>
          <span onClick={() => handleNavigate("/lounge")}>Lounge</span>

          <div className="nav-dropdown">
            <span className="nav-dropdown-trigger">Socials</span>
            <span className="dropdown-arrow">▾</span>
            <div className="nav-dropdown-menu">
              {socials.map((item) => (
                <a key={item.name} href={item.url} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: mobile toggle */}
        <div className="navbar-right">
          <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        {/* MOBILE */}
        <div className={`navbar-mobile ${menuOpen ? "open" : ""}`}>
          <span onClick={() => handleNavigate("/")}>Home</span>
          <span onClick={() => handleNavigate("/about")}>About</span>
          <span onClick={() => handleNavigate("/projects")}>Projects</span>
          <span onClick={() => handleNavigate("/experience")}>Experience</span>
          <button className="mobile-socials" onClick={scrollToFooter}>
            Socials
          </button>
        </div>
      </div>
    </nav>
  );
}
