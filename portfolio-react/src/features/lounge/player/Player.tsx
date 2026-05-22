import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useGLTF, useAnimations } from "@react-three/drei";

function Player() {
  const group = useRef<any>(null);

  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {

    const down = (e: KeyboardEvent) => {
      if (e.code === "Space") e.preventDefault(); // ✅ NE scrollozzon!

      setKeys((prev) => ({
        ...prev,
        forward: e.code === "KeyW" ? true : prev.forward,
        backward: e.code === "KeyS" ? true : prev.backward,
        left: e.code === "KeyA" ? true : prev.left,
        right: e.code === "KeyD" ? true : prev.right,
        jump: e.code === "Space" ? true : prev.jump,
      }));
    };

    const up = (e: KeyboardEvent) => {
      setKeys((prev) => ({
        ...prev,
        forward: e.code === "KeyW" ? false : prev.forward,
        backward: e.code === "KeyS" ? false : prev.backward,
        left: e.code === "KeyA" ? false : prev.left,
        right: e.code === "KeyD" ? false : prev.right,
        jump: e.code === "Space" ? false : prev.jump,
      }));
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const { scene, animations } = useGLTF("/models/character.glb");

  const { actions } = useAnimations(animations, group);
  const currentAction = useRef<any>(null);

  const velocity = useRef(new Vector3());
  const isOnGround = useRef(true);

  const speed = 0.05;
  const gravity = -0.01;

  useEffect(() => {
    if (!actions) return;

    const idle = actions.Idle;
    idle?.reset().fadeIn(0.2).play();
    currentAction.current = idle;
  }, [actions]);
  
  function normalizeAngle(angle: number) {
    return Math.atan2(Math.sin(angle), Math.cos(angle));
  }

  function lerpAngle(current: number, target: number, t: number) {
    const diff = normalizeAngle(target - current);
    return current + diff * t;
  }

  useFrame(({ camera }) => {
    if (!group.current) return;

    const forward = new Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new Vector3();
    right.crossVectors(forward, new Vector3(0, 1, 0)).normalize();

    const direction = new Vector3();

    if (keys.forward) direction.add(forward);
    if (keys.backward) direction.sub(forward);
    if (keys.left) direction.sub(right);
    if (keys.right) direction.add(right);

    const moving = direction.lengthSq() > 0.0001;

    if (moving) {
      direction.normalize();

      group.current.position.add(direction.clone().multiplyScalar(speed));

      const targetAngle = Math.atan2(direction.x, direction.z);

      group.current.rotation.y = lerpAngle(
        group.current.rotation.y,
        targetAngle,
        0.15
      );
    }

    if (keys.jump && isOnGround.current) {
      velocity.current.y = 0.2;
      isOnGround.current = false;
    }

    velocity.current.y += gravity;
    group.current.position.y += velocity.current.y;

    if (group.current.position.y <= 0) {
      group.current.position.y = 0;
      velocity.current.y = 0;
      isOnGround.current = true;
    }

    let nextAction;

    if (!isOnGround.current) {
      nextAction = actions?.Jump; // ✅ csak Jump
    } else {
      nextAction = moving ? actions?.Run : actions?.Idle;
    }

    if (currentAction.current !== nextAction) {
      currentAction.current?.fadeOut(0.2);
      nextAction?.reset().fadeIn(0.2).play();
      currentAction.current = nextAction;
    }

    const playerPos = group.current.position;

    const targetPos = new Vector3(
      playerPos.x + 5,
      playerPos.y + 6,
      playerPos.z + 5
    );

    camera.position.lerp(targetPos, 0.1);
    camera.lookAt(playerPos);
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  );
}

export default Player;