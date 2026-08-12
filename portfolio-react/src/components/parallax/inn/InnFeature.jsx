import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
} from "motion/react";
import { useTranslation } from "react-i18next";

import { projects } from "../../../lib/projects.data";

export default function InnFeature({
  progress,
  opacity,
  pointerEvents,
}) {
  const { t } = useTranslation();

  const [selectedProject, setSelectedProject] =
    useState(null);

  const selectedProjectData =
    selectedProject !== null
      ? projects[selectedProject]
      : null;

  useMotionValueEvent(progress, "change", (latest) => {
    const innIsActive =
      latest > 0.001 &&
      latest < 0.999;

    if (!innIsActive) {
      setSelectedProject(null);
    }
  });

  return (
    <div className="inn-section__feature-positioner">
      <motion.div
        className={`inn-section__feature ${selectedProjectData
            ? "inn-section__feature--details"
            : ""
          }`}
        style={{
          opacity,
          pointerEvents,
        }}
      >
        {selectedProjectData ? (
          <div className="inn-section__project-details">
            <button
              type="button"
              className="inn-section__back-button"
              onClick={() =>
                setSelectedProject(null)
              }
            >
              ← {t("projects.back")}
            </button>

            <div className="inn-section__project-details-layout">
              <div className="inn-section__project-details-image">
                <picture>
                  <source
                    media="(max-width: 700px)"
                    srcSet={
                      selectedProjectData.images
                        .medium
                    }
                  />

                  <img
                    src={
                      selectedProjectData.images
                        .large
                    }
                    alt={t(
                      selectedProjectData.titleKey,
                    )}
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>

              <div className="inn-section__project-details-content">
                <h2>
                  {t(
                    selectedProjectData.titleKey,
                  )}
                </h2>

                <p>
                  {t(
                    selectedProjectData.descriptionKey,
                  )}
                </p>

                <div className="inn-section__project-links">
                  {selectedProjectData.url && (
                    <a
                      href={
                        selectedProjectData.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  )}

                  {selectedProjectData.url2 && (
                    <a
                      href={
                        selectedProjectData.url2
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2>{t("projects.heading")}</h2>

            <div className="projects-grid">
              {projects.map(
                (project, index) => (
                  <button
                    key={project.titleKey}
                    type="button"
                    className="project-card"
                    onClick={() =>
                      setSelectedProject(index)
                    }
                    aria-label={t(
                      project.titleKey,
                    )}
                  >
                    <div className="project-image">
                      <img
                        src={
                          project.images.medium
                        }
                        srcSet={`
                          ${project.images.small} 400w,
                          ${project.images.medium} 800w
                        `}
                        sizes="
                          (max-width: 600px) calc(50vw - 20px),
                          (max-width: 900px) calc(50vw - 32px),
                          380px
                        "
                        alt={t(
                          project.titleKey,
                        )}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </div>

                    <div
                      className="project-footer"
                      style={{
                        backgroundColor:
                          project.color,
                      }}
                    >
                      {t(project.titleKey)}
                    </div>
                  </button>
                ),
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}