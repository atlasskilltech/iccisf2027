import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import { committeeMembers, getCategory, getMember } from "@/data/committee";
import { site } from "@/data/site";
import { initials } from "@/lib/initials";

// Only published members have profiles; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return committeeMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) return {};
  const category = getCategory(member.category);
  const title = `${member.name} — ${category.title}`;
  const description = `${[member.name, member.designation, member.affiliation].filter(Boolean).join(", ")}. ${category.title}, ${site.shortName}.`;
  return {
    title,
    description,
    alternates: { canonical: `/committee/${slug}` },
    openGraph: {
      type: "profile",
      url: `/committee/${slug}`,
      siteName: site.shortName,
      title: `${title} | ${site.shortName}`,
      description,
      locale: site.seo.locale,
    },
  };
}

export default async function MemberPage({ params }) {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) notFound();
  const category = getCategory(member.category);
  const categoryHref = `/committee#${category.id}`;

  const details = [
    { label: "Committee", value: category.title, href: categoryHref },
    { label: "Designation", value: member.designation },
    { label: "Department", value: member.department },
    { label: "Affiliation", value: member.affiliation },
  ].filter((item) => item.value);

  return (
    <>
      <PageHero
        labelledBy="member-name"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Committee", href: "/committee" }, { label: member.name }]}
      >
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center">
          <span
            aria-hidden="true"
            className="flex size-24 shrink-0 items-center justify-center rounded-full bg-white/10 font-serif text-5xl text-aqua-200 italic ring-1 ring-white/20 sm:size-28"
          >
            {initials(member.name)}
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-aqua-200 uppercase">{category.title}</p>
            <h1
              id="member-name"
              className="motion-safe:animate-lift mt-3 text-[clamp(2rem,1.3rem+2.8vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.03em] break-words text-balance"
            >
              {member.name}
            </h1>
            {member.designation && <p className="mt-3 text-lg text-atlas-100">{member.designation}</p>}
            {(member.department || member.affiliation) && (
              <p className="text-atlas-200">{[member.department, member.affiliation].filter(Boolean).join(" · ")}</p>
            )}
          </div>
        </div>
      </PageHero>

      <div className="bg-paper py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <dl className="rounded-[1.75rem] bg-white p-6 ring-1 ring-atlas-100 sm:p-8">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 border-t border-atlas-100 py-4 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-[0.68rem] tracking-[0.16em] text-atlas-400 uppercase sm:pt-1">{item.label}</dt>
                  <dd className="min-w-0 font-semibold tracking-tight break-words text-atlas-950">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="rounded-sm underline decoration-atlas-200 underline-offset-4 transition-colors hover:text-aqua-700 hover:decoration-aqua-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-700"
                      >
                        {item.value}
                      </Link>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href={categoryHref}
              className="group mt-10 inline-flex min-h-12 items-center gap-2.5 rounded-full px-6 text-sm font-semibold tracking-tight text-atlas-800 ring-1 ring-atlas-200 ring-inset transition-[background-color,box-shadow,color] duration-300 hover:bg-atlas-50 hover:ring-atlas-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-atlas-700"
            >
              <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-x-1" />
              Back to Committee
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
