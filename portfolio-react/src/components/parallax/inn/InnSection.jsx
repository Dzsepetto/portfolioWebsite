import {
  motion,
  useTransform,
} from "motion/react";

import InnIntro from "./InnIntro";
import InnFeature from "./InnFeature";

import {
  innLayers,
  innLayersMobile,
} from "./innLayers";

import ParallaxLayer from "../parallax/ParallaxLayer";
import useSceneProgress from "../parallax/useSceneProgress";

import "./InnSection.css";

export default function InnSection({
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

  const featureOpacity = useTransform(
    transitionProgress,
    [0.55, 0.88],
    [0, 1],
  );

  const featurePointerEvents = useTransform(
    featureOpacity,
    (latest) =>
      latest > 0.5 ? "auto" : "none",
  );

  const overlayOpacity = useTransform(
    transitionProgress,
    [0, 1],
    [0.08, 0.3],
  );

  const layers = isMobile
    ? innLayersMobile
    : innLayers;

  return (
    <motion.section
      className="inn-section"
      style={{
        opacity: sectionOpacity,
      }}
    >
      <div className="inn-section__scene">
        {layers.map((layer) => (
          <ParallaxLayer
            key={layer.id}
            progress={transitionProgress}
            src={layer.src}
            alt=""
            className={`inn-section__layer ${layer.modifierClass}`}
            range={layer.range}
            x={layer.x}
            y={layer.y}
            scale={layer.scale}
            opacity={layer.opacity}
            rotate={layer.rotate}
            loading="lazy"
            fetchPriority="low"
          />
        ))}
      </div>

      <motion.div
        className="inn-section__overlay"
        style={{
          opacity: overlayOpacity,
        }}
      />

      <InnIntro
        opacity={introOpacity}
        y={introY}
        scale={introScale}
      />

<InnFeature
  progress={progress}
  opacity={featureOpacity}
  pointerEvents={featurePointerEvents}
/>
    </motion.section>
  );
}