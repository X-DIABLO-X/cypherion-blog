"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import useReducedMotionSafe from "@/hooks/useReducedMotionSafe";

/**
 * Pulls its child toward the pointer while hovered, then snaps back on a
 * spring. Keeps the hit area intact — only the visual is displaced.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotionSafe();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className={`inline-block ${className}`}
    >
      <motion.span
        className="inline-block"
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.6 }}
      >
        {children}
      </motion.span>
    </span>
  );
}
