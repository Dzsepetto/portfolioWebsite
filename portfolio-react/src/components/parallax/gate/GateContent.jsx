import { motion } from "motion/react";

export default function GateContent({
  opacity,
  y,
  scale,
}) {
  return (
    <div className="gate-section__content-positioner">
      <motion.div
        className="gate-section__content"
        style={{
          opacity,
          y,
          scale,
        }}
      >
        <p className="gate-section__eyebrow">
          Enter the path
        </p>

        <h2>The journey begins</h2>

        <p>
          Step through the gate and discover the spirit of Japan.
        </p>
      </motion.div>
    </div>
  );
}