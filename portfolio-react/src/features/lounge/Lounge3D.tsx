import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Vector3 } from "three";

import Player from "./player/Player";
import TileMap from "./map/TileMap";
import InteractionPanel from "./components/InteractionPanel";
import type { PortfolioSectionId } from "../../lib/portfolioContent";

function Scene() {
  const playerPositionRef = useRef(new Vector3());

  const [movementDisabled, setMovementDisabled] = useState(false);
  const [activeSection, setActiveSection] =
    useState<PortfolioSectionId | null>(null);

  const openSection = (sectionId: PortfolioSectionId) => {
    setActiveSection(sectionId);
    setMovementDisabled(true);
  };

  const closeSection = () => {
    setActiveSection(null);
    setMovementDisabled(false);
  };

  return (
    <>
      <Canvas camera={{ position: [10, 12, 10], fov: 65 }}>
        <Physics>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={2} />

          <TileMap
            playerPositionRef={playerPositionRef}
            openSection={openSection}
            isPanelOpen={activeSection != null}
          />

          <Player
            playerPositionRef={playerPositionRef}
            movementDisabled={movementDisabled}
          />
        </Physics>
      </Canvas>

      <InteractionPanel
        sectionId={activeSection}
        onClose={closeSection}
      />
    </>
  );
}

export default function Lounge3D() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Scene />
    </div>
  );
}