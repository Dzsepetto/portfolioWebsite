import { createContext, useContext, useState, type ReactNode } from "react";

type TransitionContextType = {
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
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