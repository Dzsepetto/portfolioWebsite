import {
  motion,
  useTransform,
} from "motion/react";

import GateIntro from "./GateIntro";
import GateContent from "./GateContent";

import {
  gateLayers,
  gateLayersMobile,
} from "./gateLayers";

import ParallaxLayer from "../parallax/ParallaxLayer";
import useSceneProgress from "../parallax/useSceneProgress";

import "./GateSection.css";

export default function GateSection({
  progress,
  isMobile,
}) {
  const sectionOpacity = useTransform(
    progress,
    [0, 0.08, 0.32],
    [0, 0, 1],
  );

  const transitionProgress = useSceneProgress(
    progress,
    0.5,
    0.9,
  );

  const introOpacity = useTransform(
    transitionProgress,
    [0, 0.42, 0.72],
    [1, 1, 0],
  );

  const introY = useTransform(
    transitionProgress,
    [0, 0.42, 0.72],
    [0, 0, -60],
  );

  const introScale = useTransform(
    transitionProgress,
    [0, 0.42, 0.72],
    [1, 1, 0.97],
  );

  const contentOpacity = useTransform(
    transitionProgress,
    [0.55, 0.88],
    [0, 1],
  );

  const overlayOpacity = useTransform(
    transitionProgress,
    [0, 1],
    [0.08, 0.3],
  );

  const layers = isMobile
    ? gateLayersMobile
    : gateLayers;

  return (
    <motion.section
      className="gate-section"
      style={{
        opacity: sectionOpacity,
      }}
    >
      <div className="gate-section__scene">
        {layers.map((layer) => (
          <ParallaxLayer
            key={layer.id}
            progress={transitionProgress}
            src={layer.src}
            alt=""
            className={`gate-section__layer ${layer.modifierClass}`}
            range={layer.range}
            x={layer.x}
            y={layer.y}
            scale={layer.scale}
            rotate={layer.rotate}
            opacity={layer.opacity}
            loading="lazy"
            fetchPriority="low"
          />
        ))}
      </div>

      <motion.div
        className="gate-section__overlay"
        style={{
          opacity: overlayOpacity,
        }}
      />

      <GateIntro
        opacity={introOpacity}
        y={introY}
        scale={introScale}
      />

      <GateContent
        opacity={contentOpacity}
        isMobile={isMobile}
      />
    </motion.section>
  );
}