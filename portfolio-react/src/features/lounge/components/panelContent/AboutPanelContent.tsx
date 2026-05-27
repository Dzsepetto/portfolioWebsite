import { useTranslation } from "react-i18next";
import { portfolioContent } from "../../../../lib/portfolioContent";

export default function AboutPanelContent() {
  const { t } = useTranslation();

  return (
    <p className="interaction-panel__description">
      {t(portfolioContent.about.descriptionKey)}
    </p>
  );
}