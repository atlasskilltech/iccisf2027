import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { logos } from "@/data/images";
import { navigation, site } from "@/data/site";

/** Solid atlas-700 (#342B7C) — identical to the reversed logo's own background, so no gradients here. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-labelledby="footer-title" className="relative isolate overflow-hidden bg-atlas-700 text-white">
      <Container className="pt-20 pb-10 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="footer-title" className="text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] leading-none font-semibold tracking-[-0.04em]">
              ICCISF<span className="font-serif font-normal text-aqua-200 italic">2027</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-atlas-100">{site.name}</p>
            <p className="mt-6 font-semibold">
              <time dateTime={site.dates.start}>{site.dates.display}</time>
            </p>
            <p className="text-atlas-200">
              {site.venue.name}, {site.venue.city}, {site.venue.country}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h3 className="font-mono text-[0.68rem] tracking-[0.16em] text-aqua-200 uppercase">Explore</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-atlas-100 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h3 className="font-mono text-[0.68rem] tracking-[0.16em] text-aqua-200 uppercase">Organized by</h3>
            <Image
              src={logos.reversed.src}
              alt={logos.reversed.alt}
              width={logos.reversed.width}
              height={logos.reversed.height}
              sizes="14rem"
              className="-ml-3 mt-3 h-24 w-auto"
            />
            <address className="mt-3 text-sm leading-relaxed text-atlas-100 not-italic">
              <span className="block">{site.host.school}</span>
              {site.venue.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={site.host.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-aqua-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {site.host.websiteLabel}
              <span className="sr-only">(opens in a new tab)</span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 text-sm text-atlas-200 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>© {year} {site.host.name}. All rights reserved.</p>
            <p className="text-atlas-300">{site.disclaimer}</p>
          </div>
          <a
            href="#top"
            className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full px-4 font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:self-auto"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
