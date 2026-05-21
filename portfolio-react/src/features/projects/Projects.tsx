import "./Projects.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "./projects.data";

export default function Projects() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  if (selectedProject !== null) {
    const project = projects[selectedProject];

    return (
      <section className="projects">
        <div className="projects-inner">
          <button
            className="back-button"
            onClick={() => setSelectedProject(null)}
          >
            ← {t("projects.back")}
          </button>

          <div className="project-details">
            <div className="project-details-image">
              <img src={project.image} alt={t(project.titleKey)} />
            </div>

            <div className="project-details-content">
              <h1>{t(project.titleKey)}</h1>
              <p>{t(project.descriptionKey)}</p>

              <div className="project-details-buttons">
                
                {project.url && (
                <a href={project.url} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                )}

                {project.url2 && (
                  <a href={project.url2} target="_blank" rel="noreferrer">
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects">
      <div className="projects-inner">
        <h1>{t("projects.heading")}</h1>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              onClick={() => setSelectedProject(index)}
            >
              <div className="project-image">
                <img src={project.image} alt={t(project.titleKey)} />
              </div>

              <div
                className="project-footer"
                style={{ backgroundColor: project.color }}
              >
                {t(project.titleKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}