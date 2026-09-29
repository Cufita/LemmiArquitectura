import { describe, expect, it, vi } from 'vitest';
import { cardLefts, jump, nearestIndex } from '../carousel';

describe('nearestIndex', () => {
  const lefts = [0, 300, 600, 900];

  it('picks the card closest to the scroll position', () => {
    expect(nearestIndex(lefts, 0)).toBe(0);
    expect(nearestIndex(lefts, 140)).toBe(0);
    expect(nearestIndex(lefts, 160)).toBe(1);
    expect(nearestIndex(lefts, 5000)).toBe(3);
  });

  it('falls back to the first card on an empty track', () => {
    expect(nearestIndex([], 100)).toBe(0);
  });
});

describe('cardLefts', () => {
  it('measures only direct data-card children, relative to the track', () => {
    const track = document.createElement('ul');
    track.innerHTML = '<li data-card></li><li data-card></li><li><span data-card></span></li>';
    track.getBoundingClientRect = () => ({ left: 100 }) as DOMRect;
    const [first, second] = Array.from(track.children) as HTMLElement[];
    first.getBoundingClientRect = () => ({ left: 100 }) as DOMRect;
    second.getBoundingClientRect = () => ({ left: 400 }) as DOMRect;
    expect(cardLefts(track)).toEqual([0, 300]);
  });
});

describe('jump', () => {
  it('scrolls without animation', () => {
    const track = document.createElement('ul');
    track.scrollTo = vi.fn();
    jump(track, 250);
    expect(track.scrollTo).toHaveBeenCalledWith({ left: 250, behavior: 'instant' });
  });
});
