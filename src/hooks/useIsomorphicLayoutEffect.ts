import { useEffect, useLayoutEffect } from 'react';

/** useLayoutEffect in the browser, useEffect while rendering on the server (no warning). */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
