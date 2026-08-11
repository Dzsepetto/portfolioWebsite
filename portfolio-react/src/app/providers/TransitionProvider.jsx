import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import TransitionContext from "./TransitionContext";

export function TransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const lastTransition = useRef(0);
  const navigationTimeout = useRef(null);
  const finishTimeout = useRef(null);

  const startTransition = useCallback((callback) => {
    const now = Date.now();

    if (now - lastTransition.current < 3000) {
      callback();
      return;
    }

    lastTransition.current = now;
    setIsTransitioning(true);

    navigationTimeout.current = window.setTimeout(
      callback,
      500,
    );

    finishTimeout.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 1100);
  }, []);

  useEffect(() => {
    return () => {
      window.clearTimeout(navigationTimeout.current);
      window.clearTimeout(finishTimeout.current);
    };
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        startTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}