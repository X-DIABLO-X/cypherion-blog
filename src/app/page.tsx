import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Divider from "@/components/Divider";
import BlogExplorer from "@/components/BlogExplorer";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags(posts);

  return (
    <>
      <Hero count={posts.length} />
      <Marquee />
      <Divider />
      <div className="mx-auto max-w-[1400px] px-4 pb-20 md:px-7 md:pb-28">
        <BlogExplorer posts={posts} tags={tags} />
      </div>
    </>
  );
}
