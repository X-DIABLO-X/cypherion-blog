"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LogBubble from "./LogBubble";
import ParallaxImage from "./ParallaxImage";
import useReducedMotionSafe from "@/hooks/useReducedMotionSafe";
import { site } from "@/data/site";

/**
 * The masthead is a dark cover panel rather than a paper one: the generated
 * art is drawn dark-on-black, so it keeps its own ink ground and the type sits
 * over it in paper white. The page turns to paper at the ink-splash divider.
 */
export default function Hero({ count }: { count: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Art drifts slowest, text lifts fastest — both fade on the way out.
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -110]);
  const fade = useTransform(scrollYProgress, [0, 0.8], reduced ? [1, 1] : [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[88vh] items-center overflow-hidden bg-ink px-4 pb-20 pt-32 text-paper md:px-7 md:pb-28 md:pt-40"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.85]"
        style={{
          WebkitMaskImage:
            "radial-gradient(125% 100% at 68% 45%, #000 30%, rgba(0,0,0,0.6) 62%, transparent 88%)",
          maskImage:
            "radial-gradient(125% 100% at 68% 45%, #000 30%, rgba(0,0,0,0.6) 62%, transparent 88%)",
        }}
      >
        <ParallaxImage
          src="/assets/hero-desk.webp"
          alt=""
          sizes="100vw"
          priority
          strength={8}
          className="art-on-ink object-cover object-center"
        />
      </div>

      {/* Keeps the type legible over the busiest part of the art */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(10,10,12,0.94) 0%, rgba(10,10,12,0.78) 34%, rgba(10,10,12,0.15) 62%, rgba(10,10,12,0.55) 100%)",
        }}
      />

      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.06] invert" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-7"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-[10px] tracking-[0.35em] text-paper/55"
        >
          <span className="h-[2px] w-8 bg-blade" />
          <span className="jp-h">{site.jp.archive}</span>
          <span aria-hidden>·</span>
          {String(count).padStart(2, "0")} ENTRIES LOGGED
        </motion.div>

        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[clamp(3.2rem,12vw,9.5rem)]"
          >
            FIELD
            <br />
            <span className="stroke-paper">NOTES</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="lg:mb-5"
          >
            <LogBubble />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[54ch] border-l-2 border-blade pl-4 text-[13px] leading-relaxed text-paper/75 md:text-sm"
        >
          {site.description}
        </motion.p>

        <motion.a
          href="#entries"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="group mt-1 inline-flex w-fit items-center gap-3 text-[11px] font-bold tracking-[0.28em] text-paper/65 transition-colors hover:text-paper"
        >
          <span className="flex h-8 w-8 items-center justify-center border-2 border-paper transition-colors group-hover:bg-paper group-hover:text-ink">
            ↓
          </span>
          READ THE LOG
        </motion.a>
      </motion.div>
    </section>
  );
}
