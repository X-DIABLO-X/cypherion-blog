import Image from "next/image";

/**
 * The ink-splash transition between the dark ticker band and the paper entry
 * grid. It carries the same grain + halftone as the sections either side, and
 * the top edge dissolves into the dark band it overlaps so the ink reads as
 * sprayed across one continuous page rather than sitting inside a box.
 */
export default function Divider() {
  return (
    <div className="grain relative w-full overflow-hidden">
      <Image
        src="/assets/splash-divider.webp"
        alt=""
        aria-hidden
        width={1536}
        height={555}
        sizes="100vw"
        className="h-[200px] w-full select-none object-cover object-center mix-blend-multiply md:h-[300px]"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 38%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 38%)",
        }}
      />
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.05]" />
    </div>
  );
}
