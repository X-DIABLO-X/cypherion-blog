import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleHeader from "@/components/ArticleHeader";
import TableOfContents from "@/components/TableOfContents";
import CodeEnhancer from "@/components/CodeEnhancer";
import ShareRow from "@/components/ShareRow";
import PostNav from "@/components/PostNav";
import RelatedGrid from "@/components/RelatedGrid";
import { getAllPosts, getAllSlugs, getAdjacentPosts, getPostBySlug } from "@/lib/posts";
import { site } from "@/data/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const url = `${site.url}/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const { prev, next } = getAdjacentPosts(slug, allPosts);

  const related = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const shared = (p: typeof a) => p.tags.filter((t) => post.tags.includes(t)).length;
      return shared(b) - shared(a);
    })
    .slice(0, 3);

  const url = `${site.url}/blog/${post.slug}/`;

  return (
    <article>
      <ArticleHeader post={post} />

      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 pb-20 md:px-7 lg:grid-cols-[1fr_220px]">
        <div id="article-content" className="min-w-0">
          <div className="prose-ink" dangerouslySetInnerHTML={{ __html: post.html }} />
          <CodeEnhancer scopeId="article-content" />

          <div className="mt-12">
            <ShareRow url={url} title={post.title} />
          </div>

          <div className="mt-10">
            <PostNav prev={prev} next={next} />
          </div>
        </div>

        <aside className="hidden lg:block">
          <TableOfContents headings={post.headings} />
        </aside>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pb-24 md:px-7">
        <RelatedGrid posts={related} />
      </div>
    </article>
  );
}
