import { Users } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import CommitteeGrid from "@/components/sections/CommitteeGrid";
import { committeeNote, organizingChair, organizingCommittee } from "@/data/committee";
import { initials } from "@/lib/initials";

export default function Committee() {
  return (
    <section id="committee" aria-labelledby="committee-title" className="relative bg-paper py-24 sm:py-28 lg:py-36">
      <Container>
        <SectionHeader index="06" eyebrow="Organizing Committee" title="The team bringing ICCISF2027 together." id="committee-title" />

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-12">
          {/* Organizing Chair */}
          <article
            data-reveal
            aria-labelledby="chair-name"
            className="relative isolate flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-atlas-700 p-7 text-white sm:p-9 lg:sticky lg:top-28 lg:col-span-4 lg:min-h-[26rem] lg:self-start"
          >
            <div aria-hidden="true" className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(0,168,184,0.35),transparent)]" />
            <span
              aria-hidden="true"
              className="flex size-20 items-center justify-center rounded-full bg-white/10 font-serif text-4xl text-aqua-200 italic ring-1 ring-white/20"
            >
              {initials(organizingChair.name)}
            </span>
            <div className="mt-16">
              <p className="font-mono text-[0.68rem] tracking-[0.16em] text-aqua-200 uppercase">{organizingChair.role}</p>
              <h3 id="chair-name" className="mt-3 text-[1.75rem] leading-tight font-semibold tracking-[-0.02em]">
                {organizingChair.name}
              </h3>
              <p className="mt-2 text-atlas-100">{organizingChair.designation}</p>
              <p className="text-sm text-atlas-200">{organizingChair.institution}</p>
            </div>
          </article>

          {/* Members */}
          <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-atlas-100 sm:p-8 lg:col-span-8">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-atlas-950">
              <Users aria-hidden="true" className="size-5 text-aqua-700" />
              Committee Members
            </h3>
            <CommitteeGrid members={organizingCommittee} />
          </div>
        </div>

        <p data-reveal role="note" className="mt-10 max-w-2xl text-sm leading-relaxed text-atlas-950/60">
          {committeeNote}
        </p>
      </Container>
    </section>
  );
}
