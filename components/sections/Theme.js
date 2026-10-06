import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import { theme } from "@/data/content";
import { images } from "@/data/images";

export default function Theme() {
  return (
    <section
      id="theme"
      aria-labelledby="theme-title"
      className="relative isolate overflow-hidden bg-atlas-900 py-24 text-white sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] size-[48rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgba(90,80,163,0.55),transparent)]" />
        <div className="absolute right-[-15%] bottom-[10%] size-[40rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgba(0,168,184,0.14),transparent)]" />
      </div>

      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeader index="02" eyebrow={theme.eyebrow} title={theme.statement} id="theme-title" tone="dark" />
            <p data-reveal className="mt-8 max-w-[58ch] text-[1.0625rem] leading-relaxed text-atlas-100/85 sm:text-lg">
              {theme.overview}
            </p>

            <div data-reveal className="mt-10">
              <h3 className="font-mono text-[0.68rem] tracking-[0.16em] text-atlas-300 uppercase">Emerging paradigms</h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {theme.paradigms.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-white/[0.06] px-4 py-2 text-sm font-medium text-white ring-1 ring-white/12"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Convergence diagram */}
          <figure className="lg:col-span-6 lg:pl-6" aria-labelledby="convergence-caption">
            <ul data-reveal-group className="grid gap-3 sm:grid-cols-3">
              {theme.convergence.map((item, i) => (
                <li
                  key={item.label}
                  data-reveal-item
                  className="group relative rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10 transition-colors duration-500 hover:bg-white/[0.09] hover:ring-aqua-300/40"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-aqua-500/15 text-aqua-200 ring-1 ring-aqua-300/25 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5">
                    <Icon name={item.icon} className="size-5" strokeWidth={1.6} />
                  </span>
                  <span aria-hidden="true" className="absolute top-5 right-5 font-mono text-[0.65rem] text-atlas-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="mt-5 block text-base leading-snug font-semibold tracking-tight">{item.label}</span>
                </li>
              ))}
            </ul>

            {/* Converging connectors */}
            <svg
              aria-hidden="true"
              viewBox="0 0 300 72"
              preserveAspectRatio="none"
              className="hidden h-20 w-full text-aqua-300/70 sm:block"
              fill="none"
            >
              {["M50 0 C50 40 150 30 150 72", "M150 0 L150 72", "M250 0 C250 40 150 30 150 72"].map((d) => (
                <path key={d} d={d} data-draw stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            <div aria-hidden="true" className="mx-auto h-10 w-px bg-gradient-to-b from-aqua-300/0 to-aqua-300/70 sm:hidden" />

            <div
              data-reveal
              className="rounded-2xl bg-gradient-to-br from-aqua-400 to-aqua-500 p-6 text-center text-atlas-950 shadow-[0_30px_70px_-30px] shadow-aqua-500/60 sm:p-8"
            >
              <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xl font-semibold tracking-tight sm:text-2xl">
                {theme.outcomes.map((outcome, i) => (
                  <span key={outcome} className="inline-flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="hidden size-1.5 rounded-full bg-atlas-950/40 sm:block" />}
                    {outcome}
                  </span>
                ))}
              </p>
              <figcaption id="convergence-caption" className="mt-2 text-sm font-medium text-atlas-950/75">
                Engineering solutions for sustainable futures
              </figcaption>
            </div>
          </figure>
        </div>

        <div data-reveal className="relative mt-20 overflow-hidden rounded-[1.75rem] lg:mt-28">
          <div className="aspect-[4/3] sm:aspect-[21/9]">
            <Image
              data-parallax
              src={images.theme.src}
              alt={images.theme.alt}
              width={images.theme.width}
              height={images.theme.height}
              sizes="(min-width: 1440px) 1340px, 100vw"
              className="size-full scale-110 object-cover"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-atlas-950/85 via-atlas-950/35 to-transparent" />
          <p className="absolute inset-y-0 left-0 flex max-w-lg items-end p-6 text-[clamp(1.4rem,1rem+1.6vw,2.5rem)] leading-tight font-semibold tracking-[-0.02em] sm:items-center sm:p-12">
            <span>
              Toward <span className="font-serif font-normal text-aqua-200 italic">sustainable</span> futures.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
