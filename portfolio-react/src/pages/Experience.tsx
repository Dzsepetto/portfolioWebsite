import "../styles/Experience.css";

type ExperienceCardProps = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export default function Experience() {
  return (
    <section className="experience">
      <div className="experience-container">
        <h1>Experience</h1>

        <ExperienceCard
          role="Software Developer"
          company="Independent / Personal Projects"
          period="2021 – Present"
          description="Building games, tools, and full-stack applications using C#, .NET, MAUI, and React. Focused on performance, clean UI, and maintainable architecture."
        />

        <ExperienceCard
          role="Frontend Developer"
          company="Portfolio & UI Projects"
          period="2022 – Present"
          description="Designing modern, clean interfaces using React and CSS with strong emphasis on UX and visual polish."
        />
      </div>
    </section>
  );
}

function ExperienceCard({ role, company, period, description }: ExperienceCardProps) {
  return (
    <div className="experience-card">
      <div className="experience-header">
        <div>
          <h3>{role}</h3>
          <p className="experience-company">{company}</p>
        </div>

        <span>{period}</span>
      </div>

      <p className="experience-description">{description}</p>
    </div>
  );
}
