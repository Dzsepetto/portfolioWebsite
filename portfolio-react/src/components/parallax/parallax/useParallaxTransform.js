import { useTransform } from "motion/react";

export default function useParallaxTransform(
  progress,
  {
    range = [0, 1],
    y = [0, 0],
    x = [0, 0],
    scale = [1, 1],
    opacity = [1, 1],
    rotate = [0, 0],
  } = {},
) {
  const yValue = useTransform(progress, range, y);
  const xValue = useTransform(progress, range, x);
  const scaleValue = useTransform(progress, range, scale);
  const opacityValue = useTransform(progress, range, opacity);
  const rotateValue = useTransform(progress, range, rotate);

  return {
    y: yValue,
    x: xValue,
    scale: scaleValue,
    opacity: opacityValue,
    rotate: rotateValue,
  };
}