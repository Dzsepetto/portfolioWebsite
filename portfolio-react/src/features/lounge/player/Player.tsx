import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

function Player({
  playerPositionRef,
  movementDisabled,
}: {
  playerPositionRef: React.MutableRefObject<Vector3>;
  movementDisabled: boolean;
}) {
  const group = useRef<any>(null);
  const rigidBody = useRef<any>(null);

  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  const { scene, animations } = useGLTF("/models/character_skate.glb");
  const { actions } = useAnimations(animations, group);

  const currentAction = useRef<any>(null);
  const isOnGround = useRef(true);
  const jumpRequested = useRef(false);

  const baseSpeed = 3.2;
  const boostSpeed = 5.2;
  const jumpForce = 5;
  const jumpLockTimer = useRef(0);

  const boostTimer = useRef(0);
  const nextBoostTime = useRef(1.5 + Math.random() * 3);
  const isBoosting = useRef(false);
  const boostDuration = useRef(0);
  const wasMoving = useRef(false);

  const smoothPlayerPos = useRef(new Vector3());
  const smoothCameraPos = useRef(new Vector3());

  useEffect(() => {
    if (!movementDisabled) return;

    setKeys({
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
    });

    jumpRequested.current = false;
    isBoosting.current = false;
    boostDuration.current = 0;
    boostTimer.current = 0;
    wasMoving.current = false;
  }, [movementDisabled]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (movementDisabled) return;

      if (e.code === "Space") {
        e.preventDefault();

        setKeys((prev) => {
          if (!prev.jump) jumpRequested.current = true;
          return { ...prev, jump: true };
        });

        return;
      }

      setKeys((prev) => ({
        ...prev,
        forward: e.code === "KeyW" ? true : prev.forward,
        backward: e.code === "KeyS" ? true : prev.backward,
        left: e.code === "KeyA" ? true : prev.left,
        right: e.code === "KeyD" ? true : prev.right,
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
  }, [movementDisabled]);

  useEffect(() => {
    const idle = actions?.Skate_Idle || actions?.Idle;
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

  function changeAction(nextAction: any, fade = 0.25, reset = true) {
    if (!nextAction || currentAction.current === nextAction) return;

    currentAction.current?.fadeOut(fade);

    if (reset) {
      nextAction.reset();
    }

    nextAction.fadeIn(fade).play();
    currentAction.current = nextAction;
  }

  useFrame(({ camera }, delta) => {
    if (!group.current || !rigidBody.current) return;

    if (movementDisabled) {
      rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true);

      const idle = actions?.Skate_Idle || actions?.Idle;
      changeAction(idle, 0.2, true);

      return;
    }

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
    const justStartedMoving = moving && !wasMoving.current;

    if (justStartedMoving && isOnGround.current) {
      isBoosting.current = true;
      boostDuration.current = 1.3;
      boostTimer.current = 0;
      nextBoostTime.current = 1.5 + Math.random() * 3;
    } else if (moving && isOnGround.current) {
      boostTimer.current += delta;

      if (!isBoosting.current && boostTimer.current >= nextBoostTime.current) {
        isBoosting.current = true;
        boostDuration.current = 1.3;
        boostTimer.current = 0;
        nextBoostTime.current = 1.5 + Math.random() * 3;
      }
    } else if (!moving) {
      boostTimer.current = 0;
      isBoosting.current = false;
      boostDuration.current = 0;
    }

    if (isBoosting.current) {
      boostDuration.current -= delta;
      if (boostDuration.current <= 0) isBoosting.current = false;
    }

    const currentVelocity = rigidBody.current.linvel();

    let moveX = 0;
    let moveZ = 0;

    if (moving) {
      direction.normalize();

      const currentSpeed = isBoosting.current ? boostSpeed : baseSpeed;

      moveX = direction.x * currentSpeed;
      moveZ = direction.z * currentSpeed;

      const targetAngle = Math.atan2(direction.x, direction.z);

      group.current.rotation.y = lerpAngle(
        group.current.rotation.y,
        targetAngle,
        0.15
      );
    }

    if (jumpRequested.current && isOnGround.current) {
      rigidBody.current.setLinvel(
        {
          x: moveX,
          y: jumpForce,
          z: moveZ,
        },
        true
      );

      jumpRequested.current = false;
      isOnGround.current = false;
      jumpLockTimer.current = 0.3;

      isBoosting.current = false;
      boostDuration.current = 0;

      changeAction(actions?.Skate_Jump, 0.1, true);
    } else {
      rigidBody.current.setLinvel(
        {
          x: moveX,
          y: currentVelocity.y,
          z: moveZ,
        },
        true
      );
    }

    const position = rigidBody.current.translation();
    playerPositionRef.current.set(position.x, position.y, position.z);

    if (jumpLockTimer.current > 0) {
      jumpLockTimer.current -= delta;
    } else {
      const groundedHeight = 1.15;
      const verticalThreshold = 0.3;

      isOnGround.current =
        position.y <= groundedHeight &&
        Math.abs(currentVelocity.y) < verticalThreshold;
    }

    if (isOnGround.current) {
      let nextAction;

      if (moving && isBoosting.current) {
        nextAction = actions?.Skate_Boost || actions?.skate_boost;

        if (nextAction) {
          nextAction.timeScale = 0.7;
        }
      } else {
        nextAction = moving
          ? actions?.Skate || actions?.Skate_Boost
          : actions?.Skate_Idle || actions?.Idle;
      }

      changeAction(nextAction, 0.25, true);
    }

    wasMoving.current = moving;

    const playerPos = new Vector3(position.x, position.y, position.z);

    smoothPlayerPos.current.lerp(playerPos, 1 - Math.exp(-12 * delta));

    const targetPos = new Vector3(
      smoothPlayerPos.current.x + 5,
      smoothPlayerPos.current.y + 6,
      smoothPlayerPos.current.z + 5
    );

    smoothCameraPos.current.lerp(targetPos, 1 - Math.exp(-8 * delta));

    camera.position.copy(smoothCameraPos.current);
    camera.lookAt(smoothPlayerPos.current);
  });

  return (
    <RigidBody
      ref={rigidBody}
      type="dynamic"
      position={[0, 1, 0]}
      enabledRotations={[false, false, false]}
      colliders={false}
      canSleep={false}
      linearDamping={4}
      angularDamping={4}
    >
      <CapsuleCollider args={[0.7, 0.45]} position={[0, 0.8, 0]} />

      <group ref={group} scale={1}>
        <primitive object={scene} />
      </group>
    </RigidBody>
  );
}

export default Player;