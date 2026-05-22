import { Canvas } from "@react-three/fiber";
import Player from "./Player";

function Scene() {
  return (
    <>
      {/* Fény */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>

      {/* Player */}
      <Player />
    </>
  );
}

export default function Lounge() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [5, 8, 5], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
}