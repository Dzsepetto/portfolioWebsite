import { useEffect, useState } from "react";

export default function useImagePreloader(images) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!images.length) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount += 1;

      setProgress(
        Math.round((loadedCount / images.length) * 100)
      );

      if (loadedCount === images.length) {
        setLoaded(true);
      }
    };

    images.forEach((src) => {
      const image = new Image();

      image.onload = handleLoad;
      image.onerror = handleLoad;

      image.src = src;
    });
  }, [images]);

  return {
    loaded,
    progress,
  };
}