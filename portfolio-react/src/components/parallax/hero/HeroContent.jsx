import { motion } from "motion/react";

export default function HeroContent({
  opacity,
  y,
  scale,
}) {
  const scrollToJourney = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="hero-section__content-positioner">
      <motion.div
        className="hero-section__content"
        style={{
          opacity,
          y,
          scale,
        }}
      >
        <p className="hero-section__eyebrow">
          Welcome to
        </p>

        <h1>Japan Experience</h1>

        <p>A journey through the spirit of Japan</p>

        <button
          type="button"
          onClick={scrollToJourney}
        >
          Discover the journey
        </button>
      </motion.div>
    </div>
  );
}