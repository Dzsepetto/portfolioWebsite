import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function InnIntro({
  opacity,
  y,
  scale,
}) {

  const { t } = useTranslation();
  return (
    <div className="inn-section__intro-positioner">
      <motion.div
        className="inn-section__intro"
        style={{
          opacity,
          y,
          scale,
        }}
      >
        <h1>{t("projects.intro.title")}</h1>
        <h3>{t("projects.intro.desc")}</h3>

      </motion.div>
    </div>
  );
}