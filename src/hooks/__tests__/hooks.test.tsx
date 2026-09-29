import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';
import useReducedMotion from '../useReducedMotion';

describe('useReducedMotion', () => {
  it('is false when the visitor has no preference', () => {
    expect(renderHook(() => useReducedMotion()).result.current).toBe(false);
  });
});

describe('useIsomorphicLayoutEffect', () => {
  it('runs the effect in the browser', () => {
    const effect = vi.fn();
    renderHook(() => useIsomorphicLayoutEffect(effect, []));
    expect(effect).toHaveBeenCalledOnce();
  });
});
