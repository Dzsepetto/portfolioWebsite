import { useEffect, useState } from "react";

export function usePlayerControls() {
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "w") setKeys(k => ({ ...k, forward: true }));
      if (e.key === "s") setKeys(k => ({ ...k, backward: true }));
      if (e.key === "a") setKeys(k => ({ ...k, left: true }));
      if (e.key === "d") setKeys(k => ({ ...k, right: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "w") setKeys(k => ({ ...k, forward: false }));
      if (e.key === "s") setKeys(k => ({ ...k, backward: false }));
      if (e.key === "a") setKeys(k => ({ ...k, left: false }));
      if (e.key === "d") setKeys(k => ({ ...k, right: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
}