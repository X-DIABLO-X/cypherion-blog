import Image from "next/image";

/**
 * The ink-splash transition between the dark ticker band and the paper entry
 * grid.
 *
 * The asset has had its paper ground keyed out to real alpha, so it needs no
 * blend mode and no mask — the ink simply sits on whatever is behind it. It is
 * pulled up into the ticker and down into the grid with negative margins so the
 * splash spills across both boundaries rather than occupying a band of its own;
 * the transparent margins of the image would otherwise add ~1000px of dead space.
 */
export default function Divider() {
  return (
    <div className="pointer-events-none relative z-10 -mt-[9vw] -mb-[4vw] w-full select-none">
      <Image
        src="/assets/splash-divider.webp"
        alt=""
        aria-hidden
        width={1536}
        height={654}
        sizes="100vw"
        className="h-auto w-full"
      />
    </div>
  );
}
