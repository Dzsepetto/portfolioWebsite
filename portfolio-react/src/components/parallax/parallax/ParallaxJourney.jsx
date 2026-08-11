import { useRef } from "react";
import { useScroll, useSpring } from "motion/react";

import HeroSection from "../hero/HeroSection";
import GateSection from "../gate/GateSection";
import InnSection from "../inn/InnSection";

import useSceneProgress from "./useSceneProgress";
import useMediaQuery from "../../../hooks/useMediaQuery";

import "./ParallaxJourney.css";

const SPRING_CONFIG = {
  stiffness: 110,
  damping: 26,
  mass: 0.4,
};

export default function ParallaxJourney() {
  const journeyRef = useRef(null);

  const isMobile = useMediaQuery(
    "(max-width: 700px)",
  );

  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(
    scrollYProgress,
    SPRING_CONFIG,
  );

  const journeyProgress = isMobile
    ? scrollYProgress
    : springProgress;

  const heroProgress = useSceneProgress(
    journeyProgress,
    0,
    0.3,
  );

  const gateProgress = useSceneProgress(
    journeyProgress,
    0.29,
    0.66,
  );

  const innProgress = useSceneProgress(
    journeyProgress,
    0.65,
    1,
  );

  return (
    <section
      ref={journeyRef}
      className="parallax-journey"
    >
      <div
        id="home"
        className="parallax-scroll-target parallax-scroll-target--home"
      />

      <div
        id="experience"
        className="parallax-scroll-target parallax-scroll-target--experience"
      />

      <div
        id="projects"
        className="parallax-scroll-target parallax-scroll-target--projects"
      />

      <div className="parallax-journey__sticky">
        <HeroSection
          progress={heroProgress}
          gateProgress={gateProgress}
          isMobile={isMobile}
        />

        <GateSection
          progress={gateProgress}
          isMobile={isMobile}
        />

        <InnSection
          progress={innProgress}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
}