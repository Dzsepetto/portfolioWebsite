import { motion } from "motion/react";

export default function InnContent({
  opacity,
  y,
  scale,
}) {
  return (
    <div className="inn-section__content-positioner">
      <motion.div
        className="inn-section__content"
        style={{
          opacity,
          y,
          scale,
        }}
      >
        <p className="inn-section__eyebrow">
          Rest along the way
        </p>

        <h2>The Japanese Inn</h2>

        <p>
          Discover the calm atmosphere and timeless hospitality
          of a traditional Japanese inn.
        </p>
      </motion.div>
    </div>
  );
}