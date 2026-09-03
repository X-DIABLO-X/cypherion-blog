"use client";

import { motion } from "framer-motion";
import LogBubble from "./LogBubble";
import { site } from "@/data/site";

export default function Hero({ count }: { count: number }) {
  return (
    <section className="halftone-fade grain relative overflow-hidden px-4 pb-16 pt-32 md:px-7 md:pb-24 md:pt-40">
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 text-[10px] tracking-[0.35em] text-ink/50"
        >
          <span className="h-[2px] w-6 bg-blade" />
          {site.jp.archive} — {String(count).padStart(2, "0")} ENTRIES LOGGED
        </motion.div>

        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[clamp(3rem,11vw,8.5rem)]"
          >
            FIELD
            <br />
            <span className="stroke-ink">NOTES</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <LogBubble />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[58ch] text-[13px] leading-relaxed text-ink/70 md:text-sm"
        >
          {site.description}
        </motion.p>
      </div>
    </section>
  );
}
