import "../styles/Projects.css";
import PortfolioIMG from '../assets/images/project-images/porfolio.png'
//import CatsyIMG from '../assets/images/project-images/catsy.png'
import OnlineGamesIMG from '../assets/images/project-images/OnlineGames.png'
import RikikiKingsIMG from '../assets/images/project-images/rikikikings.png'
import { useState } from "react";
import "../styles/Projects.css";

const projects = [
  {
    title: "Rikiki Kings",
    image: RikikiKingsIMG,
    url: "https://github.com/Dzsepetto/RikikiApp",
    color: "#2B2B2B",
  },
  {
    title: "My portfolio (idk if this counts)",
    image: PortfolioIMG,
    url: "https://github.com/GrofDzsepetto/portfolioWebsite",
    color: "#2B2B2B",
  },
  {
    title: "Quiz Website",
    image: OnlineGamesIMG,
    url: "https://github.com/GrofDzsepetto/portfolioWebsite",
    url2: "https://www.dzsepetto.hu/",
    color: "#2B2B2B",
  }
];

export default function Projects() {
 const [activeProject, setActiveProject] = useState<number | null>(null);


  return (
    <section className="projects">
      <div className="projects-inner">
        <h1>PROJECTS</h1>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              onClick={() =>
                setActiveProject(activeProject === index ? null : index)
              }
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>

              <div
                className="project-footer"
                style={{ backgroundColor: project.color }}
              >
                {project.title}
              </div>

              {/* GOMBOK */}
              {activeProject === index && (
                <div className="project-buttons">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>

                  {project.url2 && (
                    <a
                      href={project.url2}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Website
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
