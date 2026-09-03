"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxImage from "./ParallaxImage";
import Magnetic from "./Magnetic";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

const ACCENTS = { blade: "#1b57ff", blaze: "#ff2d2d" };

/** The newest entry, given a full-width magazine spread instead of a grid cell. */
export default function FeaturedPost({ post }: { post: PostMeta }) {
  const accent = ACCENTS[post.accent];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 md:mb-20"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="h-[2px] w-10" style={{ background: accent }} />
        <span className="text-[10px] font-bold tracking-[0.35em] text-ink/50">
          LATEST ENTRY
        </span>
        <span className="jp-h ml-auto text-[13px] text-ink/30">最新</span>
      </div>

      <Link
        href={`/blog/${post.slug}/`}
        className="panel group grid items-stretch overflow-hidden lg:grid-cols-[1.15fr_1fr]"
      >
        <div className="grain relative aspect-[3/2] w-full overflow-hidden border-ink bg-ink max-lg:border-b-2 lg:aspect-auto lg:min-h-[420px] lg:border-r-2">
          {post.cover ? (
            <ParallaxImage
              src={post.cover}
              alt=""
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
              strength={10}
              className="art-on-ink object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="speed-lines absolute inset-0 bg-ink" />
          )}
          <div className="halftone pointer-events-none absolute inset-0 opacity-[0.07] invert" />
          <span className="absolute bottom-0 right-0 bg-ink px-3 py-1.5">
            <span className="jp-h text-sm text-paper">{post.kanji}</span>
          </span>
        </div>

        <div className="flex flex-col justify-center p-6 md:p-9">
          <div className="flex items-center gap-2.5 text-[10px] tracking-[0.22em] text-ink/45">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime} MIN READ</span>
          </div>

          <h2 className="display mt-3 text-[clamp(1.9rem,4vw,3.1rem)] leading-[0.94] transition-colors group-hover:text-blade">
            {post.title}
          </h2>

          <p className="mt-4 max-w-[52ch] text-[13px] leading-[1.85] text-ink/70">
            {post.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <li key={t} className="tag border-ink/25 text-ink/55">
                {t}
              </li>
            ))}
          </ul>

          <Magnetic className="mt-7 w-fit" strength={0.22}>
            <span className="clip-slash inline-flex items-center gap-2.5 border-2 border-ink px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] transition-colors group-hover:bg-ink group-hover:text-paper">
              READ THIS ENTRY
              <span style={{ color: accent }}>→</span>
            </span>
          </Magnetic>
        </div>
      </Link>
    </motion.article>
  );
}
