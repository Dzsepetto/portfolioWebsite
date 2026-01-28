import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransition } from "../context/TransitionContext";
import "../styles/components/Navbar.css";
import { socials } from "../config/socials";
import { useTranslation } from "react-i18next";

type Language = "hu" | "en";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsTransitioning } = useTransition();
  const { i18n } = useTranslation();

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

  const changeLanguage = (lng: Language) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved) i18n.changeLanguage(saved);
  }, [i18n]);

  const current: Language = (i18n.language?.startsWith("hu") ? "hu" : "en") as Language;

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
          </div>
        </div>

        {/* CENTER: nav */}
        <div className="navbar-center">
          <span onClick={() => handleNavigate("/")}>Home</span>
          <span onClick={() => handleNavigate("/about")}>About</span>
          <span onClick={() => handleNavigate("/projects")}>Projects</span>
          <span onClick={() => handleNavigate("/experience")}>Experience</span>

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

          <div className="mobile-lang">
            <button
              type="button"
              className={`lang-btn ${current === "hu" ? "active" : ""}`}
              onClick={() => changeLanguage("hu")}
            >
              HU
            </button>
            <button
              type="button"
              className={`lang-btn ${current === "en" ? "active" : ""}`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
          </div>

          <button className="mobile-socials" onClick={scrollToFooter}>
            Socials
          </button>
        </div>
      </div>
    </nav>
  );
}
