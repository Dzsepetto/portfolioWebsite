import { useEffect, useRef } from "react";
import "../styles/About.css";

import '../i18n';
import { useTranslation } from "react-i18next";

export default function About() {
  const{t, i18n} = useTranslation();


  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const originalOverflow = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";

    const scroller = scrollerRef.current;
    const about = aboutRef.current;

    if (!scroller || !about) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      scroller.scrollLeft += e.deltaY;

      const scrollProgress =
        scroller.scrollLeft / (scroller.scrollWidth - scroller.clientWidth);

      about.style.backgroundPositionX = `${scrollProgress * 100}%`;
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.body.style.overflowY = originalOverflow;
      scroller.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section className="about" ref={aboutRef}>
      <div className="timeline-scroller" ref={scrollerRef}>
        <div className="timeline-track">
          <article className="timeline-card up">
            <div className="card-content">
              <div className="timeline-meta">
                <span className="timeline-date">2018 – 2022</span>
                <span className="timeline-tag edu">Education</span>
              </div>
              <h2>{t("about_hs_title")}</h2>
              <p>
               {t("about_hs")}
              </p>
            </div>
          </article>

          <article className="timeline-card down">
            <div className="card-content">
              <div className="timeline-meta">
                <span className="timeline-date">2022 –</span>
                <span className="timeline-tag edu">Education</span>
              </div>
              <h2>{t("about_uni_title")}</h2>
              <p>
                {t("about_uni")}
              </p>
            </div>
          </article>

          <article className="timeline-card up">
            <div className="card-content">
              <div className="timeline-meta">
                <span className="timeline-date">2023 –</span>
                <span className="timeline-tag work">Work</span>
              </div>
              <h2>{t("about_work_title")}</h2>
              <p>
                {t("about_work")}
              </p>
            </div>
          </article>

          <article className="timeline-card down">
            <div className="card-content">
              <div className="timeline-meta">
                <span className="timeline-date">2025 – </span>
                <span className="timeline-tag proj">Projects</span>
              </div>
              <h2>{t("about_projects_title")}</h2>
              <p>
                {t("about_projects")}
              </p>
            </div>
          </article>

          <article className="timeline-card up now">
            <div className="card-content">
              <div className="timeline-meta">
                <span className="timeline-date">Now</span>
                <span className="timeline-tag nowtag">Current</span>
              </div>
              <h2>{t("about_now_title")}</h2>
              <p>
                {t("about_now")}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
