import type { Transition, Variants } from 'motion/react';

/**
 * One source of truth for timing. Mirrored in tailwind.css as CSS custom
 * properties so declarative and imperative motion agree.
 *
 * Timing expresses distance and consequence: feedback is immediate, layout
 * takes longer because more of the screen moves, and exits always undercut
 * their entrance so dismissal never feels like latency.
 */
export const duration = {
  instant: 0.12,
  state: 0.24,
  layout: 0.38,
  focal: 0.64,
} as const;

/** Exponential deceleration — confident arrivals, no bounce. */
export const ease = [0.16, 1, 0.3, 1] as const;
/** Slightly sharper curve for things leaving the screen. */
export const easeExit = [0.4, 0, 1, 1] as const;

export const transition = {
  instant: { duration: duration.instant, ease },
  state: { duration: duration.state, ease },
  layout: { duration: duration.layout, ease },
  focal: { duration: duration.focal, ease },
  exit: { duration: duration.instant, ease: easeExit },
} satisfies Record<string, Transition>;

/**
 * Spring used for panels that physically travel (the services rail, the
 * lightbox). Tuned to settle without overshoot so architecture photography
 * never wobbles.
 */
export const travelSpring: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 42,
  mass: 0.9,
};

/**
 * Entrances start from an already-visible default so a failed script or a
 * reduced-motion preference never hides content.
 */
export const rise = (reduced: boolean, distance = 24): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : distance },
  visible: { opacity: 1, y: 0, transition: transition.focal },
});

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.state },
};

/**
 * Sibling stagger is for lists that read as lists. Cap the total delay so a
 * long list never turns into a queue the visitor has to wait through.
 */
export const staggerDelay = (index: number, step = 0.06, cap = 0.3) =>
  Math.min(index * step, cap);
