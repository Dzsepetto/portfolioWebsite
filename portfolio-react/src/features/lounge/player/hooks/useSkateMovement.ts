import { useRef } from "react";
import type { Camera, Group } from "three";
import { Vector3 } from "three";
import type { RapierRigidBody } from "@react-three/rapier";

import { PLAYER_CONFIG } from "../playerConfig";
import type { PlayerInputState } from "./usePlayerInput";

function getBoardForward(model: Group) {
  return new Vector3(
    Math.sin(model.rotation.y),
    0,
    Math.cos(model.rotation.y)
  ).normalize();
}

function getSlopeDirection(groundNormal: Vector3) {
  return new Vector3(0, -1, 0)
    .projectOnPlane(groundNormal)
    .normalize();
}

export function useSkateMovement() {
  const isBoosting = useRef(false);
  const boostTimer = useRef(0);
  const boostCooldownTimer = useRef(0);

  function resetMovement() {
    isBoosting.current = false;
    boostTimer.current = 0;
    boostCooldownTimer.current = 0;
  }

  function updateBoostTimers(delta: number) {
    if (boostTimer.current > 0) {
      boostTimer.current -= delta;

      if (boostTimer.current <= 0) {
        isBoosting.current = false;
      }
    }

    if (boostCooldownTimer.current > 0) {
      boostCooldownTimer.current -= delta;
    }
  }

  function updateMovement({
    body,
    model,
    keys,
    jumpRequested,
    boostRequested,
    grounded,
    groundNormal,
    delta,
    onJump,
  }: {
    body: RapierRigidBody;
    model: Group;
    camera: Camera;
    keys: PlayerInputState;
    jumpRequested: React.MutableRefObject<boolean>;
    boostRequested: React.MutableRefObject<boolean>;
    grounded: boolean;
    groundNormal: Vector3;
    delta: number;
    onJump: () => void;
  }) {
    updateBoostTimers(delta);

    const velocity = body.linvel();
    const horizontalVelocity = new Vector3(velocity.x, 0, velocity.z);

    let boardForward = getBoardForward(model);

    const speed = horizontalVelocity.length();
    const signedSpeed = horizontalVelocity.dot(boardForward);

    const movingForward = signedSpeed > 0.1;
    const movingBackward = signedSpeed < -0.1;

    if (grounded) {
      const turnInput = Number(keys.right) - Number(keys.left);

      if (turnInput !== 0) {
        const correctedTurnInput = -turnInput;

        if (speed < 0.25) {
          model.rotation.y += correctedTurnInput * 2.2 * delta;
        } else {
          const speed01 = Math.min(speed / PLAYER_CONFIG.maxForwardSpeed, 1);

          const carveTurnSpeed =
            PLAYER_CONFIG.turnSpeed *
            1.3 *
            speed01 *
            Math.sign(signedSpeed || 1);

          model.rotation.y += correctedTurnInput * carveTurnSpeed * delta;

          const sideDirection = new Vector3(
            boardForward.z,
            0,
            -boardForward.x
          ).normalize();

          horizontalVelocity.addScaledVector(
            sideDirection,
            correctedTurnInput * speed * 0.85 * delta
          );
        }
      }
    }

    boardForward = getBoardForward(model);

    const movePlaneForward = grounded
      ? boardForward.clone().projectOnPlane(groundNormal).normalize()
      : boardForward.clone();

    if (grounded) {
      const slopeAmount = Math.max(0, 1 - groundNormal.y);

      if (slopeAmount > 0.001) {
        const slopeDirection = getSlopeDirection(groundNormal);

        horizontalVelocity.addScaledVector(
          slopeDirection,
          PLAYER_CONFIG.slopeGravity *
            PLAYER_CONFIG.slopeGravityMultiplier *
            slopeAmount *
            delta
        );
      }

      if (keys.forward) {
        horizontalVelocity.addScaledVector(
          movePlaneForward,
          PLAYER_CONFIG.pushAcceleration * delta
        );
      }

      if (keys.backward) {
        if (movingForward) {
          horizontalVelocity.addScaledVector(
            movePlaneForward,
            -PLAYER_CONFIG.brakeAcceleration * delta
          );

          horizontalVelocity.multiplyScalar(
            Math.max(0, 1 - PLAYER_CONFIG.brakeFriction * delta)
          );
        } else {
          horizontalVelocity.addScaledVector(
            movePlaneForward,
            -PLAYER_CONFIG.reverseAcceleration * delta
          );
        }
      }

      if (!keys.forward && !keys.backward) {
        horizontalVelocity.multiplyScalar(
          Math.max(0, 1 - PLAYER_CONFIG.rollingResistance * delta)
        );
      }

      if (boostRequested.current && boostCooldownTimer.current <= 0) {
        horizontalVelocity.addScaledVector(
          movePlaneForward,
          PLAYER_CONFIG.boostImpulse
        );

        isBoosting.current = true;
        boostTimer.current = PLAYER_CONFIG.boostDuration;
        boostCooldownTimer.current = PLAYER_CONFIG.boostCooldown;
      }

      boostRequested.current = false;
    } else {
      horizontalVelocity.multiplyScalar(
        Math.max(0, 1 - PLAYER_CONFIG.airFriction * delta)
      );

      boostRequested.current = false;
    }

    const forwardSpeed = horizontalVelocity.dot(boardForward);

    if (forwardSpeed > PLAYER_CONFIG.maxForwardSpeed) {
      horizontalVelocity.addScaledVector(
        boardForward,
        -(forwardSpeed - PLAYER_CONFIG.maxForwardSpeed)
      );
    }

    if (forwardSpeed < -PLAYER_CONFIG.maxReverseSpeed) {
      horizontalVelocity.addScaledVector(
        boardForward,
        -(forwardSpeed + PLAYER_CONFIG.maxReverseSpeed)
      );
    }

    let nextY = velocity.y;
    let jumped = false;

    if (jumpRequested.current && grounded) {
      nextY = PLAYER_CONFIG.jumpForce;
      jumped = true;

      jumpRequested.current = false;
      isBoosting.current = false;
      boostTimer.current = 0;

      onJump();
    } else {
      jumpRequested.current = false;
    }

    body.setLinvel(
      {
        x: horizontalVelocity.x,
        y: nextY,
        z: horizontalVelocity.z,
      },
      true
    );

    return {
      moving: speed > 0.05 || keys.forward || keys.backward,
      boosting: isBoosting.current,
      jumped,
      movingBackward,
    };
  }

  return {
    updateMovement,
    resetMovement,
  };
}