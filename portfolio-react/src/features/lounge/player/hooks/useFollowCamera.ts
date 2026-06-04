import { useRef } from "react";
import { Camera, Vector3 } from "three";
import { PLAYER_CONFIG } from "../playerConfig";

export function useFollowCamera() {
  const smoothPlayerPos = useRef(new Vector3());
  const smoothCameraPos = useRef(new Vector3());

  function updateCamera(camera: Camera, playerPosition: Vector3, delta: number) {
    smoothPlayerPos.current.lerp(playerPosition, 1 - Math.exp(-12 * delta));

    const [offsetX, offsetY, offsetZ] = PLAYER_CONFIG.cameraOffset;

    const targetCameraPosition = new Vector3(
      smoothPlayerPos.current.x + offsetX,
      smoothPlayerPos.current.y + offsetY,
      smoothPlayerPos.current.z + offsetZ
    );

    smoothCameraPos.current.lerp(
      targetCameraPosition,
      1 - Math.exp(-8 * delta)
    );

    camera.position.copy(smoothCameraPos.current);
    camera.lookAt(smoothPlayerPos.current);
  }

  return {
    updateCamera,
  };
}