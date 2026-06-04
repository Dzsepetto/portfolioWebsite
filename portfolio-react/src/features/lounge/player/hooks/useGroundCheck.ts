import { useRef } from "react";
import { Vector3 } from "three";
import {
  RapierCollider,
  useRapier,
} from "@react-three/rapier";
import { PLAYER_CONFIG } from "../playerConfig";

export function useGroundCheck(playerCollider: React.MutableRefObject<RapierCollider | null>) {
  const { world, rapier } = useRapier();

  const grounded = useRef(false);
  const groundNormal = useRef(new Vector3(0, 1, 0));
  const jumpLockTimer = useRef(0);

  function lockGroundCheck() {
    jumpLockTimer.current = PLAYER_CONFIG.jumpLockTime;
    grounded.current = false;
    groundNormal.current.set(0, 1, 0);
  }

  function updateJumpLock(delta: number) {
    if (jumpLockTimer.current > 0) {
      jumpLockTimer.current -= delta;
    }
  }

  function checkGround(position: Vector3, velocityY: number) {
    if (jumpLockTimer.current > 0) {
      grounded.current = false;
      groundNormal.current.set(0, 1, 0);
      return;
    }

    const rayOrigin = {
      x: position.x,
      y: position.y + 0.15,
      z: position.z,
    };

    const rayDirection = {
      x: 0,
      y: -1,
      z: 0,
    };

    const ray = new rapier.Ray(rayOrigin, rayDirection);

    const hit = world.castRayAndGetNormal(
      ray,
      PLAYER_CONFIG.groundRayLength,
      true,
      undefined,
      undefined,
      playerCollider.current ?? undefined
    );

    if (
      hit &&
      hit.timeOfImpact <= PLAYER_CONFIG.groundMaxDistance &&
      velocityY <= PLAYER_CONFIG.maxGroundedVelocityY
    ) {
      grounded.current = true;
      groundNormal.current.set(hit.normal.x, hit.normal.y, hit.normal.z);
    } else {
      grounded.current = false;
      groundNormal.current.set(0, 1, 0);
    }
  }

  return {
    grounded,
    groundNormal,
    checkGround,
    lockGroundCheck,
    updateJumpLock,
  };
}