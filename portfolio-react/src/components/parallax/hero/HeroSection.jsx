import {
  motion,
  useTransform,
} from "motion/react";

import HeroIntro from "./HeroIntro";
import HeroFeature from "./HeroFeature";

import {
  heroMovingLayers,
  heroMovingLayersMobile,
  heroStaticLayers,
} from "./heroLayers";

import ParallaxLayer from "../parallax/ParallaxLayer";
import useSceneProgress from "../parallax/useSceneProgress";

import "./HeroSection.css";

export default function HeroSection({
  progress,
  gateProgress,
  isMobile,
}) {
  const transitionProgress = useSceneProgress(
    progress,
    0,
    0.65,
  );

  const introOpacity = useTransform(
    transitionProgress,
    [0, 0.45],
    [1, 0],
  );

  const introY = useTransform(
    transitionProgress,
    [0, 0.45],
    [0, -80],
  );

  const introScale = useTransform(
    transitionProgress,
    [0, 0.45],
    [1, 0.94],
  );

  const featureOpacity = useTransform(
    transitionProgress,
    [0.2, 0.65],
    [0, 1],
  );

  const sceneOverlayOpacity = useTransform(
    transitionProgress,
    [0, 0.65],
    [0, 0.24],
  );

  const transitionOverlayOpacity = useTransform(
    gateProgress,
    [0, 0.28],
    [0, 0.55],
  );

  const heroScale = useTransform(
    gateProgress,
    [0, 0.28],
    [1, 1.025],
  );

  const movingLayers = isMobile
    ? heroMovingLayersMobile
    : heroMovingLayers;

  return (
    <section className="hero-section">
      <motion.div
        className="hero-section__wrapper"
        style={{
          scale: heroScale,
        }}
      >
        <div className="hero-section__scene">
          {heroStaticLayers.map((layer) => (
            <img
              key={layer.id}
              src={layer.src}
              alt=""
              className={`hero-section__layer ${layer.modifierClass}`}
              draggable={false}
              loading="eager"
              fetchPriority={
                layer.id === "sky"
                  ? "high"
                  : "auto"
              }
              decoding="async"
            />
          ))}

          {movingLayers.map((layer) => (
            <ParallaxLayer
              key={layer.id}
              progress={transitionProgress}
              src={layer.src}
              alt=""
              className={`hero-section__layer ${layer.modifierClass}`}
              range={layer.range}
              x={layer.x}
              y={layer.y}
              scale={layer.scale}
              rotate={layer.rotate}
              opacity={layer.opacity}
              loading="eager"
              fetchPriority="auto"
            />
          ))}
        </div>

        <motion.div
          className="hero-section__overlay"
          style={{
            opacity: sceneOverlayOpacity,
          }}
        />

        <HeroIntro
          opacity={introOpacity}
          y={introY}
          scale={introScale}
        />

        <HeroFeature opacity={featureOpacity} />
      </motion.div>

      <motion.div
        className="hero-section__transition-overlay"
        style={{
          opacity: transitionOverlayOpacity,
        }}
      />
    </section>
  );
}