import usePageTransition  from "../../../app/providers/usePageTransition";
import "./PageTransition.css";

function PageTransitionOverlay() {
  const { isTransitioning } = usePageTransition();

  return (
    <div className={`transition ${isTransitioning ? "active" : ""}`}>
      <div className="panel left" />
      <div className="panel right" />
    </div>
  );
}

export default PageTransitionOverlay;