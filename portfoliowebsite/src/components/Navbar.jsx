import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransition } from "../context/TransitionContext";
import Logo from "../assets/images/monkey.jpg";
import "../styles/Navbar.css";
import { socials } from "../config/socials";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsTransitioning } = useTransition();

const handleNavigate = (path) => {
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

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-left">
          <img src={Logo} alt="Logo" />
        </div>

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

        <div className="navbar-right">
          <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

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

export default Navbar;
