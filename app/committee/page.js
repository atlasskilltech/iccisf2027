import Link from "next/link";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import CommitteeGrid from "@/components/sections/CommitteeGrid";
import MemberRow from "@/components/sections/MemberRow";
import { committeeCategories, memberHref } from "@/data/committee";
import { site } from "@/data/site";
import { initials } from "@/lib/initials";

const description = `Organizing Committee, Organizing Chair, Advisory Board and technical committees of ${site.shortName}, the ${site.name}, hosted by ${site.host.name}, Mumbai.`;

export const metadata = {
  title: "Committee",
  description,
  alternates: { canonical: "/committee" },
  openGraph: {
    type: "website",
    url: "/committee",
    siteName: site.shortName,
    title: `Committee | ${site.shortName}`,
    description,
    locale: site.seo.locale,
  },
};

const count = (n) => `${n} ${n === 1 ? "member" : "members"}`;

function ChairCard({ member }) {
  return (
    <Link
      href={memberHref(member)}
      className="group relative isolate flex flex-col overflow-hidden rounded-[1.75rem] bg-atlas-700 p-7 text-white transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px] hover:shadow-atlas-700/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-atlas-700 sm:flex-row sm:items-center sm:gap-8 sm:p-9"
    >
      <span aria-hidden="true" className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(0,168,184,0.35),transparent)]" />
      <span
        aria-hidden="true"
        className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/10 font-serif text-4xl text-aqua-200 italic ring-1 ring-white/20"
      >
        {initials(member.name)}
      </span>
      <span className="mt-10 min-w-0 flex-1 sm:mt-0">
        <span className="block font-mono text-[0.68rem] tracking-[0.16em] text-aqua-200 uppercase">Organizing Chair</span>
        <span className="mt-3 block text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] break-words">{member.name}</span>
        {member.designation && <span className="mt-2 block text-atlas-100">{member.designation}</span>}
        <span className="block text-sm text-atlas-200">{[member.department, member.affiliation].filter(Boolean).join(" · ")}</span>
      </span>
      <span className="mt-8 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-aqua-200 sm:mt-0 sm:self-center">
        View profile
        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

function CategoryBody({ category }) {
  if (category.members.length === 0) {
    return (
      <p className="inline-flex items-center gap-1.5 rounded-full bg-atlas-50 px-3 py-1.5 text-sm font-medium text-atlas-600">
        <Clock aria-hidden="true" className="size-4 shrink-0" />
        {category.statusNote}
      </p>
    );
  }

  if (category.id === "organizing-chair") {
    return category.members.map((member) => <ChairCard key={member.slug} member={member} />);
  }

  return (
    <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-atlas-100 sm:p-8">
      {category.id === "organizing-committee" ? (
        <CommitteeGrid members={category.members} linked />
      ) : (
        <ul className="grid gap-x-6 sm:grid-cols-2">
          {category.members.map((member) => (
            <MemberRow key={member.slug} member={member} href={memberHref(member)} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CommitteePage() {
  return (
    <>
      <PageHero labelledBy="committee-page-title" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Committee" }]}>
        <h1
          id="committee-page-title"
          className="motion-safe:animate-lift mt-8 max-w-3xl text-[clamp(2.25rem,1.2rem+3.6vw,4.25rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance"
        >
          The committees behind <span className="font-serif font-normal text-aqua-200 italic">{site.shortName}</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-atlas-100">
          Committees of the {site.name}, hosted by {site.host.name}. Select a member to view their profile.
        </p>

        <nav aria-label="Committees" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {committeeCategories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/[0.06] px-4 text-sm font-medium text-atlas-100 ring-1 ring-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/12 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300"
                >
                  {category.title}
                  <span className="font-mono text-xs text-aqua-200 tabular-nums">{category.members.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="bg-paper py-16 sm:py-20 lg:py-28">
        <Container>
          {committeeCategories.map((category, i) => (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`${category.id}-title`}
              className="grid gap-6 border-t border-atlas-100 py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-10 lg:py-16"
            >
              <header data-reveal className="lg:col-span-4">
                <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-aqua-700 uppercase">
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-aqua-700/50" />
                  <span className="inline-flex items-center gap-1.5">
                    <Users aria-hidden="true" className="size-3.5" />
                    {category.members.length > 0 ? count(category.members.length) : "Pending"}
                  </span>
                </p>
                <h2
                  id={`${category.id}-title`}
                  className="mt-4 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight font-semibold tracking-[-0.025em] text-balance text-atlas-950"
                >
                  {category.title}
                </h2>
              </header>
              <div data-reveal className="min-w-0 lg:col-span-8">
                <CategoryBody category={category} />
              </div>
            </section>
          ))}
        </Container>
      </div>
    </>
  );
}
