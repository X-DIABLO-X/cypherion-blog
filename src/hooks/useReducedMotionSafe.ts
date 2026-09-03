"use client";

import { useEffect, useState } from "react";

/**
 * Hydration-safe replacement for framer-motion's `useReducedMotion`.
 *
 * Framer's version is `useState(prefersReducedMotion.current)`, so it reads the
 * real media query on the very first client render while the server always
 * emitted `false`. Anything branching on it during render — a conditional
 * element, or a prop that framer serialises into the inline style — therefore
 * produces markup that cannot hydrate for anyone who has Reduced Motion on.
 *
 * This always reports `false` for the first render, matching the server, and
 * flips afterwards in an effect. That is a normal re-render, not a hydration
 * mismatch. It also tracks later changes to the setting, which framer's does
 * not.
 */
export default function useReducedMotionSafe() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
