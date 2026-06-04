import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

const PLAYER_MODEL = "/models/character_skate.glb";

const PlayerModel = forwardRef<any>((_, ref) => {
  const { scene } = useGLTF(PLAYER_MODEL);

  return (
    <group ref={ref} scale={1}>
      <primitive object={scene} />
    </group>
  );
});

export default PlayerModel;

useGLTF.preload(PLAYER_MODEL);