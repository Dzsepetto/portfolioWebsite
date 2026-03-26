import { useEffect, useRef } from "react";
import "../styles/About.css";

import "../i18n";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const carRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const car = carRef.current;
    const track = trackRef.current;
    const scroller = scrollerRef.current;
    const about = aboutRef.current;
    const originalOverflow = document.body.style.overflowY;
    const isMobile = window.innerWidth <= 768;

    if (!scroller || !about || !track) return;

    if (!isMobile) {
      document.body.style.overflowY = "hidden";
    }

    let targetScroll = scroller.scrollLeft;
    let currentScroll = scroller.scrollLeft;
    let rafId = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const getMaxScroll = () => scroller.scrollWidth - scroller.clientWidth;

    const updateVisuals = (scrollLeft: number) => {
      const maxScroll = getMaxScroll();
      const scrollProgress = maxScroll > 0 ? scrollLeft / maxScroll : 0;

      about.style.backgroundPositionX = `${scrollProgress * 100}%`;

      if (car) {
        const carWidth = 40;
        const roadWidth = Math.max(track.scrollWidth - carWidth, 0);
        const x = scrollProgress * roadWidth;
        car.style.transform = `translate3d(${x}px, -50%, 0)`;
      }
    };

    const animate = () => {
      currentScroll += (targetScroll - currentScroll) * 0.12;

      if (Math.abs(targetScroll - currentScroll) < 0.35) {
        currentScroll = targetScroll;
      }

      scroller.scrollLeft = currentScroll;
      updateVisuals(currentScroll);

      rafId = requestAnimationFrame(animate);
    };

    const syncTargetToActualScroll = () => {
      currentScroll = scroller.scrollLeft;
      targetScroll = scroller.scrollLeft;
      updateVisuals(scroller.scrollLeft);
    };

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth <= 768) return;

      e.preventDefault();
      targetScroll += e.deltaY;
      targetScroll = clamp(targetScroll, 0, getMaxScroll());
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;

      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (window.innerWidth <= 768) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        targetScroll += 60;
        targetScroll = clamp(targetScroll, 0, getMaxScroll());
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        targetScroll -= 60;
        targetScroll = clamp(targetScroll, 0, getMaxScroll());
      }
    };

    const onResize = () => {
      targetScroll = clamp(targetScroll, 0, getMaxScroll());
      currentScroll = clamp(currentScroll, 0, getMaxScroll());
      updateVisuals(currentScroll);
    };

    const onScroll = () => {
      if (window.innerWidth <= 768) {
        syncTargetToActualScroll();
      }
    };

    updateVisuals(currentScroll);
    rafId = requestAnimationFrame(animate);

    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflowY = originalOverflow;
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="about" ref={aboutRef}>
      <div className="timeline-scroller" ref={scrollerRef}>
        <div className="timeline-track" ref={trackRef}>
          <div className="timeline-road">
            <div className="timeline-car" ref={carRef}>
              🚗
            </div>
          </div>

          <article className="timeline-card up">
            <div className="card-content">
              <div className="timeline-meta">
                <span className="timeline-date">2018 – 2022</span>
                <span className="timeline-tag edu">{t("about_tag_edu")}</span>
              </div>
              <h2>{t("about_hs_title")}</h2>
              <p>{t("about_hs")}</p>
            </div>
          </article>

          <article className="timeline-card down">
            <div className="card-content">
              <div className="timeline-meta">
                <span className="timeline-date">2022 –</span>
                <span className="timeline-tag edu">{t("about_tag_edu")}</span>
              </div>
              <h2>{t("about_uni_title")}</h2>
              <p>{t("about_uni")}</p>
            </div>
          </article>

          <article className="timeline-card up">
            <div className="card-content">
              <div className="timeline-meta">
                <span className="timeline-date">2023 –</span>
                <span className="timeline-tag work">{t("about_tag_work")}</span>
              </div>
              <h2>{t("about_work_title")}</h2>
              <p>{t("about_work")}</p>
            </div>
          </article>

          <article className="timeline-card down">
            <div className="card-content">
              <div className="timeline-meta">
                <span className="timeline-date">2025 –</span>
                <span className="timeline-tag proj">{t("about_tag_proj")}</span>
              </div>
              <h2>{t("about_projects_title")}</h2>
              <p>{t("about_projects")}</p>
            </div>
          </article>

          <article className="timeline-card up now">
            <div className="card-content">
              <div className="timeline-meta">
                <span className="timeline-date">Now</span>
                <span className="timeline-tag nowtag">{t("about_tag_now")}</span>
              </div>
              <h2>{t("about_now_title")}</h2>
              <p>{t("about_now")}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}