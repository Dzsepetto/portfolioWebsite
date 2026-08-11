import "./Footer.css";
import { socials } from "../../../lib/socials";
import { useTranslation } from "react-i18next";

function Footer() {
const { t, i18n } = useTranslation();

  const lang = i18n.resolvedLanguage?.toLowerCase()
    || i18n.language?.toLowerCase()
    || "hu";

  const current = lang.startsWith("hu")
    ? "hu"
    : lang.startsWith("de")
    ? "de"
    : "en";

  const cvHref =
    current === "hu"
      ? "/cv/Pinter-Benedek-2-HUN.pdf"
      : current === "de"
      ? "/cv/Pinter-Benedek-2-DE.pdf"
      : "/cv/Pinter-Benedek-2-ENG.pdf";

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-links">
          {/* CONTACT */}
          <div className="footer-column footer-contact">
            <h4 className="footer-contact-title">
              {t("footer.contact")}
            </h4>

          <a
            href="mailto:pinterbence2002@gmail.com"
            className="footer-contact-email"
          >
            pinterbence2002@gmail.com
          </a>
          </div>

          {/* SOCIAL */}
          <div className="footer-column">
            <h4>{t("footer.social")}</h4>

            <div className="footer-social">
              {socials.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.name}
                    >
                      <Icon className="social-icon" />
                    </a>
                  );
                })}
            </div>
          </div>

          {/* CV */}
          <div className="footer-column">
            <h4>{t("footer.cv.title")}</h4>

            <div className="footer-cv-wrapper">
              <a
                href={cvHref}
                target="_blank"
                rel="noreferrer"
                className="footer-cv"
              >
                {t("footer.cv.desc")}
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