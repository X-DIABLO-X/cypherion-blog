"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/markdown";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <div className="text-[10px] tracking-[0.3em] text-ink/40">ON THIS PAGE</div>
      <ul className="mt-3 space-y-2 border-l-2 border-ink/15">
        {headings.map((h) => {
          const on = active === h.id;
          return (
            <li key={h.id} style={{ paddingLeft: h.depth === 3 ? "1.6rem" : "0.9rem" }}>
              <a
                href={`#${h.id}`}
                className={`block text-[12px] leading-snug transition-colors ${
                  on ? "font-bold text-blade" : "text-ink/55 hover:text-ink"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
