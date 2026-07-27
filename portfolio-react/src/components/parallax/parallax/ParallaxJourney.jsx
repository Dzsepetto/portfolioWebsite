import { useRef } from "react";
import { useScroll, useSpring } from "motion/react";

import HeroSection from "../hero/HeroSection";
import GateSection from "../gate/GateSection";
import InnSection from "../inn/InnSection";

import "./ParallaxJourney.css";

const SPRING_CONFIG = {
  stiffness: 500,
  damping: 50,
  mass: 0.08,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export default function ParallaxJourney() {
  const journeyRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    SPRING_CONFIG,
  );

  return (
    <section
      ref={journeyRef}
      className="parallax-journey"
    >
      <div className="parallax-journey__sticky">
        <HeroSection progress={smoothProgress} />
        <GateSection progress={smoothProgress} />
        <InnSection progress={smoothProgress} />
      </div>
    </section>
  );
}