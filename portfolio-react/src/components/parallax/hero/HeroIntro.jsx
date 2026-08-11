import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function HeroIntro({
  opacity,
  y,
  scale,
}) {
  const { t } = useTranslation();

  return (
    <div className="hero-section__intro-positioner">
      <motion.div
        className="hero-section__intro"
        style={{
          opacity,
          y,
          scale,
        }}
      >
        <h1>{t("home.intro.title")}</h1>
        <h3>{t("home.intro.desc")}</h3>

       <div className="hero-section__mobile-hint">
        🖥️ {t("home.intro.mobile_hint")}
      </div>
      </motion.div>
    </div>
  );
}