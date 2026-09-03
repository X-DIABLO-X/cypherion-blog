"use client";

import { useEffect } from "react";

/**
 * The MDX pipeline emits static HTML — code blocks come pre-wrapped in
 * `.code-shell` with a `.copy-btn` already in the markup (see
 * src/lib/markdown.ts). This wires the click-to-copy behaviour up after
 * hydration, scoped to one article container so it never touches other
 * `.copy-btn`s on the page.
 */
export default function CodeEnhancer({ scopeId }: { scopeId: string }) {
  useEffect(() => {
    const root = document.getElementById(scopeId);
    if (!root) return;

    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>(".code-shell .copy-btn"));

    const handlers = buttons.map((btn) => {
      const onClick = async () => {
        const pre = btn.closest(".code-shell")?.querySelector("pre");
        const text = pre?.textContent ?? "";
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          return;
        }
        btn.textContent = "COPIED";
        btn.dataset.copied = "true";
        window.setTimeout(() => {
          btn.textContent = "COPY";
          btn.dataset.copied = "false";
        }, 1600);
      };
      btn.addEventListener("click", onClick);
      return { btn, onClick };
    });

    return () => {
      handlers.forEach(({ btn, onClick }) => btn.removeEventListener("click", onClick));
    };
  }, [scopeId]);

  return null;
}
