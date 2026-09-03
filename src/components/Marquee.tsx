import { marqueeWords } from "@/data/site";

/** Two-row ink ticker running opposite directions, matching the portfolio's speed-lines/halftone texture band. */
export default function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];

  return (
    <div className="speed-lines grain relative overflow-hidden border-y-2 border-ink bg-ink py-4 text-paper">
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.05] invert" />
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i} className="display mx-4 shrink-0 text-2xl text-paper/85 md:text-4xl">
            {w} <span className="text-blade">◆</span>
          </span>
        ))}
      </div>
      <div className="marquee-track-rev mt-1">
        {row.map((w, i) => (
          <span key={i} className="display mx-4 shrink-0 text-2xl text-paper/25 md:text-4xl">
            {w} <span className="text-blaze/60">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
