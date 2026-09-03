"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import useReducedMotionSafe from "@/hooks/useReducedMotionSafe";
import { useRef } from "react";

/**
 * An image that drifts inside its own frame as the frame crosses the viewport.
 * The inner wrapper is inset negatively so the drift never exposes an edge.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
  strength = 12,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  strength?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`]
  );

  const inset = `-${strength + 4}%`;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y, position: "absolute", inset }}
        className="will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={className}
          style={style}
        />
      </motion.div>
    </div>
  );
}
