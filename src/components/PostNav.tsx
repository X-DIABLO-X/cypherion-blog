import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function Card({ post, dir }: { post: PostMeta; dir: "prev" | "next" }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={`panel group flex flex-col gap-2 p-5 ${dir === "next" ? "text-right items-end" : ""}`}
    >
      <span className="text-[10px] tracking-[0.28em] text-ink/45">
        {dir === "prev" ? "← PREVIOUS ENTRY" : "NEXT ENTRY →"}
      </span>
      <span className="display text-xl leading-tight group-hover:text-blade">{post.title}</span>
    </Link>
  );
}

export default function PostNav({
  prev,
  next,
}: {
  prev: PostMeta | null;
  next: PostMeta | null;
}) {
  if (!prev && !next) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {prev ? <Card post={prev} dir="prev" /> : <div />}
      {next ? <Card post={next} dir="next" /> : <div />}
    </div>
  );
}
