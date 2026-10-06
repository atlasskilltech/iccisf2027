import Image from "next/image";
import { Hourglass } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ButtonLink from "@/components/ui/ButtonLink";
import { callForPapers } from "@/data/content";
import { images } from "@/data/images";
import { tracks } from "@/data/tracks";

export default function CallForPapers() {
  return (
    <section
      id="call-for-papers"
      aria-labelledby="cfp-title"
      className="relative bg-paper py-24 sm:py-28 lg:py-36"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:py-6">
            <SectionHeader index="04" eyebrow={callForPapers.eyebrow} title={callForPapers.heading} id="cfp-title" />
            <p data-reveal className="mt-8 max-w-[60ch] text-[1.0625rem] leading-relaxed text-atlas-950/75 sm:text-lg">
              {callForPapers.intro}
            </p>

            <div
              data-reveal
              role="note"
              className="mt-10 rounded-2xl border border-aqua-200 bg-aqua-50/70 p-6 sm:p-7"
            >
              <p className="flex items-start gap-3 font-semibold tracking-tight text-atlas-950">
                <Hourglass aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-aqua-700" />
                {callForPapers.pending}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2 pl-8">
                {callForPapers.upcoming.map((item) => (
                  <li key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-atlas-700 ring-1 ring-atlas-100">
                    {item} <span className="text-atlas-400">· to be announced</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal className="mt-10 flex flex-col gap-3 min-[420px]:flex-row">
              <ButtonLink href="#tracks" variant="dark">
                Browse the {tracks.length} tracks
              </ButtonLink>
              <ButtonLink href="#dates" variant="ghost" arrow={false}>
                Important Dates
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-6">
            <figure data-reveal className="relative h-full overflow-hidden rounded-[1.75rem] bg-atlas-950">
              <div className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[36rem]">
                <Image
                  data-parallax
                  src={images.cfp.src}
                  alt={images.cfp.alt}
                  width={images.cfp.width}
                  height={images.cfp.height}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="size-full scale-110 object-cover opacity-80"
                />
              </div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-atlas-950 via-atlas-950/50 to-atlas-950/10" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
                <span
                  data-count={tracks.length}
                  data-count-pad={2}
                  className="block font-serif text-[clamp(4rem,3rem+5vw,7.5rem)] leading-none text-aqua-200 tabular-nums italic"
                >
                  {String(tracks.length).padStart(2, "0")}
                </span>
                <span className="mt-2 block text-lg font-semibold tracking-tight">Indicative research tracks</span>
                <ul className="mt-5 hidden flex-wrap gap-x-4 gap-y-1.5 text-sm text-white/70 sm:flex">
                  {tracks.map((track) => (
                    <li key={track.slug}>
                      <a
                        href={`#track-${track.slug}`}
                        className="rounded transition-colors hover:text-aqua-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300"
                      >
                        {track.shortTitle.split(/,| &/)[0]}
                      </a>
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
