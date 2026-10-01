import { useSyncExternalStore } from "react";

/** Shared motion language for VAULT. */
export const easeLuxury = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.25,
  base: 0.5,
  slow: 0.75,
} as const;

/** Fired on window when the intro hands over to the hero. */
export const INTRO_DONE_EVENT = "vault:intro-done";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Small "is the intro still about to play?" check shared by intro and hero. */
export const introWillPlay = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("intro-play");

const RM_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Reduced-motion preference that is hydration-safe: the server and the first
 * client render both see `false`, then React re-renders with the real value.
 * Use it whenever the preference changes markup (not just animation values).
 */
export function useReducedMotionSafe() {
  return useSyncExternalStore(
    subscribeRM,
    () => window.matchMedia(RM_QUERY).matches,
    () => false,
  );
}
