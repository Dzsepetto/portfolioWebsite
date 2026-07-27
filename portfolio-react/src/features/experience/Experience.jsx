import "./Experience.css";
import '../../i18n';
import { useTranslation } from "react-i18next";

export default function Experience() {

    const{t} = useTranslation();
  return (
    <section className="experience">
      <div className="experience-container">
        <h1>{t("experience.title")}</h1>

        <div className="experience-list">
          <details className="exp-item" open>
            <summary className="exp-row">
              <div className="exp-left">
                <div className="exp-role">{t("experience.conti.post")}</div>
                <div className="exp-company">{t("experience.conti.title")}</div>
              </div>

              <div className="exp-right">
                <span className="exp-period">2023 – 2026</span>
                <span className="exp-chevron" aria-hidden="true">▾</span>
              </div>
            </summary>

            <div className="exp-panel">
              <p className="exp-description">
                <span>{t("experience.conti.description")}</span>
                <span>{t("experience.conti.part1")}</span>
                <span>{t("experience.conti.part2")}</span>
                <span>{t("experience.conti.part3")}</span>
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
