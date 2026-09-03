"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

const socials = [
  {
    label: "Email",
    href: `mailto:${site.email}`,
    path: "M2 4h12v8H2zM2 4l6 4.5L14 4",
    fill: false,
  },
  {
    label: "GitHub",
    href: site.github,
    path: "M8 .8a7.2 7.2 0 0 0-2.3 14c.36.07.5-.15.5-.35v-1.2c-2 .44-2.43-.97-2.43-.97-.33-.83-.8-1.05-.8-1.05-.66-.45.05-.44.05-.44.73.05 1.11.75 1.11.75.65 1.1 1.7.79 2.11.6.07-.47.25-.79.46-.97-1.6-.18-3.28-.8-3.28-3.56 0-.79.28-1.43.74-1.93-.07-.18-.32-.91.07-1.9 0 0 .6-.2 1.98.73a6.9 6.9 0 0 1 3.6 0c1.38-.93 1.98-.74 1.98-.74.4 1 .15 1.73.07 1.91.46.5.74 1.14.74 1.93 0 2.77-1.68 3.38-3.28 3.55.26.22.49.66.49 1.33v1.97c0 .2.13.42.5.35A7.2 7.2 0 0 0 8 .8Z",
    fill: true,
  },
  {
    label: "LinkedIn",
    href: site.linkedin,
    path: "M3.4 5.5H1V15h2.4V5.5ZM2.2 1a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM15 9.6c0-2.5-1.3-3.6-3.1-3.6-1.4 0-2.1.8-2.4 1.4V5.5H7.1V15h2.4V9.8c0-1 .2-2 1.4-2 1.2 0 1.3 1.1 1.3 2.1V15H15V9.6Z",
    fill: true,
  },
];

const links = [
  { href: "/", label: "ALL ENTRIES" },
  { href: site.portfolio, label: "PORTFOLIO", external: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper/85 backdrop-blur-sm">
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="progress-rail absolute inset-x-0 bottom-[-2px] h-[2px] bg-blade"
        />
        <nav className="mx-auto flex h-11 max-w-[1400px] items-center gap-6 px-4 md:px-7">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="relative block h-6 w-6">
              <Image
                src="/assets/logo-mark.webp"
                alt="Cypherion crest"
                fill
                sizes="24px"
                className="object-contain mix-blend-multiply"
              />
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-ink">
              LOG
            </span>
          </Link>

          <ul className="hidden flex-1 items-center gap-6 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noreferrer" : undefined}
                  className="sweep text-[11px] tracking-[0.16em] text-ink/60 hover:text-ink"
                >
                  {l.label}
                  {l.external ? " ↗" : ""}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="ml-auto hidden items-center gap-2 md:flex">
            {socials.map((sc) => (
              <li key={sc.label}>
                <a
                  href={sc.href}
                  target={sc.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={sc.label}
                  title={sc.label}
                  className="group flex h-7 w-7 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                    <path
                      d={sc.path}
                      fill={sc.fill ? "currentColor" : "none"}
                      stroke={sc.fill ? "none" : "currentColor"}
                      strokeWidth={sc.fill ? 0 : 1.6}
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="ml-auto flex h-7 w-7 flex-col items-center justify-center gap-1 border-2 border-ink md:ml-2 lg:hidden"
          >
            <span className="h-[2px] w-3.5 bg-ink" />
            <span className="h-[2px] w-3.5 bg-ink" />
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-ink pt-11 text-paper lg:hidden">
          <ul className="flex h-full flex-col justify-center gap-5 px-8">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="display flex items-baseline gap-4 text-4xl"
                >
                  {l.label}
                  {l.external ? " ↗" : ""}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex gap-3 px-8 pb-10">
            {socials.map((sc) => (
              <li key={sc.label}>
                <a
                  href={sc.href}
                  target={sc.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={sc.label}
                  className="flex h-9 w-9 items-center justify-center border-2 border-paper text-paper"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4">
                    <path
                      d={sc.path}
                      fill={sc.fill ? "currentColor" : "none"}
                      stroke={sc.fill ? "none" : "currentColor"}
                      strokeWidth={sc.fill ? 0 : 1.6}
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
