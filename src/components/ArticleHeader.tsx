"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxImage from "./ParallaxImage";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/format";

const ACCENTS = { blade: "#1b57ff", blaze: "#ff2d2d" };

/**
 * Magazine-style article opener: the cover art runs full-bleed behind the
 * title, inverted onto the dark ground (luminance flipped, hue preserved, so
 * the blue accent survives) with the type sitting over it in paper white.
 */
export default function ArticleHeader({ post }: { post: Post }) {
  const accent = ACCENTS[post.accent];

  return (
    <header className="grain relative overflow-hidden bg-ink text-paper">
      {post.cover && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.42]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, transparent 4%, rgba(0,0,0,0.65) 46%, #000 100%)",
            maskImage:
              "linear-gradient(to top, transparent 4%, rgba(0,0,0,0.65) 46%, #000 100%)",
          }}
        >
          <ParallaxImage
            src={post.cover}
            alt=""
            sizes="100vw"
            priority
            strength={7}
            className="art-on-ink object-cover object-center"
          />
        </div>
      )}

      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.06] invert" />

      <div className="relative mx-auto max-w-[900px] px-4 pb-16 pt-28 md:px-7 md:pb-20 md:pt-36">
        <Link
          href="/"
          className="sweep inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-paper/55 transition-colors hover:text-paper"
        >
          ← BACK TO THE LOG
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mt-7 flex items-center gap-3">
            <span className="h-[2px] w-10" style={{ background: accent }} />
            <ul className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <li key={t} className="tag border-paper/30 text-paper/70">
                  {t}
                </li>
              ))}
            </ul>
            <span className="jp-h ml-auto text-lg text-paper/35">{post.kanji}</span>
          </div>

          <h1 className="display mt-5 text-[clamp(2.3rem,7.2vw,4.8rem)]">{post.title}</h1>

          <p className="mt-5 max-w-[62ch] text-[14px] leading-relaxed text-paper/70">
            {post.description}
          </p>

          <div className="mt-7 flex items-center gap-4 border-t-2 border-paper/20 pt-4 text-[11px] tracking-[0.16em] text-paper/50">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime} MIN READ</span>
            <span aria-hidden className="ml-auto hidden sm:inline">
              HARSHIT TIWARI
            </span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
