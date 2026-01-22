import React from "react";
import "../styles/Footer.css";
import { socials } from "../config/socials";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <img
            src="/logo.svg"
            alt="Logo"
            className="footer-logo"
          />

          <p className="footer-title">Valami</p>
        </div>

        {/* RIGHT */}
        <div className="footer-links">

          <div className="footer-column">
            <h4>About Me</h4>
            <ul>
              <li>About</li>
              <li>Projects</li>
              <li>Projects</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Programming Languages</h4>
            <ul>
              <li>C#</li>
              <li>.NET</li>
              <li>Python</li>
              <li>Powershell</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Social</h4>
            <div className="footer-social">
              {socials.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                >
                  <img src={item.icon} alt={item.name} />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Benedek Pintér aka. Dzsepetto
      </div>
    </footer>
  );
}

export default Footer;
