"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PostCard from "./PostCard";
import type { PostMeta } from "@/lib/posts";

export default function BlogExplorer({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: { tag: string; count: number }[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <div id="entries" className="scroll-mt-24">
      <div className="flex flex-col gap-4 border-b-2 border-ink pb-6 md:flex-row md:items-end md:justify-between">
        <div className="relative w-full max-w-sm">
          <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-ink/40">▣</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH THE LOG…"
            aria-label="Search entries"
            className="w-full border-b-2 border-ink/25 bg-transparent py-2 pl-6 text-[13px] tracking-[0.05em] text-ink placeholder:text-ink/35 focus:border-blade focus:outline-none"
          />
          {query.length === 0 && (
            <span className="caret pointer-events-none absolute bottom-2 left-6 h-4 w-[2px] bg-blade" />
          )}
        </div>

        <ul className="flex flex-wrap gap-2">
          <li>
            <button
              onClick={() => setActiveTag(null)}
              className={`tag transition-colors ${
                activeTag === null ? "border-ink bg-ink text-paper" : "border-ink/30 text-ink/60 hover:border-ink"
              }`}
            >
              ALL
            </button>
          </li>
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <button
                onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
                className={`tag transition-colors ${
                  activeTag === tag ? "border-ink bg-ink text-paper" : "border-ink/30 text-ink/60 hover:border-ink"
                }`}
              >
                {tag} · {count}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="panel-static mt-10 flex flex-col items-center gap-2 py-16 text-center"
        >
          <span className="display text-3xl">NO ENTRIES MATCH</span>
          <span className="text-[12px] text-ink/55">
            Try a different tag, or clear the search.
          </span>
        </motion.div>
      ) : (
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
