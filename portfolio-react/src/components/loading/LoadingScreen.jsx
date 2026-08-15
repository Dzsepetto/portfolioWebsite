import "./LoadingScreen.css";

export default function LoadingScreen({
  progress,
  hiding,
}) {
  return (
    <div
      className={`loading-screen ${
        hiding ? "loading-screen--hidden" : ""
      }`}
    >
      <div className="loading-screen__content">
        <div className="loading-screen__title">
          Loading
        </div>

        <div className="loading-screen__bar">
          <div
            className="loading-screen__progress"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="loading-screen__percentage">
          {progress}%
        </div>
      </div>
    </div>
  );
}