import { describe, expect, it, vi } from 'vitest';
import { cardLefts, jump } from '../carousel';
import { duration, fade, rise, staggerDelay, transition } from '../motion';

describe('motion tokens', () => {
  it('keeps exits faster than entrances', () => {
    expect(transition.exit.duration).toBeLessThan(transition.focal.duration);
    expect(duration.instant).toBeLessThan(duration.focal);
  });

  it('rise travels unless reduced motion is asked for', () => {
    expect((rise(false).hidden as { y: number }).y).toBe(24);
    expect((rise(false, 40).hidden as { y: number }).y).toBe(40);
    expect((rise(true).hidden as { y: number }).y).toBe(0);
  });

  it('fade only changes opacity', () => {
    expect(fade.hidden).toEqual({ opacity: 0 });
  });

  it('caps the stagger so long lists never queue', () => {
    expect(staggerDelay(1)).toBeCloseTo(0.06);
    expect(staggerDelay(100)).toBe(0.3);
    expect(staggerDelay(2, 0.1, 1)).toBeCloseTo(0.2);
  });
});

describe('carousel DOM helpers', () => {
  it('measures each card from the start of the scrollable content', () => {
    const track = document.createElement('div');
    track.getBoundingClientRect = () => ({ left: 10 }) as DOMRect;
    Object.defineProperty(track, 'scrollLeft', { value: 100 });
    [30, 230].forEach((left) => {
      const card = document.createElement('div');
      card.setAttribute('data-card', '');
      card.getBoundingClientRect = () => ({ left }) as DOMRect;
      track.appendChild(card);
    });
    expect(cardLefts(track)).toEqual([120, 320]);
  });

  it('jumps without animation', () => {
    const track = document.createElement('div');
    track.scrollTo = vi.fn();
    jump(track, 50);
    expect(track.scrollTo).toHaveBeenCalledWith({ left: 50, behavior: 'instant' });
  });
});
