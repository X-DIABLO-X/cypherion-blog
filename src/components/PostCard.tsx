"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

const ACCENTS = { blade: "#1b57ff", blaze: "#ff2d2d" };

export default function PostCard({ post, index }: { post: PostMeta; index: number }) {
  const accent = ACCENTS[post.accent];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}/`} className="panel group block h-full overflow-hidden">
        <div className="grain speed-lines relative flex h-32 flex-col justify-between overflow-hidden bg-ink px-4 py-3 text-paper">
          <div className="halftone pointer-events-none absolute inset-0 opacity-[0.08] invert" />
          <span
            className="absolute right-0 top-0 h-full w-1.5"
            style={{ background: accent }}
            aria-hidden
          />
          <div className="relative flex items-start justify-between">
            <span className="text-[10px] font-bold tracking-[0.28em] text-paper/60">
              ENTRY {String(index + 1).padStart(2, "0")}
            </span>
            <span className="jp text-2xl leading-none text-paper/20">{post.kanji}</span>
          </div>
          <span className="relative text-[10px] tracking-[0.2em] text-paper/45">
            {formatDate(post.date)} · {post.readingTime} MIN READ
          </span>
        </div>

        <div className="p-5">
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((t) => (
              <li key={t} className="tag border-ink/30 text-ink/60">
                {t}
              </li>
            ))}
          </ul>

          <h3 className="display mt-3 text-[1.55rem] leading-[0.95] group-hover:text-blade">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-ink/65">
            {post.description}
          </p>

          <span className="sweep mt-4 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-ink">
            READ ENTRY
            <span style={{ color: accent }} className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
