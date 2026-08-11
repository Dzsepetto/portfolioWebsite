import { useTransform } from "motion/react";

export default function useSceneProgress(
  progress,
  start,
  end,
) {
  return useTransform(
    progress,
    [start, end],
    [0, 1],
    {
      clamp: true,
    },
  );
}