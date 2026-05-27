import { useTranslation } from "react-i18next";
import {
  portfolioContent,
  type PortfolioSectionId,
} from "../../../lib/portfolioContent";

import AboutPanelContent from "./panelContent/AboutPanelContent";
import ExperiencePanelContent from "./panelContent/ExperiencePanelContent";
import ProjectsPanelContent from "./panelContent/ProjectsPanelContent";

import "./InteractionPanel.css";

type InteractionPanelProps = {
  sectionId: PortfolioSectionId | null;
  onClose: () => void;
};

const panelContentComponents: Record<PortfolioSectionId, React.ComponentType> = {
  about: AboutPanelContent,
  experience: ExperiencePanelContent,
  projects: ProjectsPanelContent,
};

export default function InteractionPanel({
  sectionId,
  onClose,
}: InteractionPanelProps) {
  const { t } = useTranslation();

  if (!sectionId) return null;

  const content = portfolioContent[sectionId];
  const CustomContent = panelContentComponents[sectionId];

  return (
    <div className="interaction-panel">
      <button
        className="interaction-panel__close"
        type="button"
        onClick={onClose}
        aria-label="Close panel"
      >
        ×
      </button>

      <h2 className="interaction-panel__title">{t(content.titleKey)}</h2>

      <div className="interaction-panel__body">
        <CustomContent />
      </div>
    </div>
  );
}