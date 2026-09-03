"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "default" | "link" | "panel" | "text";

/**
 * Manga-brush cursor: a hard ink nib that tracks 1:1, a lagging blade-blue
 * reticle that eases behind it, and a soft ink smudge further back.
 * Only mounts for fine pointers — touch devices keep native behaviour.
 */
export default function CustomCursor() {
  const nib = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const smudge = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    const boot = window.setTimeout(() => {
      setEnabled(true);
      document.body.classList.add("cursor-hidden");
    }, 250);

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...target };
    const smudgePos = { ...target };
    let frame = 0;

    const visibleRef = { current: false };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      if (nib.current) {
        nib.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;
      smudgePos.x += (target.x - smudgePos.x) * 0.07;
      smudgePos.y += (target.y - smudgePos.y) * 0.07;

      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) rotate(45deg)`;
      }
      if (smudge.current) {
        smudge.current.style.transform = `translate3d(${smudgePos.x}px, ${smudgePos.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [data-cursor='link']")) setMode("link");
      else if (el.closest("[data-cursor='panel'], .panel")) setMode("panel");
      else if (el.closest("p, h1, h2, h3, blockquote, li")) setMode("text");
      else setMode("default");
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.clearTimeout(boot);
      cancelAnimationFrame(frame);
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  if (!enabled) return null;

  const ringSize =
    mode === "link" ? 54 : mode === "panel" ? 68 : mode === "text" ? 30 : 34;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s" }}
    >
      <div
        ref={smudge}
        className="fixed left-0 top-0 rounded-full"
        style={{
          width: 46,
          height: 46,
          background:
            "radial-gradient(circle, rgba(27,87,255,0.30), rgba(27,87,255,0) 68%)",
          filter: "blur(3px)",
          opacity: mode === "default" ? 0.55 : 0.85,
          transition: "opacity 0.3s",
        }}
      />

      <div
        ref={ring}
        className="fixed left-0 top-0"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1.5px solid ${mode === "text" ? "#0a0a0c" : "#1b57ff"}`,
          borderRadius: mode === "text" ? "50%" : 2,
          transition:
            "width 0.28s cubic-bezier(0.22,1,0.36,1), height 0.28s cubic-bezier(0.22,1,0.36,1), border-radius 0.28s, background 0.28s, opacity 0.28s",
          background:
            mode === "panel" ? "rgba(27,87,255,0.10)" : "transparent",
          opacity: down ? 0.5 : 1,
        }}
      />

      <div
        ref={nib}
        className="fixed left-0 top-0 rounded-full bg-ink"
        style={{
          width: down ? 12 : mode === "link" ? 8 : 6,
          height: down ? 12 : mode === "link" ? 8 : 6,
          transition: "width 0.18s, height 0.18s",
          boxShadow: "0 0 0 1px rgba(244,241,234,0.55)",
        }}
      />
    </div>
  );
}
