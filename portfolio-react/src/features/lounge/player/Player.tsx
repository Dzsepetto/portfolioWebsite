import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";
import {
  RigidBody,
  CapsuleCollider,
  RapierRigidBody,
  RapierCollider,
} from "@react-three/rapier";

import PlayerModel from "./PlayerModel";
import { usePlayerInput } from "./hooks/usePlayerInput";
import { useGroundCheck } from "./hooks/useGroundCheck";
import { useSkateMovement } from "./hooks/useSkateMovement";
import { usePlayerAnimation } from "./hooks/usePlayerAnimation";
import { useFollowCamera } from "./hooks/useFollowCamera";
import { toVector3 } from "./utils/vector";

const PLAYER_MODEL = "/models/character_skate.glb";

function Player({
  playerPositionRef,
  movementDisabled,
}: {
  playerPositionRef: React.MutableRefObject<Vector3>;
  movementDisabled: boolean;
}) {
  const modelRef = useRef<Group | null>(null);
  const rigidBody = useRef<RapierRigidBody | null>(null);
  const playerCollider = useRef<RapierCollider | null>(null);

  const { animations } = useGLTF(PLAYER_MODEL);

  const { keys, jumpRequested, boostRequested, resetInput } =
    usePlayerInput(movementDisabled);

  const {
    grounded,
    groundNormal,
    checkGround,
    lockGroundCheck,
    updateJumpLock,
  } = useGroundCheck(playerCollider);

  const { updateMovement, resetMovement } = useSkateMovement();

  const { playIdle, playJump, updateAnimation } =
    usePlayerAnimation(animations, modelRef);

  const { updateCamera } = useFollowCamera();

  useFrame(({ camera }, delta) => {
    if (!modelRef.current || !rigidBody.current) return;

    const body = rigidBody.current;

    if (movementDisabled) {
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);

      resetInput();
      resetMovement();
      playIdle();

      return;
    }

    updateJumpLock(delta);

    const position = toVector3(body.translation());
    const velocity = body.linvel();

    checkGround(position, velocity.y);

    const movementState = updateMovement({
      body,
      model: modelRef.current,
      camera,
      keys,
      jumpRequested,
      boostRequested,
      grounded: grounded.current,
      groundNormal: groundNormal.current,
      delta,
      onJump: () => {
        grounded.current = false;
        lockGroundCheck();
        playJump();
      },
    });

    updateAnimation({
      grounded: grounded.current,
      moving: movementState.moving,
      boosting: movementState.boosting,
    });

    playerPositionRef.current.set(position.x, position.y, position.z);

    updateCamera(camera, position, delta);
  });

  return (
    <RigidBody
      ref={rigidBody}
      type="dynamic"
      position={[0, 1, 0]}
      enabledRotations={[false, false, false]}
      colliders={false}
      canSleep={false}
      linearDamping={0}
      angularDamping={0}
    >
      <CapsuleCollider
        ref={playerCollider}
        args={[0.7, 0.45]}
        position={[0, 0.8, 0]}
      />

      <PlayerModel ref={modelRef} />
    </RigidBody>
  );
}

export default Player;

useGLTF.preload(PLAYER_MODEL);