import { useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Vector3 } from "three";

import type { PortfolioSectionId } from "../../../lib/portfolioContent";

import "./TileMap.css";

const TILE_MODEL = "/models/floor/floor-wood.glb";
<<<<<<< HEAD
const RAMP_MODEL = "/models/basic_ramp.glb";
=======
const OBSTACLE_MODEL = "/models/floor/obstacle-box.glb";
>>>>>>> ee5035cdfeabad1e3878f534e2005cfa7877f91d

type InteractBoxData = {
  position: [number, number, number];
  label: string;
  sectionId: PortfolioSectionId;
};

// Sima padló elem
function Tile({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF(TILE_MODEL);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={clonedScene} position={position} scale={1.5} />;
}


function ObstacleTile({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF(OBSTACLE_MODEL);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <RigidBody type="fixed" position={position} colliders="trimesh">
      <primitive object={clonedScene} position={[0, 0, 0]} scale={1.5} />
    </RigidBody>
  );
}

function FloorCollider() {
  return (
    <RigidBody type="fixed" position={[0, -0.05, 0]} colliders={false}>
      <CuboidCollider args={[20, 0.05, 20]} />
    </RigidBody>
  );
}
function Ramp({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF(RAMP_MODEL);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <RigidBody
      type="fixed"
      position={position}
      colliders="trimesh"
      scale={1.5}
    >
      <primitive object={clonedScene} />
    </RigidBody>
  );
}

function InteractBox({
  position,
  isNear,
}: {
  position: [number, number, number];
  label: string;
  isNear: boolean;
}) {
  return (
    <RigidBody type="fixed" position={position} colliders={false}>
      <CuboidCollider args={[0.75, 0.75, 0.75]} />

      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color={isNear ? "#ffffff" : "#c33742"} />
      </mesh>

      {isNear && (
        <Html position={[0, 1.4, 0]} center>
          <div className="interact-hint">Press [E]</div>
        </Html>
      )}
    </RigidBody>
  );
}

const interactBoxes: InteractBoxData[] = [
  {
    position: [4, 0.75, 4],
    label: "about",
    sectionId: "about",
  },
  {
    position: [-4, 0.75, 4],
    label: "experience",
    sectionId: "experience",
  },
  {
    position: [4, 0.75, -4],
    label: "projects",
    sectionId: "projects",
  },
];

export default function TileMap({
  playerPositionRef,
  openSection,
  isPanelOpen,
}: {
  playerPositionRef: React.MutableRefObject<Vector3>;
  openSection: (sectionId: PortfolioSectionId) => void;
  isPanelOpen: boolean;
}) {
  const [nearBox, setNearBox] = useState<string | null>(null);

  const tileSize = 1.5;
  const mapSize = 12;

  // Külön választjuk a sima padlókat és az akadály padlókat
  const normalTiles: [number, number, number][] = [];
  const obstacleTiles: [number, number, number][] = [];

  for (let x = -mapSize; x <= mapSize; x++) {
    for (let z = -mapSize; z <= mapSize; z++) {
      const pos: [number, number, number] = [x * tileSize, 0, z * tileSize];
      
      // HA EZ A KÖZÉPSŐ TILE (x === 0 és z === 0)
      if (x === 0 && z === 0) {
        obstacleTiles.push(pos);
      } else {
        normalTiles.push(pos);
      }
    }
  }

  useFrame(() => {
    if (isPanelOpen) {
      setNearBox(null);
      return;
    }
    let closestBox: string | null = null;

    for (const box of interactBoxes) {
      const boxPos = new Vector3(...box.position);
      const distance = playerPositionRef.current.distanceTo(boxPos);

      if (distance < 2.5) {
        closestBox = box.label;
        break;
      }
    }

    setNearBox(closestBox);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPanelOpen) return;
      if (e.code !== "KeyE") return;
      if (!nearBox) return;

      const selectedBox = interactBoxes.find((box) => box.label === nearBox);

      if (!selectedBox) return;

      openSection(selectedBox.sectionId);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nearBox, openSection, isPanelOpen]);

  return (
    <>
      <FloorCollider />

      {/* Sima padló elemek renderelése */}
      {normalTiles.map((position, index) => (
        <Tile key={`tile-${index}`} position={position} />
      ))}

      {/* --- AZ AKADÁLY DOBOZ GENERÁLÁSA A KIJELÖLT HELYRE --- */}
      {obstacleTiles.map((position, index) => (
        <ObstacleTile key={`obstacle-tile-${index}`} position={position} />
      ))}
      <Ramp position={[8, 0, 4]} />
      {interactBoxes.map((box) => (
        <InteractBox
          key={box.label}
          position={box.position}
          label={box.label}
          isNear={nearBox === box.label}
        />
      ))}
    </>
  );
}

useGLTF.preload(TILE_MODEL);
<<<<<<< HEAD
useGLTF.preload(RAMP_MODEL);
=======
useGLTF.preload(OBSTACLE_MODEL);
>>>>>>> ee5035cdfeabad1e3878f534e2005cfa7877f91d
