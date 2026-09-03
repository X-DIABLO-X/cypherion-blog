# CYPHERION LOG — blogs.cypherion.tech

The field-notes blog for [cypherion.tech](https://cypherion.tech), built as its own static
site so the two can be deployed, cached and iterated on independently. Same black-ink
*seinen* manga aesthetic — paper texture, halftone screentone, hard panel borders, one
electric-blue accent — carried over token-for-token from the portfolio's `globals.css`.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, `output: "export"` — fully static) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + the shared manga primitives in `globals.css` |
| Content | MDX files in `content/posts/`, compiled at build time via `unified` + `shiki` |
| Motion | Framer Motion (reveals, the tag/search grid, the masthead bubble) |
| Scroll | Lenis (smooth scrolling, anchor interception) |

No CMS, no runtime data fetching — writing a post means adding an `.mdx` file and
redeploying, the same philosophy as the portfolio's static `profile.ts`/`projects.ts`.

## Writing a post

Drop a new file in `content/posts/your-slug.mdx`:

```mdx
---
title: "YOUR TITLE"
description: "One or two sentences — used in cards, meta tags and the RSS-less summary."
date: "2026-09-03"
tags: ["Systems", "Whatever"]
kanji: "記"
accent: "blade" # or "blaze" — the single accent stripe on the entry's card
---

Your content, as normal Markdown/MDX. Fenced code blocks are syntax-highlighted
with shiki and get a copy button automatically; headings get anchor links and
feed the "on this page" sidebar.
```

The filename becomes the slug (`/blog/your-slug/`). Reading time is computed from the
word count — no field to fill in. `src/lib/posts.ts` and `src/lib/markdown.ts` are the
only two files that touch content; nothing else needs to change to add a post.

## Art

Every illustration in `public/assets/` was generated to one house style — heavy brush
ink, screentone shading, extreme contrast, a single electric-blue accent — matching the
portfolio's art direction. All of it is landscape 3:2 (1536×1024), WebP, ~0.2–0.6 MB each.

| File | Slot |
| --- | --- |
| `hero-desk.webp` | Masthead backdrop |
| `cover-xeon.webp` | Xeon-1 entry |
| `cover-hls.webp` | HLS-Engine entry |
| `cover-drm.webp` | Widevine entry |
| `cover-minidb.webp` | MiniDB entry |
| `splash-divider.webp` | Ink-splash section transition |

Unlike the portfolio's art (drawn light-on-paper, composited with `mix-blend-multiply`),
this set is drawn **dark-on-black**. Inverting it onto paper thins the brushwork into a
washed-out sketch, so instead every panel that carries art sits on an ink ground —
the masthead, each card's cover, and the article header — and only the surrounding page
stays paper. That is the contrast these covers were composed for (`.art-on-ink`).

## Structure

- `content/posts/*.mdx` — the posts.
- `src/lib/posts.ts` — reads and sorts posts, computes reading time, resolves prev/next.
- `src/lib/markdown.ts` — the `unified`/`shiki` pipeline: heading slugs + anchors, syntax
  highlighting, and the code-block "shell" (language tab + copy button) wrapper.
- `src/data/site.ts` — name, tagline, socials, the masthead's cycling Japanese lines.
- `src/app/page.tsx` — the index: masthead, ticker, then the interactive search/tag grid
  (`BlogExplorer.tsx`) with animated card enter/exit via `framer-motion`'s `AnimatePresence`.
- `src/app/blog/[slug]/page.tsx` — the article template: header, table of contents,
  compiled MDX body, share row, prev/next, related entries by shared tags.

## Commands

```bash
npm install
npm run dev      # http://localhost:3001 (offset from the portfolio's :3000)
npm run build    # static site -> ./out, then scripts/postbuild.mjs writes
                  # sitemap.xml, robots.txt and a Cloudflare _headers file
```

## Deploy

Ships as a Cloudflare Worker serving static assets, same pattern as the portfolio's
`wrangler.toml`, routed at the `blogs.cypherion.tech` custom domain (the `cypherion.tech`
zone already lives on this Cloudflare account, so Workers provisioned the DNS record
itself on the first deploy).

**Deploys happen automatically** — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds and runs `wrangler deploy` on every push to `master`. Push an `.mdx` file and the
live site updates a couple of minutes later; nothing to run locally.

That workflow needs one repo secret:

- `CLOUDFLARE_API_TOKEN` — a token scoped with the **Edit Cloudflare Workers** template
  (dashboard → My Profile → API Tokens → Create Token), which covers deploying the
  Worker and updating its custom-domain route. Add it with:

  ```bash
  gh secret set CLOUDFLARE_API_TOKEN --repo X-DIABLO-X/cypherion-blog
  ```

  or via the repo's Settings → Secrets and variables → Actions on github.com. The
  account id is already pinned in `wrangler.toml` (not secret — just an identifier),
  so CI never has to guess which account to deploy into.

`npm run deploy` still works locally as a manual override (build, then `wrangler deploy`
against whatever account `wrangler login` last authenticated).

> Note: `next build` writes into `.next`, which a running `next dev` also owns — stop
> the dev server before building.

## Accessibility & performance

- Full `prefers-reduced-motion` support: Lenis, the masthead ticker, the custom cursor
  and the intro curtain all stand down, matching the portfolio's `useReducedMotionSafe`.
- Semantic landmarks, labelled nav and search input, `aria-hidden` on decorative art.
- Static HTML, no client-side data fetching, code blocks pre-rendered at build time
  (shiki runs once per build, not per pageview).
