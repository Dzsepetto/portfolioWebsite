import {
  useEffect,
  useState,
} from "react";

import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import {
  SiDotnet,
  SiReact,
  SiJavascript,
  SiPython,
  SiGit,
} from "react-icons/si";

import { TbBrandCSharp } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";

const skills = [
  {
    name: "C#",
    icon: TbBrandCSharp,
  },
  {
    name: ".NET",
    icon: SiDotnet,
  },
  {
    name: "React",
    icon: SiReact,
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
  },
  {
    name: "Python",
    icon: SiPython,
  },
  {
    name: "SQL",
    icon: FaDatabase,
  },
  {
    name: "Git",
    icon: SiGit,
  },
];

export default function GateContent({
  opacity,
  isMobile,
}) {
  const { t } = useTranslation();

  const [openExperiences, setOpenExperiences] =
    useState({
      conti: true,
      neumann: !isMobile,
    });

  useEffect(() => {
    setOpenExperiences({
      conti: true,
      neumann: !isMobile,
    });
  }, [isMobile]);

  const toggleExperience = (experience) => {
    setOpenExperiences((current) => ({
      ...current,
      [experience]:
        !current[experience],
    }));
  };

  return (
    <div className="gate-section__content-positioner">
      <motion.div
        className="gate-section__content"
        style={{ opacity }}
      >
        <h2 className="gate-section__title">
          {t("experience.title")}
        </h2>

        <div className="gate-section__experience-list">
          {/* CONTINENTAL */}
          <section
            className={`portfolio-card gate-section__experience ${
              openExperiences.conti
                ? "is-open"
                : ""
            }`}
          >
            <button
              type="button"
              className="gate-section__experience-toggle"
              onClick={() =>
                toggleExperience("conti")
              }
              aria-expanded={
                openExperiences.conti
              }
            >
              <div className="gate-section__experience-header">
                <div className="gate-section__experience-heading">
                  <span className="portfolio-card__label">
                    {t(
                      "experience.conti.post",
                    )}
                  </span>

                  <strong className="portfolio-card__title">
                    {t(
                      "experience.conti.title",
                    )}
                  </strong>
                </div>

                <div className="gate-section__experience-meta">
                  <span className="portfolio-card__period">
                    {t(
                      "experience.conti.period",
                    )}
                  </span>

                  <span
                    className="gate-section__experience-chevron"
                    aria-hidden="true"
                  >
                    <FiChevronDown />
                  </span>
                </div>
              </div>
            </button>

            <div className="gate-section__experience-collapse">
              <div className="gate-section__experience-collapse-inner">
                <div className="gate-section__experience-details">
                  <p className="portfolio-card__text">
                    {t(
                      "experience.conti.description",
                    )}
                  </p>

                  <ul className="portfolio-card__list">
                    <li>
                      {t(
                        "experience.conti.tasks.development",
                      )}
                    </li>

                    <li>
                      {t(
                        "experience.conti.tasks.automation",
                      )}
                    </li>

                    <li>
                      {t(
                        "experience.conti.tasks.support",
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* NEUMANN */}
          <section
            className={`portfolio-card gate-section__experience ${
              openExperiences.neumann
                ? "is-open"
                : ""
            }`}
          >
            <button
              type="button"
              className="gate-section__experience-toggle"
              onClick={() =>
                toggleExperience("neumann")
              }
              aria-expanded={
                openExperiences.neumann
              }
            >
              <div className="gate-section__experience-header">
                <div className="gate-section__experience-heading">
                  <span className="portfolio-card__label">
                    {t(
                      "experience.Neumann.post",
                    )}
                  </span>

                  <strong className="portfolio-card__title">
                    {t(
                      "experience.Neumann.title",
                    )}
                  </strong>
                </div>

                <div className="gate-section__experience-meta">
                  <span className="portfolio-card__period">
                    {t(
                      "experience.Neumann.period",
                    )}
                  </span>

                  <span
                    className="gate-section__experience-chevron"
                    aria-hidden="true"
                  >
                    <FiChevronDown />
                  </span>
                </div>
              </div>
            </button>

            <div className="gate-section__experience-collapse">
              <div className="gate-section__experience-collapse-inner">
                <div className="gate-section__experience-details">
                  <p className="portfolio-card__text">
                    {t(
                      "experience.Neumann.description",
                    )}
                  </p>

                  <ul className="portfolio-card__list">
                    <li>
                      {t(
                        "experience.Neumann.tasks.backend",
                      )}
                    </li>

                    <li>
                      {t(
                        "experience.Neumann.tasks.architecture",
                      )}
                    </li>

                    <li>
                      {t(
                        "experience.Neumann.tasks.development",
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="gate-section__skills">
          <h3 className="gate-section__skills-title">
            {t("experience.skills", {
              defaultValue: "Skills",
            })}
          </h3>

          <div className="gate-section__skills-grid">
            {skills.map((skill) => {
              const Icon = skill.icon;

              return (
                <div
                  key={skill.name}
                  className="portfolio-card portfolio-card--skill"
                  title={skill.name}
                >
                  <Icon
                    className="gate-section__skill-icon"
                    aria-hidden="true"
                  />

                  <span className="portfolio-card__title">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </motion.div>
    </div>
  );
}