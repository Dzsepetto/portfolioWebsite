import { useTransition } from "../context/TransitionContext";
import "../styles/components/PageTransition.css";
import { useEffect } from "react";

function PageTransitionOverlay() {
  const { isTransitioning } = useTransition();

  useEffect(() => {
    console.log("transition:", isTransitioning);
  }, [isTransitioning]);

  return (
    <div className={`transition ${isTransitioning ? "active" : ""}`}>
      <div className="panel left" />
      <div className="panel right" />
    </div>
  );
}


export default PageTransitionOverlay;
