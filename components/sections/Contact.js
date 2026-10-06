import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { logos } from "@/data/images";
import { site } from "@/data/site";

export default function Contact() {
  const { contact, host, venue } = site;
  const hasContact = Boolean(contact.email || contact.phone);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-white py-24 sm:py-28 lg:py-36">
      <Container>
        <SectionHeader index="08" eyebrow="Contact" title="Questions about ICCISF2027?" id="contact-title" />

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-12">
          <div
            data-reveal
            className="relative isolate flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-paper p-7 ring-1 ring-atlas-100 sm:p-10 lg:col-span-7"
          >
            <div aria-hidden="true" className="absolute -top-28 -right-28 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(0,168,184,0.16),transparent)]" />
            <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-2xl bg-atlas-700 text-aqua-200">
              <Mail className="size-6" />
            </span>
            {hasContact ? (
              <div className="mt-12 space-y-2 text-xl font-semibold text-atlas-950">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="block underline decoration-atlas-200 underline-offset-4 hover:text-aqua-700">
                    {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="block hover:text-aqua-700">
                    {contact.phone}
                  </a>
                )}
              </div>
            ) : (
              <div className="mt-12">
                <p className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight font-semibold tracking-[-0.02em] text-atlas-950">
                  {contact.pendingMessage}
                </p>
                <p className="mt-4 max-w-lg leading-relaxed text-atlas-950/65">
                  An official conference email address will be published on this website once it is issued by the
                  organizing committee.
                </p>
              </div>
            )}
          </div>

          <div data-reveal className="flex flex-col rounded-[1.75rem] p-7 ring-1 ring-atlas-100 sm:p-10 lg:col-span-5">
            <h3 className="font-mono text-[0.68rem] tracking-[0.16em] text-aqua-700 uppercase">Organizing institution</h3>
            <Image
              src={logos.primary.src}
              alt={logos.primary.alt}
              width={logos.primary.width}
              height={logos.primary.height}
              sizes="12rem"
              className="mt-6 h-16 w-auto self-start"
            />
            <address className="mt-6 leading-relaxed text-atlas-950/75 not-italic">
              <span className="block font-semibold text-atlas-950">{host.school}</span>
              <span className="block">{host.name}</span>
              {venue.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={host.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 self-start rounded-full text-sm font-semibold text-atlas-700 underline decoration-atlas-200 underline-offset-4 transition-colors hover:text-aqua-700 hover:decoration-aqua-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-atlas-700"
            >
              {host.websiteLabel}
              <span className="sr-only">(opens in a new tab)</span>
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
