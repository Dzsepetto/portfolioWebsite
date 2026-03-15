import "../styles/components/Footer.css";
import { socials } from "../config/socials";
import { useTranslation } from "react-i18next";

type Language = "hu" | "en";

function Footer() {
  const { t, i18n } = useTranslation();

  const current: Language = i18n.language?.startsWith("hu") ? "hu" : "en";

  const cvHref =
    current === "hu"
      ? "/cv/Pinter_Benedek_CV_HUN_1.pdf"
      : "/cv/Pinter_Benedek_CV_ENG_1.pdf";

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-links">

          {/* CONTACT */}
          <div className="footer-column footer-contact">
            <h4 className="footer-contact-title">
              {t("footer_contact")}
            </h4>

            <span className="footer-contact-email">
              pinterbence2002@gmail.com
            </span>
          </div>

          {/* LANGUAGES */}
          <div className="footer-column">
            <h4>{t("footer_languages")}</h4>

            <ul className="footer-skills">
              <li>C#</li>
              <li>.NET</li>
              <li>Python</li>
              <li>PowerShell</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="footer-column">
            <h4>{t("footer_social")}</h4>

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

          {/* CV */}
          <div className="footer-column">
            <h4>{t("footer_cv")}</h4>

            <div className="footer-cv-wrapper">
              <a
                href={cvHref}
                target="_blank"
                rel="noreferrer"
                className="footer-cv"
              >
                {t("footer_cv")}
              </a>
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