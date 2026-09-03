"use client";

import { useState } from "react";

export default function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the link is still selectable in the address bar */
    }
  };

  const intents = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "LINKEDIN",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 border-y-2 border-ink/15 py-4">
      <span className="text-[10px] tracking-[0.28em] text-ink/45">SHARE THIS ENTRY</span>
      <button
        onClick={onCopy}
        className="tag border-ink/30 text-ink/70 transition-colors hover:border-ink hover:text-ink"
        data-copied={copied}
      >
        {copied ? "LINK COPIED" : "COPY LINK"}
      </button>
      {intents.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="noreferrer"
          className="tag border-ink/30 text-ink/70 transition-colors hover:border-ink hover:text-ink"
        >
          {it.label}
        </a>
      ))}
    </div>
  );
}
