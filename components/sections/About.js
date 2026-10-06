import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { about } from "@/data/content";
import { images, logos } from "@/data/images";
import { site } from "@/data/site";

export default function About() {
  const facts = [
    { label: "Format", value: site.nature },
    { label: "Dates", value: site.dates.display, dateTime: site.dates.start },
    { label: "Venue", value: `${site.venue.name}, BKC, ${site.venue.city}` },
    { label: "Host school", value: site.host.school },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-paper py-24 sm:py-28 lg:py-36">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader index="01" eyebrow={about.eyebrow} title={about.heading} id="about-title" />
            <div className="mt-8 max-w-[62ch] space-y-5 text-[1.0625rem] leading-relaxed text-atlas-950/75 sm:text-lg">
              {about.paragraphs.map((text) => (
                <p key={text} data-reveal>
                  {text}
                </p>
              ))}
            </div>

            <dl data-reveal-group className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-atlas-100 ring-1 ring-atlas-100 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} data-reveal-item className="bg-paper p-6">
                  <dt className="font-mono text-[0.68rem] tracking-[0.16em] text-aqua-700 uppercase">{fact.label}</dt>
                  <dd className="mt-2 font-semibold tracking-tight text-atlas-950">
                    {fact.dateTime ? <time dateTime={fact.dateTime}>{fact.value}</time> : fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <figure data-reveal className="relative overflow-hidden rounded-[1.75rem] bg-atlas-900 shadow-[0_40px_80px_-40px] shadow-atlas-900/50">
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
                <Image
                  data-parallax
                  src={images.about.src}
                  alt={images.about.alt}
                  width={images.about.width}
                  height={images.about.height}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="size-full scale-110 object-cover"
                />
              </div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-atlas-950/80 via-atlas-950/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-sm text-white/85 sm:p-8">
                <span className="block font-mono text-[0.68rem] tracking-[0.16em] text-aqua-200 uppercase">Convergence</span>
                <span className="mt-2 block max-w-xs text-base font-medium text-white">
                  Intelligence, hardware and interconnected infrastructure — on one forum.
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Host institution */}
        <article
          data-reveal
          aria-labelledby="institution-title"
          className="mt-20 grid gap-10 rounded-[1.75rem] bg-white p-7 ring-1 ring-atlas-100 sm:p-10 lg:mt-28 lg:grid-cols-12 lg:gap-16 lg:p-14"
        >
          <div className="lg:col-span-4">
            <Image
              src={logos.schools.src}
              alt={logos.schools.alt}
              width={logos.schools.width}
              height={logos.schools.height}
              sizes="(min-width: 1024px) 24rem, 90vw"
              className="h-auto w-full max-w-sm"
            />
          </div>
          <div className="lg:col-span-8">
            <h3 id="institution-title" className="text-2xl font-semibold tracking-[-0.02em] text-atlas-950 sm:text-3xl">
              {about.institution.heading}
            </h3>
            <div className="mt-5 max-w-[65ch] space-y-4 leading-relaxed text-atlas-950/75">
              {about.institution.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <a
              href={site.host.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-atlas-700 underline decoration-atlas-200 underline-offset-4 transition-colors hover:text-aqua-700 hover:decoration-aqua-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-atlas-700"
            >
              Visit {site.host.websiteLabel}
              <span className="sr-only">(opens in a new tab)</span>
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </article>
      </Container>
    </section>
  );
}
