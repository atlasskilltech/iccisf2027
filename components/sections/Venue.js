import Image from "next/image";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import MapEmbed from "@/components/sections/MapEmbed";
import { images } from "@/data/images";
import { site } from "@/data/site";

export default function Venue() {
  const { venue, host } = site;

  return (
    <section id="venue" aria-labelledby="venue-title" className="relative isolate overflow-hidden bg-atlas-950 text-white">
      {/* Cinematic image band */}
      <div className="relative">
        <div className="relative h-[26rem] overflow-hidden sm:h-[32rem] lg:h-[40rem]">
          <Image
            data-parallax
            src={images.venue.src}
            alt={images.venue.alt}
            width={images.venue.width}
            height={images.venue.height}
            sizes="100vw"
            className="size-full scale-110 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-atlas-950/70 via-atlas-950/30 to-atlas-950" />
        </div>
        <Container className="absolute inset-x-0 bottom-0">
          <SectionHeader index="07" eyebrow="Venue" title={`${venue.name}, ${venue.city}`} id="venue-title" tone="dark" className="pb-6">
            <p data-reveal className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-atlas-100/85 sm:text-lg">
              Hosted on the university&apos;s campus at Equinox Business Park, off the Bandra-Kurla Complex (BKC) in
              Kurla West, Mumbai.
            </p>
          </SectionHeader>
        </Container>
      </div>

      <Container className="pt-10 pb-24 sm:pb-28 lg:pt-14 lg:pb-36">
        <div className="grid gap-5 lg:grid-cols-12">
          <div data-reveal className="flex flex-col rounded-[1.75rem] bg-white/[0.05] p-7 ring-1 ring-white/10 sm:p-10 lg:col-span-5">
            <h3 className="flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.16em] text-aqua-300 uppercase">
              <MapPin aria-hidden="true" className="size-4" />
              Address
            </h3>
            <address className="mt-6 text-xl leading-relaxed not-italic sm:text-2xl">
              <span className="block font-semibold tracking-tight text-white">{venue.name}</span>
              <span className="mt-1 block text-atlas-100/85">
                {venue.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>

            <dl className="mt-8 grid gap-4 border-t border-white/10 pt-8 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[0.68rem] tracking-[0.16em] text-atlas-300 uppercase">Dates</dt>
                <dd className="mt-1.5 font-semibold">
                  <time dateTime={site.dates.start}>{site.dates.display}</time>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.68rem] tracking-[0.16em] text-atlas-300 uppercase">Host</dt>
                <dd className="mt-1.5 font-semibold">{host.school}</dd>
              </div>
            </dl>

            <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-aqua-500 px-5 text-sm font-semibold text-atlas-950 transition-colors hover:bg-aqua-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua-300"
              >
                <MapPin aria-hidden="true" className="size-4" />
                Open in Google Maps
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={host.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <Building2 aria-hidden="true" className="size-4" />
                University website
                <span className="sr-only">(opens in a new tab)</span>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

          <div data-reveal className="lg:col-span-7">
            <MapEmbed embedUrl={venue.embedUrl} title={`Map showing ${venue.name}, ${venue.city}`} />
          </div>
        </div>

        <p data-reveal className="mt-8 text-sm text-atlas-300">
          Travel and accommodation information will be announced.
        </p>
      </Container>
    </section>
  );
}
