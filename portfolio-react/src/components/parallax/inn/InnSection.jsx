import { motion, useTransform } from "motion/react";

import ParallaxLayer from "../parallax/ParallaxLayer";
import InnContent from "./InnContent";
import { innLayers } from "./innLayers";

import "./InnSection.css";

export default function InnSection({ progress }) {
  /*
    Az Inn csak azután indul el,
    hogy a Gate jelenet már egy ideig teljesen látható volt.
  */

  const sceneOpacity = useTransform(
    progress,
    [0.75, 0.88],
    [0, 1],
  );

  const sceneY = useTransform(
    progress,
    [0.75, 0.92],
    ["100%", "0%"],
  );

  /*
    Az Inn szövege akkor jelenik meg,
    amikor az Inn már majdnem teljesen elfoglalta a képernyőt.
  */

  const contentOpacity = useTransform(
    progress,
    [0.9, 0.97],
    [0, 1],
  );

  const contentY = useTransform(
    progress,
    [0.9, 0.97],
    [60, 0],
  );

  const contentScale = useTransform(
    progress,
    [0.9, 0.97],
    [0.94, 1],
  );

  return (
    <section className="inn-section">
      <motion.div
        className="inn-section__scene"
        style={{
          opacity: sceneOpacity,
          y: sceneY,
        }}
      >
        {innLayers.map((layer) => (
          <ParallaxLayer
            key={layer.id}
            progress={progress}
            src={layer.src}
            className={`inn-section__layer ${layer.modifierClass}`}
            range={layer.range}
            y={layer.y}
            scale={layer.scale}
          />
        ))}

        <InnContent
          opacity={contentOpacity}
          y={contentY}
          scale={contentScale}
        />
      </motion.div>
    </section>
  );
}