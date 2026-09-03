import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMarkdown, type Heading } from "./markdown";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type Accent = "blade" | "blaze";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  kanji: string;
  accent: Accent;
  cover: string;
  readingTime: number;
};

export type Post = PostMeta & {
  html: string;
  headings: Heading[];
};

function readSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

function readingTimeFor(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function findFile(slug: string): string {
  const mdx = path.join(POSTS_DIR, `${slug}.mdx`);
  if (fs.existsSync(mdx)) return mdx;
  return path.join(POSTS_DIR, `${slug}.md`);
}

export function getAllSlugs(): string[] {
  return readSlugs();
}

export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(findFile(slug), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        tags: (data.tags as string[]) ?? [],
        kanji: (data.kanji as string) ?? "記",
        accent: (data.accent as Accent) ?? "blade",
        cover: (data.cover as string) ?? "",
        readingTime: readingTimeFor(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const file = findFile(slug);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const { html, headings } = await compileMarkdown(content);

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    kanji: (data.kanji as string) ?? "記",
    accent: (data.accent as Accent) ?? "blade",
    cover: (data.cover as string) ?? "",
    readingTime: readingTimeFor(content),
    html,
    headings,
  };
}

export function getAllTags(posts: PostMeta[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  posts.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getAdjacentPosts(
  slug: string,
  posts: PostMeta[]
): { prev: PostMeta | null; next: PostMeta | null } {
  // `posts` is newest-first; "next" is the chronologically later (newer) entry.
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: posts[i + 1] ?? null,
    next: i > 0 ? posts[i - 1] : null,
  };
}
