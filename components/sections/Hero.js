import { CalendarDays, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import ConvergenceSphere from "@/components/animations/ConvergenceSphere";
import { site } from "@/data/site";
import { tracks } from "@/data/tracks";

/**
 * Server-rendered hero. The headline is plain HTML (the LCP element) and animates in
 * with a transform-only CSS keyframe, so it paints on the first frame without JS.
 */
export default function Hero() {
  const facts = [
    { label: "Dates", value: site.dates.short },
    { label: "Venue", value: `BKC, ${site.venue.city}` },
    { label: "Research tracks", value: String(tracks.length).padStart(2, "0"), count: tracks.length },
    { label: "Hosted by", value: site.host.school },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-atlas-950 pt-18 text-white"
    >
      {/* Background: tonal glows + fading grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/4 right-[-20%] size-[70rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgba(67,57,142,0.75),transparent)]" />
        <div className="absolute bottom-[-30%] left-[-25%] size-[50rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgba(0,168,184,0.16),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]" />
      </div>

      {/* Sphere: behind the copy on small screens, beside it on large screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-1/2 -z-10 aspect-square w-[min(140vw,44rem)] -translate-x-1/2 opacity-45 lg:top-1/2 lg:left-auto lg:right-[-6%] lg:w-[min(60vw,54rem)] lg:-translate-x-0 lg:-translate-y-[52%] lg:opacity-100"
      >
        <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgba(0,168,184,0.22),transparent)]" />
        <ConvergenceSphere />
      </div>

      <Container className="relative">
        <div className="flex min-h-[calc(100svh-4.5rem)] flex-col justify-center py-16 sm:py-20 lg:min-h-[44rem] lg:py-24">
          <div className="max-w-[48rem]">
            <p className="motion-safe:animate-rise inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] py-1.5 pr-4 pl-2 text-xs font-medium tracking-wide text-atlas-100 ring-1 ring-white/10 backdrop-blur-sm">
              <span className="rounded-full bg-aqua-500 px-2 py-0.5 font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-atlas-950 uppercase">
                {site.edition}
              </span>
              {site.nature}
            </p>

            <p className="motion-safe:animate-rise mt-8 font-mono text-[clamp(1.05rem,0.85rem+1vw,1.5rem)] font-medium tracking-[0.32em] text-aqua-300 [animation-delay:80ms]">
              ICCISF<span className="text-white">2027</span>
            </p>

            <h1
              id="hero-title"
              className="motion-safe:animate-lift mt-5 text-[clamp(2.25rem,1.2rem+3.6vw,4.25rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance"
            >
              <span className="sr-only">{site.shortName}: </span>
              <span className="block pb-2 text-[0.48em] leading-tight font-medium tracking-[-0.01em] text-atlas-100">International Conference on</span>
              <span className="block pt-1 font-serif text-[1.08em] font-normal tracking-[-0.01em] text-aqua-200 italic">
                Convergent Intelligence
              </span>
              <span className="block">for Sustainable Futures</span>
            </h1>

            <dl className="motion-safe:animate-rise mt-9 flex flex-col gap-4 text-[0.95rem] text-atlas-100 [animation-delay:200ms] sm:flex-row sm:flex-wrap sm:gap-x-8">
              <div className="flex items-center gap-3">
                <dt className="sr-only">Dates</dt>
                <CalendarDays aria-hidden="true" className="size-5 shrink-0 text-aqua-300" />
                <dd>
                  <time dateTime={site.dates.start}>{site.dates.display}</time>
                </dd>
              </div>
              <div className="flex items-start gap-3 sm:items-center">
                <dt className="sr-only">Venue</dt>
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-aqua-300 sm:mt-0" />
                <dd>
                  {site.venue.name}, {site.venue.city}, {site.venue.country}
                </dd>
              </div>
            </dl>

            <div className="motion-safe:animate-rise mt-10 flex flex-col gap-3 [animation-delay:300ms] min-[420px]:flex-row">
              <ButtonLink href="#tracks">Explore Conference Tracks</ButtonLink>
              <ButtonLink href="#dates" variant="ghostDark" arrow={false}>
                Important Dates
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      {/* Key facts strip */}
      <div className="relative border-t border-white/10 bg-atlas-950/60 backdrop-blur-sm">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`motion-safe:animate-rise py-6 [animation-delay:400ms] sm:py-8 ${
                  i % 2 === 1 ? "border-l border-white/10 pl-5 sm:pl-8" : "pr-5"
                } ${i === 2 ? "border-t border-white/10 lg:border-t-0 lg:border-l lg:pl-8" : ""} ${
                  i === 3 ? "border-t border-white/10 lg:border-t-0" : ""
                }`}
              >
                <dt className="font-mono text-[0.68rem] tracking-[0.16em] text-atlas-300 uppercase">{fact.label}</dt>
                <dd
                  className="mt-2 text-base font-semibold tracking-tight text-white tabular-nums sm:text-lg"
                  {...(fact.count ? { "data-count": fact.count, "data-count-pad": 2 } : {})}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="flex items-start gap-2.5 border-t border-white/10 py-4 text-xs text-atlas-300 sm:items-center">
            <span aria-hidden="true" className="mt-1 size-2 shrink-0 rounded-full bg-aqua-400 shadow-[0_0_0_4px] shadow-aqua-400/20 sm:mt-0" />
            {site.statusNote}
          </p>
        </Container>
      </div>
    </section>
  );
}
