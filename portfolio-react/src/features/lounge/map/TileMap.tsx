import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

const TILE_MODEL = "/models/floor/floor-wood.glb";

function Tile({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF(TILE_MODEL);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={clonedScene} position={position} scale={3} />;
}

export default function TileMap() {
  const tileSize = 1.5;
  const mapSize = 12;

  const tiles: [number, number, number][] = [];

  for (let x = -mapSize; x <= mapSize; x++) {
    for (let z = -mapSize; z <= mapSize; z++) {
      tiles.push([x * tileSize, 0, z * tileSize]);
    }
  }

  return (
    <>
      {tiles.map((position, index) => (
        <Tile key={index} position={position} />
      ))}
    </>
  );
}

useGLTF.preload(TILE_MODEL);