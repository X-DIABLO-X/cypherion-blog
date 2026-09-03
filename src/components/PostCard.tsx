"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxImage from "./ParallaxImage";
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
      <Link href={`/blog/${post.slug}/`} className="panel group flex h-full flex-col overflow-hidden">
        {/* Cover art */}
        <div className="grain relative aspect-[3/2] w-full overflow-hidden border-b-2 border-ink bg-ink">
          {post.cover ? (
            <ParallaxImage
              src={post.cover}
              alt=""
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              strength={9}
              className="art-on-ink object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="speed-lines absolute inset-0 bg-ink" />
          )}
          <div className="halftone pointer-events-none absolute inset-0 opacity-[0.07] invert" />

          <span
            className="absolute left-0 top-0 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-paper"
            style={{ background: accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute bottom-0 right-0 bg-ink px-2.5 py-1">
            <span className="jp-h text-[11px] text-paper">{post.kanji}</span>
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] text-ink/45">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime} MIN</span>
          </div>

          <h3 className="display mt-2.5 text-[1.5rem] leading-[0.95] transition-colors group-hover:text-blade">
            {post.title}
          </h3>

          <p className="mt-2.5 line-clamp-2 text-[12.5px] leading-relaxed text-ink/65">
            {post.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((t) => (
              <li key={t} className="tag border-ink/25 text-ink/55">
                {t}
              </li>
            ))}
          </ul>

          <span className="sweep mt-5 inline-flex w-fit items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-ink">
            READ ENTRY
            <span
              style={{ color: accent }}
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
