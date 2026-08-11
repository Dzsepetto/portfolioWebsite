import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import { socials } from "../../../lib/socials";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialsOpen, setSocialsOpen] = useState(false);

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    localStorage.setItem("lang", lng);
    i18n.changeLanguage(lng);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
    setSocialsOpen(false);
  };

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");

    footer?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
    setSocialsOpen(false);
  };

  const toggleSocials = () => {
    setSocialsOpen((previousState) => !previousState);
  };

  const handleSocialsKeyDown = (event) => {
    if (event.key === "Escape") {
      setSocialsOpen(false);
    }
  };

  const lang = i18n.resolvedLanguage || i18n.language || "en";

  const current =
    lang.startsWith("hu")
      ? "hu"
      : lang.startsWith("de")
        ? "de"
        : lang.startsWith("en")
          ? "en"
          : "hu";

  const { t } = useTranslation();

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-main">
          <div className="navbar-left">
            <div
              className="lang-switch"
              role="group"
              aria-label="Language switch"
            >
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

          <div className="navbar-center">
            <button
              type="button"
              className="navbar-link"
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>

            <button
              type="button"
              className="navbar-link"
              onClick={() => scrollToSection("experience")}
            >
              Experience
            </button>

            <button
              type="button"
              className="navbar-link"
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </button>

            <div
              className={`nav-dropdown ${socialsOpen ? "open" : ""}`}
              onKeyDown={handleSocialsKeyDown}
            >
              <button
                type="button"
                className="nav-dropdown-trigger"
                onClick={toggleSocials}
                aria-expanded={socialsOpen}
                aria-controls="socials-dropdown"
              >
                <span>Socials</span>

                <span className="dropdown-arrow" aria-hidden="true">
                  ▾
                </span>
              </button>

              <div
                id="socials-dropdown"
                className="nav-dropdown-menu"
              >
                {socials.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setSocialsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-right">
          <button
            type="button"
            className="navbar-toggle"
            aria-label={
              menuOpen
                ? t("navigation.closeMenu")
                : t("navigation.openMenu")
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`navbar-mobile ${menuOpen ? "open" : ""}`}
        >
          <button
            type="button"
            className="navbar-mobile-link"
            onClick={() => scrollToSection("home")}
          >
            Home
          </button>

          <button
            type="button"
            className="navbar-mobile-link"
            onClick={() => scrollToSection("experience")}
          >
            Experience
          </button>

          <button
            type="button"
            className="navbar-mobile-link"
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </button>

          <button
            type="button"
            className="navbar-mobile-link mobile-socials"
            onClick={scrollToFooter}
          >
            Socials
          </button>
        </div>
      </div>
    </nav>
  );
}