import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function GateIntro({
  opacity,
  y,
  scale,
}) {

  const { t } = useTranslation();

  return (
    <div className="gate-section__intro-positioner">
      <motion.div
        className="gate-section__intro"
        style={{
          opacity,
          y,
          scale,
        }}
      >
        <h1>{t("experience.intro.title")}</h1>

        <h3>
          {t("experience.intro.desc")}
        </h3>
      </motion.div>
    </div>
  );
}