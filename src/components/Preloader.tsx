"use client";

import { useEffect, useState } from "react";

const HARD_CAP_MS = 1800;

/**
 * A short intro curtain, gated on webfonts landing (swapping them in after
 * reveal would reflow every heading) with a hard cap so a slow connection
 * can never trap the visitor. The exit is a CSS transform transition, not a
 * JS tween, so a busy main thread can't make it stutter.
 */
export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    const finish = () => !cancelled && setLeaving(true);

    const tick = window.setInterval(() => {
      setPct((p) => (p >= 92 ? p : p + Math.max(1, (92 - p) * 0.22)));
    }, 40);

    if (fonts) {
      fonts.ready.then(() => {
        window.clearInterval(tick);
        setPct(100);
        window.setTimeout(finish, 180);
      });
    } else {
      window.setTimeout(finish, 400);
    }

    const cap = window.setTimeout(() => {
      window.clearInterval(tick);
      setPct(100);
      finish();
    }, HARD_CAP_MS);

    return () => {
      cancelled = true;
      window.clearInterval(tick);
      window.clearTimeout(cap);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = leaving ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [leaving]);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => setGone(true), 1000);
    return () => window.clearTimeout(t);
  }, [leaving]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-paper"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
        willChange: "transform",
      }}
      onTransitionEnd={() => leaving && setGone(true)}
    >
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div className="jp mb-8 text-lg tracking-[0.4em] text-paper/70">記録読込中</div>
      <div className="display text-[16vw] leading-none md:text-[9vw]">
        {String(Math.floor(pct)).padStart(3, "0")}
      </div>
      <div className="mt-6 h-[3px] w-[62vw] max-w-md bg-paper/20">
        <div
          className="h-full bg-blade"
          style={{ width: `${pct}%`, transition: "width 0.15s linear" }}
        />
      </div>
    </div>
  );
}
