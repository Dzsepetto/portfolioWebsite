import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Player from "./player/Player";
import TileMap from "./map/TileMap";

function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} />

      <TileMap />

      <Player />
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
      <Canvas camera={{ position: [5, 8, 5], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
}