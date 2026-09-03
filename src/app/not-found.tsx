import Link from "next/link";

export default function NotFound() {
  return (
    <div className="halftone-fade grain relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 text-center">
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="jp relative mb-6 text-lg tracking-[0.4em] text-ink/50">頁が見つからない</div>
      <h1 className="display relative text-[clamp(3rem,14vw,9rem)] leading-none">404</h1>
      <p className="relative mt-4 max-w-[46ch] text-[13px] text-ink/65">
        This entry doesn&rsquo;t exist, or it was pulled from the log.
      </p>
      <Link
        href="/"
        className="clip-slash relative mt-8 inline-flex items-center gap-2 border-2 border-ink px-6 py-3 text-[12px] font-bold tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper"
      >
        ← BACK TO ALL ENTRIES
      </Link>
    </div>
  );
}
