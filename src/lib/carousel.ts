/** Left edge of every card, measured from the start of the scrollable content. */
export function cardLefts(track: HTMLElement): number[] {
  const trackLeft = track.getBoundingClientRect().left;
  return Array.from(track.querySelectorAll(':scope > [data-card]')).map(
    (card) => card.getBoundingClientRect().left - trackLeft + track.scrollLeft,
  );
}

/** Index of the card whose left edge is closest to the current scroll position. */
export const nearestIndex = (lefts: number[], scrollLeft: number): number =>
  lefts.reduce((best, left, i) => (Math.abs(left - scrollLeft) < Math.abs(lefts[best] - scrollLeft) ? i : best), 0);

/** Move without animation, whatever the element's CSS scroll-behavior says. */
export const jump = (track: HTMLElement, left: number) =>
  track.scrollTo({ left, behavior: 'instant' as ScrollBehavior });
