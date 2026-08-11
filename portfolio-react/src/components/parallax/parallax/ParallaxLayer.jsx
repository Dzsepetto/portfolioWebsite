import { motion } from "motion/react";

import useParallaxTransform from "./useParallaxTransform";

export default function ParallaxLayer({
  progress,
  src,
  alt = "",
  className = "",
  range = [0, 1],
  y,
  x,
  scale,
  opacity,
  rotate,
  draggable = false,
  loading = "eager",
  fetchPriority = "auto",
}) {
  const createDefaultValues = (value) =>
    range.map(() => value);

  const motionStyle = useParallaxTransform(progress, {
    range,
    y: y ?? createDefaultValues(0),
    x: x ?? createDefaultValues(0),
    scale: scale ?? createDefaultValues(1),
    opacity: opacity ?? createDefaultValues(1),
    rotate: rotate ?? createDefaultValues(0),
  });

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      style={motionStyle}
      draggable={draggable}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}