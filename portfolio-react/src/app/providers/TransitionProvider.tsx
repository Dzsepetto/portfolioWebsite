import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type TransitionContextType = {
  isTransitioning: boolean;
  startTransition: (callback: () => void) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const lastTransition = useRef(0);

  const startTransition = (callback: () => void) => {
    const now = Date.now();

    // 5 mp-en belül nincs animáció
    if (now - lastTransition.current < 3000) {
      callback();
      return;
    }

    lastTransition.current = now;

    setIsTransitioning(true);

    setTimeout(() => {
      callback();
    }, 500);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1100);
  };

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

export function usePageTransition() {
  const ctx = useContext(TransitionContext);

  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within TransitionProvider"
    );
  }

  return ctx;
}