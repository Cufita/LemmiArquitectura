import { useReducedMotion as useMotionPreference } from 'motion/react';

/**
 * Thin wrapper so components import the preference from one place and we can
 * add an in-app override later without touching every call site.
 *
 * Reduced motion means fewer and gentler animations, not none: callers should
 * drop spatial travel but keep opacity, colour and state changes that carry
 * meaning.
 */
export function useReducedMotion(): boolean {
  return useMotionPreference() ?? false;
}

export default useReducedMotion;
