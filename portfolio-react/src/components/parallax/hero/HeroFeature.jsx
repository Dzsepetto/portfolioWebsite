import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import featureImage from "../../../assets/images/main.webp";
import featureImage320 from "../../../assets/images/main-320.webp";

export default function HeroFeature({ opacity }) {
  const { t } = useTranslation();

  return (
    <div className="hero-section__feature-positioner">
      <motion.article
        className="hero-section__feature"
        style={{ opacity }}
      >
        <div className="hero-section__feature-image-wrapper">
          <img
            src={featureImage}
            srcSet={`${featureImage320} 320w, ${featureImage} 800w`}
            sizes="(max-width: 700px) 320px, 800px"
            alt="Portrait of Pintér Benedek"
            className="hero-section__feature-image"
            decoding="async"
          />
        </div>

        <div className="hero-section__feature-content">
          <h2>Pintér Benedek</h2>

          <div className="hero-section__feature-bubbles">
            <div className="portfolio-card">
              <strong className="portfolio-card__title">
                {t("home.degree_title")}
              </strong>

              <p className="portfolio-card__text">
                {t("home.degree")}
              </p>
            </div>

            <div className="portfolio-card">
              <strong className="portfolio-card__title">
                {t("home.experience_title")}
              </strong>

              <p className="portfolio-card__text">
                {t("home.experience")}
              </p>
            </div>

            <div className="portfolio-card">
              <strong className="portfolio-card__title">
                {t("home.devappr_title")}
              </strong>

              <p className="portfolio-card__text">
                {t("home.devappr")}
              </p>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}