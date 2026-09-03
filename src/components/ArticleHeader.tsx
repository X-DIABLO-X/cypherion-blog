import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/format";

const ACCENTS = { blade: "#1b57ff", blaze: "#ff2d2d" };

export default function ArticleHeader({ post }: { post: Post }) {
  const accent = ACCENTS[post.accent];

  return (
    <header className="halftone-fade grain relative overflow-hidden px-4 pb-14 pt-28 md:px-7 md:pb-20 md:pt-36">
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative mx-auto max-w-[900px]">
        <Link href="/" className="sweep inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-ink/55">
          ← BACK TO THE LOG
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="h-[2px] w-8" style={{ background: accent }} />
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <li key={t} className="tag border-ink/30 text-ink/60">
                {t}
              </li>
            ))}
          </ul>
          <span className="jp ml-auto text-lg text-ink/25">{post.kanji}</span>
        </div>

        <h1 className="display mt-4 text-[clamp(2.2rem,7vw,4.6rem)]">{post.title}</h1>

        <p className="mt-4 max-w-[62ch] text-[14px] leading-relaxed text-ink/70">
          {post.description}
        </p>

        <div className="mt-6 flex items-center gap-4 border-t-2 border-ink/15 pt-4 text-[11px] tracking-[0.16em] text-ink/50">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime} MIN READ</span>
        </div>
      </div>
    </header>
  );
}
