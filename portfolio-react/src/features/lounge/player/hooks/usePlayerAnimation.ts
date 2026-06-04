import { useEffect, useRef } from "react";
import { useAnimations } from "@react-three/drei";
import type { AnimationClip, Group } from "three";

export function usePlayerAnimation(
  animations: AnimationClip[],
  group: React.MutableRefObject<Group | null>
) {
  const { actions } = useAnimations(animations, group);
  const currentAction = useRef<any>(null);

  function getAction(...names: string[]) {
    for (const name of names) {
      const action = actions?.[name];
      if (action) return action;
    }

    return Object.values(actions || {})[0];
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

  function playIdle() {
    changeAction(getAction("Skate_Idle", "Idle", "idle"), 0.2, true);
  }

  function playJump() {
    changeAction(getAction("Skate_Jump", "Jump", "jump"), 0.1, true);
  }

  function updateAnimation({
    grounded,
    moving,
    boosting,
  }: {
    grounded: boolean;
    moving: boolean;
    boosting: boolean;
  }) {
    let nextAction;

    if (!grounded) {
      nextAction = getAction("Skate_Jump", "Jump", "jump", "Skate_Idle", "Idle");
    } else if (moving && boosting) {
      nextAction = getAction("Skate_Boost", "skate_boost", "Boost", "boost");

      if (nextAction) {
        nextAction.timeScale = 0.8;
      }
    } else if (moving) {
      nextAction = getAction("Skate", "skate", "Walk", "Run");
    } else {
      nextAction = getAction("Skate_Idle", "Idle", "idle");
    }

    changeAction(nextAction, 0.25, true);
  }

  useEffect(() => {
    if (!actions) return;

    console.log("Available animations:", Object.keys(actions));

    const idle =
      actions?.Skate_Idle ||
      actions?.Idle ||
      actions?.idle ||
      Object.values(actions)[0];

    idle?.reset().fadeIn(0.2).play();
    currentAction.current = idle;
  }, [actions]);

  return {
    actions,
    playIdle,
    playJump,
    updateAnimation,
  };
}