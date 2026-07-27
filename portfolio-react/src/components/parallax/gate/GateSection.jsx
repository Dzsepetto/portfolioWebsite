import { motion, useTransform } from "motion/react";

import GateContent from "./GateContent";
import { gateLayers } from "./gateLayers";

import "./GateSection.css";

export default function GateSection({ progress }) {
  const sceneOpacity = useTransform(
    progress,
    [0.28, 0.42],
    [0, 1],
  );

  const sceneY = useTransform(
    progress,
    [0.28, 0.58],
    ["100%", "0%"],
  );

  const backgroundY = useTransform(
    progress,
    [0.28, 1],
    [30, -20],
  );

  const backgroundScale = useTransform(
    progress,
    [0.28, 1],
    [1.08, 1.14],
  );

  const gateY = useTransform(
    progress,
    [0.28, 0.7, 1],
    [100, 0, -30],
  );

  const gateScale = useTransform(
    progress,
    [0.28, 0.7, 1],
    [0.9, 1, 1.12],
  );

  const contentOpacity = useTransform(
    progress,
    [0.58, 0.7],
    [0, 1],
  );

  const contentY = useTransform(
    progress,
    [0.58, 0.7],
    [50, 0],
  );

  const contentScale = useTransform(
    progress,
    [0.58, 0.7],
    [0.95, 1],
  );

  return (
    <section className="gate-section">
      <motion.div
        className="gate-section__scene"
        style={{
          opacity: sceneOpacity,
          y: sceneY,
        }}
      >
        <motion.img
          src={gateLayers.background}
          alt=""
          className="
            gate-section__layer
            gate-section__layer--background
          "
          style={{
            y: backgroundY,
            scale: backgroundScale,
          }}
          draggable={false}
        />

        <motion.img
          src={gateLayers.gate}
          alt=""
          className="
            gate-section__layer
            gate-section__layer--gate
          "
          style={{
            y: gateY,
            scale: gateScale,
          }}
          draggable={false}
        />

        <GateContent
          opacity={contentOpacity}
          y={contentY}
          scale={contentScale}
        />
      </motion.div>
    </section>
  );
}