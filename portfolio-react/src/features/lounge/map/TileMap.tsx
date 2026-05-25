import { useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Vector3 } from "three";
import "./TileMap.css"

const TILE_MODEL = "/models/floor/floor-wood.glb";

type InteractBoxData = {
  position: [number, number, number];
  label: string;
  title: string;
  description: string;
};

function Tile({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF(TILE_MODEL);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={clonedScene} position={position} scale={3} />;
}

function FloorCollider() {
  return (
    <RigidBody type="fixed" position={[0, -0.05, 0]} colliders={false}>
      <CuboidCollider args={[20, 0.05, 20]} />
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

export default function TileMap({
  playerPositionRef,
  setMovementDisabled,
}: {
  playerPositionRef: React.MutableRefObject<Vector3>;
  setMovementDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [nearBox, setNearBox] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<InteractBoxData | null>(null);

  const tileSize = 1.5;
  const mapSize = 12;

  const tiles: [number, number, number][] = [];

  for (let x = -mapSize; x <= mapSize; x++) {
    for (let z = -mapSize; z <= mapSize; z++) {
      tiles.push([x * tileSize, 0, z * tileSize]);
    }
  }

  const interactBoxes: InteractBoxData[] = [
    {
      position: [4, 0.75, 4],
      label: "box-1",
      title: "Project 1",
      description: "Ide jön az első projekt leírása.",
    },
    {
      position: [-4, 0.75, 4],
      label: "box-2",
      title: "Project 2",
      description: "Ide jön a második projekt leírása.",
    },
    {
      position: [4, 0.75, -4],
      label: "box-3",
      title: "Project 3",
      description: "Ide jön a harmadik projekt leírása.",
    },
    {
      position: [-4, 0.75, -4],
      label: "box-4",
      title: "Project 4",
      description: "Ide jön a negyedik projekt leírása.",
    },
  ];

  const openModal = (box: InteractBoxData) => {
    setActiveModal(box);
    setMovementDisabled?.(true);
  };

  const closeModal = () => {
    setActiveModal(null);
    setMovementDisabled?.(false);
  };

  useFrame(() => {
    if (activeModal) return;

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
      if (e.code === "Escape" && activeModal) {
        closeModal();
        return;
      }

      if (e.code !== "KeyE") return;
      if (!nearBox) return;
      if (activeModal) return;

      const selectedBox = interactBoxes.find((box) => box.label === nearBox);

      if (!selectedBox) return;

      openModal(selectedBox);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nearBox, activeModal]);

  return (
    <>
      <FloorCollider />

      {tiles.map((position, index) => (
        <Tile key={index} position={position} />
      ))}

      {interactBoxes.map((box) => (
        <InteractBox
          key={box.label}
          position={box.position}
          label={box.label}
          isNear={nearBox === box.label}
        />
      ))}

      {activeModal && (
        <Html fullscreen>
          <div className="project-modal-backdrop">
            <div className="project-modal">
              <button className="project-modal-close" onClick={closeModal}>
                ×
              </button>

              <h2>{activeModal.title}</h2>
              <p>{activeModal.description}</p>

              <button className="project-modal-button" onClick={closeModal}>
                Bezárás
              </button>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}

useGLTF.preload(TILE_MODEL);