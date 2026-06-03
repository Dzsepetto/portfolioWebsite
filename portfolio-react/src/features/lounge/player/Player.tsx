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

  // --- GÖRDESZKA PARAMÉTEREK ---
  const acceleration = 18;       
  const maxSpeed = 8.5;          
  const maxBoostSpeed = 13.5;    
  const decceleration = 1.2;     
  const jumpForce = 7.5;         
  const jumpLockTimer = useRef(0);

  // --- KANYARODÁSI PARAMÉTEREK ---
  const maxSteeringSpeed = 4.0;  // Alap kanyarodási sebesség álló helyzetben / lassú tempónál
  const minSteeringSpeed = 1.4;  // Minimális kanyarodási sebesség top speeden (száguldáskor)

  const boostTimer = useRef(0);
  const nextBoostTime = useRef(1.5 + Math.random() * 3);
  const isBoosting = useRef(false);
  const boostDuration = useRef(0);
  const wasMoving = useRef(false);

  const smoothPlayerPos = useRef(new Vector3());
  const smoothCameraPos = useRef(new Vector3());

  const boardAngle = useRef(0);

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

    const currentVelocity = rigidBody.current.linvel();
    const currentSpeedXZ = Math.sqrt(currentVelocity.x ** 2 + currentVelocity.z ** 2);

    if (movementDisabled) {
      rigidBody.current.setLinvel({ x: 0, y: currentVelocity.y, z: 0 }, true);
      const idle = actions?.Skate_Idle || actions?.Idle;
      changeAction(idle, 0.2, true);
      return;
    }

    // --- SEBESSÉG-ALAPÚ KANYARODÁS LOGIKA ---
    const currentSpeedLimit = isBoosting.current ? maxBoostSpeed : maxSpeed;
    
    // Kiszámolunk egy 0 és 1 közötti értéket (0 = áll, 1 = végsebességgel száguld)
    const speedFactor = Math.min(currentSpeedXZ / currentSpeedLimit, 1);

    // Lerp-eljük (lineárisan interpoláljuk) a kanyarodás sebességét a sebesség függvényében.
    // Ha gyorsan mész, a minSteeringSpeed felé közelít, ha lassítasz, visszakapod a maxSteeringSpeed-et.
    const dynamicSteeringSpeed = maxSteeringSpeed - (maxSteeringSpeed - minSteeringSpeed) * speedFactor;

    // A/D kanyarodás az aktuálisan kiszámolt dinamikus sebességgel
    if (keys.left) boardAngle.current += dynamicSteeringSpeed * delta;
    if (keys.right) boardAngle.current -= dynamicSteeringSpeed * delta;

    // Forgatás érvényesítése a modellen
    group.current.rotation.y = boardAngle.current;

    // Lokális irány kiszámítása
    const boardForward = new Vector3(
      Math.sin(boardAngle.current),
      0,
      Math.cos(boardAngle.current)
    ).normalize();

    const direction = new Vector3();

    if (keys.forward) direction.add(boardForward);
    if (keys.backward) direction.sub(boardForward);

    const moving = keys.forward || keys.backward;
    const justStartedMoving = moving && !wasMoving.current;

    // --- BOOST LOGIKA ---
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

    // --- SEBESSÉG SZÁMÍTÁSA ---
    if (moving) {
      direction.normalize();

      let targetX = currentVelocity.x + direction.x * acceleration * delta;
      let targetZ = currentVelocity.z + direction.z * acceleration * delta;

      const newSpeedXZ = Math.sqrt(targetX ** 2 + targetZ ** 2);
      if (newSpeedXZ > currentSpeedLimit) {
        targetX = (targetX / newSpeedXZ) * currentSpeedLimit;
        targetZ = (targetZ / newSpeedXZ) * currentSpeedLimit;
      }

      rigidBody.current.setLinvel({ x: targetX, y: currentVelocity.y, z: targetZ }, true);
    } else {
      // --- GURULÁS ---
      let slowX = currentVelocity.x * (1 - decceleration * delta);
      let slowZ = currentVelocity.z * (1 - decceleration * delta);

      if (Math.abs(slowX) < 0.08) slowX = 0;
      if (Math.abs(slowZ) < 0.08) slowZ = 0;

      rigidBody.current.setLinvel({ x: slowX, y: currentVelocity.y, z: slowZ }, true);
    }

    // --- LENDÜLETMEGTARTÓ UGRÁS ---
    if (jumpRequested.current && isOnGround.current) {
      rigidBody.current.setLinvel(
        {
          x: currentVelocity.x, 
          y: jumpForce,         
          z: currentVelocity.z, 
        },
        true
      );

      jumpRequested.current = false;
      isOnGround.current = false;
      jumpLockTimer.current = 0.2;

      isBoosting.current = false;
      boostDuration.current = 0;

      changeAction(actions?.Skate_Jump, 0.1, true);
    }

    const position = rigidBody.current.translation();
    playerPositionRef.current.set(position.x, position.y, position.z);

    // --- RÁMPAKOMPATIBILIS TALAJ-ELLENŐRZÉS ---
    if (jumpLockTimer.current > 0) {
      jumpLockTimer.current -= delta;
    } else {
      const verticalVelocityThreshold = 4.0;
      
      isOnGround.current = 
        currentVelocity.y > -verticalVelocityThreshold && 
        currentVelocity.y <= 0.15;
    }

    // --- ANIMÁCIÓK ---
    if (isOnGround.current) {
      let nextAction;

      if (moving && isBoosting.current) {
        nextAction = actions?.Skate_Boost || actions?.skate_boost;
        if (nextAction) {
          nextAction.timeScale = 0.7;
        }
      } else {
        nextAction = currentSpeedXZ > 0.5
          ? actions?.Skate || actions?.Skate_Boost
          : actions?.Skate_Idle || actions?.Idle;
      }

      changeAction(nextAction, 0.25, true);
    }

    wasMoving.current = moving;

    // --- KAMERAKÖVETÉS ---
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
      position={[0, 2, 0]}
      enabledRotations={[false, false, false]}
      colliders={false}
      canSleep={false}
      linearDamping={0.4}
      angularDamping={4}
    >
      <CapsuleCollider args={[0.5, 0.45]} position={[0, 0.8, 0]} />

      <group ref={group} scale={1}>
        <primitive object={scene} />
      </group>
    </RigidBody>
  );
}

export default Player;