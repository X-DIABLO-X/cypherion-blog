import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BlogExplorer from "@/components/BlogExplorer";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags(posts);

  return (
    <>
      <Hero count={posts.length} />
      <Marquee />
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-7 md:py-24">
        <BlogExplorer posts={posts} tags={tags} />
      </div>
    </>
  );
}
