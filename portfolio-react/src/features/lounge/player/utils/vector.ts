import { Camera } from "three";
import { Vector3 } from "three";

export function getCameraFlatDirections(camera: Camera) {
  const forward = new Vector3();
  camera.getWorldDirection(forward);
  forward.y = 0;
  forward.normalize();

  const right = new Vector3();
  right.crossVectors(forward, new Vector3(0, 1, 0)).normalize();

  return { forward, right };
}

export function getInputDirection({
  forward,
  right,
  keys,
}: {
  forward: Vector3;
  right: Vector3;
  keys: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
  };
}) {
  const direction = new Vector3();

  if (keys.forward) direction.add(forward);
  if (keys.backward) direction.sub(forward);
  if (keys.left) direction.sub(right);
  if (keys.right) direction.add(right);

  return direction;
}

export function toVector3(value: { x: number; y: number; z: number }) {
  return new Vector3(value.x, value.y, value.z);
}