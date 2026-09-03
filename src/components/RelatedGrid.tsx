import PostCard from "./PostCard";
import type { PostMeta } from "@/lib/posts";

export default function RelatedGrid({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  return (
    <div>
      <div className="mb-8 flex items-end justify-between border-b-2 border-ink pb-3">
        <h2 className="display text-3xl md:text-4xl">MORE ENTRIES</h2>
        <span className="jp text-base opacity-60">続き</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}
