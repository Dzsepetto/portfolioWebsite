import { motion, useTransform } from "motion/react";

import HeroContent from "./HeroContent";
import { heroLayers } from "./heroLayers";

import "./HeroSection.css";

function HeroLayer({ layer, progress }) {
  const y = useTransform(
    progress,
    layer.range,
    layer.y,
  );

  const scale = useTransform(
    progress,
    layer.range,
    layer.scale ?? [1, 1],
  );

  return (
    <motion.img
      src={layer.src}
      alt=""
      className={`hero-section__layer ${layer.modifierClass}`}
      style={{
        y,
        scale,
      }}
      draggable={false}
    />
  );
}

export default function HeroSection({ progress }) {
  const sectionOpacity = useTransform(
    progress,
    [0, 0.38, 0.63],
    [1, 1, 0],
  );

  const contentOpacity = useTransform(
    progress,
    [0, 0.18, 0.38],
    [1, 1, 0],
  );

  const contentY = useTransform(
    progress,
    [0, 0.4],
    [0, -100],
  );

  const contentScale = useTransform(
    progress,
    [0, 0.4],
    [1, 0.94],
  );

  return (
    <motion.section
      className="hero-section"
      style={{
        opacity: sectionOpacity,
      }}
    >
      <div className="hero-section__scene">
        {heroLayers.map((layer) => (
          <HeroLayer
            key={layer.id}
            layer={layer}
            progress={progress}
          />
        ))}

        <HeroContent
          opacity={contentOpacity}
          y={contentY}
          scale={contentScale}
        />
      </div>
    </motion.section>
  );
}