import { motion } from "motion/react";

import useParallaxTransform from "./useParallaxTransform";

export default function ParallaxLayer({
  progress,
  src,
  alt = "",
  className = "",
  range = [0, 1],
  y = [0, 0],
  x = [0, 0],
  scale = [1, 1],
  opacity = [1, 1],
  rotate = [0, 0],
  draggable = false,
}) {
  const motionStyle = useParallaxTransform(progress, {
    range,
    y,
    x,
    scale,
    opacity,
    rotate,
  });

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      style={motionStyle}
      draggable={draggable}
    />
  );
}