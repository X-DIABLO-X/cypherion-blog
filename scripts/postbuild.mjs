// Runs after `next build` (output: "export"). Writes the files a static
// export can't generate on its own: a sitemap built from the actual posts,
// robots.txt, and Cloudflare cache-control headers for the static assets.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const outDir = path.join(root, "out");
const postsDir = path.join(root, "content/posts");
const siteUrl = "https://blogs.cypherion.tech";

function getSlugs() {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

function writeSitemap() {
  const slugs = getSlugs();
  const urls = [
    { loc: `${siteUrl}/`, lastmod: new Date().toISOString().slice(0, 10) },
    ...slugs.map((slug) => {
      const raw = fs.readFileSync(
        fs.existsSync(path.join(postsDir, `${slug}.mdx`))
          ? path.join(postsDir, `${slug}.mdx`)
          : path.join(postsDir, `${slug}.md`),
        "utf8"
      );
      const { data } = matter(raw);
      return { loc: `${siteUrl}/blog/${slug}/`, lastmod: data.date };
    }),
  ];

  const body = urls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml);
}

function writeRobots() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(outDir, "robots.txt"), body);
}

function writeHeaders() {
  const body = [
    "/assets/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
    "/_next/static/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
    "/*.xml",
    "  Cache-Control: public, max-age=3600",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(outDir, "_headers"), body);
}

if (!fs.existsSync(outDir)) {
  console.error("postbuild: out/ does not exist — did `next build` run first?");
  process.exit(1);
}

writeSitemap();
writeRobots();
writeHeaders();
console.log("postbuild: wrote sitemap.xml, robots.txt, _headers");
