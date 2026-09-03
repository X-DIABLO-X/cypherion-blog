"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import useReducedMotionSafe from "@/hooks/useReducedMotionSafe";

const HOLD_MS = 3400;

/**
 * The masthead speech bubble, cycling through site.jp.lines — same manga
 * beat as the portfolio's hero bubble: the outgoing line snaps away small
 * and tilted, the incoming one lands oversized and counter-tilted, with an
 * accent ring pinging outward on each change. Hovering holds the line.
 */
export default function LogBubble() {
  const lines = site.jp.lines;
  const reduced = useReducedMotionSafe();
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (reduced || held) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % lines.length), HOLD_MS);
    return () => window.clearInterval(t);
  }, [reduced, held, lines.length]);

  return (
    <div
      className="relative h-28 w-28 shrink-0 lg:h-36 lg:w-36"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
    >
      <div className="absolute inset-0 rounded-full border-2 border-ink bg-paper" />

      {!reduced && (
        <AnimatePresence>
          <motion.span
            key={`ring-${i}`}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.22 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-blade"
          />
        </AnimatePresence>
      )}

      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            initial={reduced ? false : { opacity: 0, scale: 1.3, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.82, rotate: 4 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="jp text-[11px] leading-tight lg:text-xs"
          >
            {lines[i]}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 border-b-2 border-r-2 border-ink bg-paper" />
    </div>
  );
}
