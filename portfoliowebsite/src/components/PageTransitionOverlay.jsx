import { useTransition } from "../context/TransitionContext";
import "../styles/components/PageTransition.css";

function PageTransitionOverlay() {
  const { isTransitioning } = useTransition();

  return (
    <div className={`transition ${isTransitioning ? "active" : ""}`}>
      <div className="panel left" />
      <div className="panel right" />
    </div>
  );
}


export default PageTransitionOverlay;
