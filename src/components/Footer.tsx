import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { site } from "@/data/site";

const links = [
  { label: "EMAIL", value: site.email, href: `mailto:${site.email}` },
  { label: "GITHUB", value: site.github.replace("https://", ""), href: site.github },
  { label: "LINKEDIN", value: site.linkedin.replace("https://www.", ""), href: site.linkedin },
  { label: "PORTFOLIO", value: site.portfolio.replace("https://", ""), href: site.portfolio },
];

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink px-4 py-20 text-paper md:px-7 md:py-28">
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.06] invert" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="text-[10px] tracking-[0.35em] text-paper/45">END OF ENTRY</div>
            <Reveal>
              <p className="display mt-2 text-[clamp(2rem,6vw,4.4rem)] leading-[0.95]">
                GOT A SYSTEM
                <br />
                WORTH <span className="text-blade">BUILDING?</span>
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <Magnetic className="mt-8" strength={0.28}>
                <a
                  href={`mailto:${site.email}`}
                  className="clip-slash inline-flex items-center gap-3 border-2 border-paper bg-paper px-6 py-3 text-[12px] font-bold tracking-[0.22em] text-ink transition-colors hover:bg-blade hover:text-paper"
                >
                  WRITE TO ME →
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <ul className="border-t-2 border-paper/25">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 border-b-2 border-paper/25 py-4 transition-colors hover:bg-paper/[0.04]"
                  >
                    <span className="w-24 shrink-0 text-[10px] tracking-[0.3em] text-paper/45">
                      {l.label}
                    </span>
                    <span className="sweep truncate text-[13px] text-paper/85 transition-colors group-hover:text-blade">
                      {l.value}
                    </span>
                    <span className="ml-auto text-paper/40 transition-transform group-hover:translate-x-1 group-hover:text-blade">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t-2 border-paper/25 pt-6 text-[10px] tracking-[0.22em] text-paper/45 md:flex-row md:items-center md:justify-between">
          <span>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.author} —{" "}
            {site.name} LOG
          </span>
          <a href={site.portfolio} target="_blank" rel="noreferrer" className="sweep transition-colors hover:text-blade">
            {site.portfolio.replace("https://", "")} ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
