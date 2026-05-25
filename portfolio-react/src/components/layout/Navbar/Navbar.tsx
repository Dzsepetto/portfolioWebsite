import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTransition } from "../../../app/providers/TransitionProvider";

import "./Navbar.css";
import { socials } from "../../../lib/socials";
import { useTranslation } from "react-i18next";

type Language = "hu" | "en" | "de";
type ViewMode = "2d" | "3d";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("2d");

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
        <div className="navbar-left">
          <div className="general-switch" role="group" aria-label="View mode switch">
            <button
              type="button"
              className={`general-switch-btn ${viewMode === "2d" ? "active" : ""}`}
              onClick={() => setViewMode("2d")}
            >
              2D
            </button>

            <button
              type="button"
              className={`general-switch-btn ${viewMode === "3d" ? "active" : ""}`}
              onClick={() => setViewMode("3d")}
            >
              3D
            </button>
          </div>
        </div>

        <div className="navbar-center">
          {viewMode === "2d" ? (
            <>
              <span onClick={() => handleNavigate("/")}>Home</span>
              <span onClick={() => handleNavigate("/about")}>About</span>
              <span onClick={() => handleNavigate("/projects")}>Projects</span>
              <span onClick={() => handleNavigate("/experience")}>Experience</span>

              <div className="nav-dropdown">
                <span className="nav-dropdown-trigger">Socials</span>
                <span className="dropdown-arrow">▾</span>

                <div className="nav-dropdown-menu">
                  {socials.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <span onClick={() => handleNavigate("/lounge")}>Lounge</span>
          )}
        </div>

        <div className="navbar-right">
          <div className="general-switch" role="group" aria-label="Language switch">
            <button
              type="button"
              className={`general-switch-btn ${current === "hu" ? "active" : ""}`}
              onClick={() => changeLanguage("hu")}
            >
              HU
            </button>

            <button
              type="button"
              className={`general-switch-btn ${current === "en" ? "active" : ""}`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>

            <button
              type="button"
              className={`general-switch-btn ${current === "de" ? "active" : ""}`}
              onClick={() => changeLanguage("de")}
            >
              DE
            </button>
          </div>

          <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        <div className={`navbar-mobile ${menuOpen ? "open" : ""}`}>
          {viewMode === "2d" ? (
            <>
              <span onClick={() => handleNavigate("/")}>Home</span>
              <span onClick={() => handleNavigate("/about")}>About</span>
              <span onClick={() => handleNavigate("/projects")}>Projects</span>
              <span onClick={() => handleNavigate("/experience")}>Experience</span>

              <button className="mobile-socials" onClick={scrollToFooter}>
                Socials
              </button>
            </>
          ) : (
            <span onClick={() => handleNavigate("/lounge")}>Lounge</span>
          )}
        </div>
      </div>
    </nav>
  );
}