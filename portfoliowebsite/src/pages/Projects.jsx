import React from "react";
import "../styles/Projects.css";

const projects = [
  {
    title: "Catsy multi platform game",
    image: "../assets//project-images/portfolio.jpg",
    url: "https://example.com",
    color: "#C33742",
  },
  {
    title: "My portfolio (idk if this counts)",
    image: "/project-images/dashboard.jpg",
    url: "https://github.com/GrofDzsepetto/portfolioWebsite",
    color: "#2B2B2B",
  },
  {
    title: "API Backend",
    image: "/project-images/backend.jpg",
    url: "https://example.com",
    color: "#4A90E2",
  },
];

function Projects() {
  return (
    <section className="projects">
      <div className="projects-inner">
        <h1>PROJECTS</h1>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="project-card"
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Projects;
