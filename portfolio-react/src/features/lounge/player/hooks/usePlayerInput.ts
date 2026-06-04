import { useEffect, useRef, useState } from "react";

export type PlayerInputState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  boost: boolean;
};

const EMPTY_INPUT: PlayerInputState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  boost: false,
};

export function usePlayerInput(movementDisabled: boolean) {
  const [keys, setKeys] = useState<PlayerInputState>(EMPTY_INPUT);

  const jumpRequested = useRef(false);
  const boostRequested = useRef(false);

  function resetInput() {
    setKeys(EMPTY_INPUT);
    jumpRequested.current = false;
    boostRequested.current = false;
  }

  useEffect(() => {
    if (movementDisabled) resetInput();
  }, [movementDisabled]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (movementDisabled) return;

      if (e.code === "Space") {
        e.preventDefault();

        setKeys((prev) => {
          if (!prev.jump) jumpRequested.current = true;
          return { ...prev, jump: true };
        });

        return;
      }

      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        setKeys((prev) => {
          if (!prev.boost) boostRequested.current = true;
          return { ...prev, boost: true };
        });

        return;
      }

      setKeys((prev) => ({
        ...prev,
        forward: e.code === "KeyW" ? true : prev.forward,
        backward: e.code === "KeyS" ? true : prev.backward,
        left: e.code === "KeyA" ? true : prev.left,
        right: e.code === "KeyD" ? true : prev.right,
      }));
    };

    const up = (e: KeyboardEvent) => {
      setKeys((prev) => ({
        ...prev,
        forward: e.code === "KeyW" ? false : prev.forward,
        backward: e.code === "KeyS" ? false : prev.backward,
        left: e.code === "KeyA" ? false : prev.left,
        right: e.code === "KeyD" ? false : prev.right,
        jump: e.code === "Space" ? false : prev.jump,
        boost:
          e.code === "ShiftLeft" || e.code === "ShiftRight"
            ? false
            : prev.boost,
      }));
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [movementDisabled]);

  return {
    keys,
    jumpRequested,
    boostRequested,
    resetInput,
  };
}