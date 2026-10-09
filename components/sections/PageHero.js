import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";

/**
 * Compact indigo header for inner pages — same background treatment as the homepage hero.
 * `breadcrumbs`: [{ label, href? }]; the last item is the current page.
 */
export default function PageHero({ breadcrumbs, labelledBy, children }) {
  return (
    <section id="top" aria-labelledby={labelledBy} className="relative isolate overflow-hidden bg-atlas-950 pt-18 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/2 right-[-20%] size-[60rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgba(67,57,142,0.75),transparent)]" />
        <div className="absolute bottom-[-60%] left-[-25%] size-[44rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgba(0,168,184,0.16),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]" />
      </div>

      <Container className="relative py-14 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.68rem] tracking-[0.16em] text-atlas-200 uppercase">
            {breadcrumbs.map((crumb, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li key={crumb.label} className="flex min-w-0 items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="break-words text-aqua-200">
                      {crumb.label}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={crumb.href}
                        className="rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300"
                      >
                        {crumb.label}
                      </Link>
                      <ChevronRight aria-hidden="true" className="size-3 shrink-0 text-atlas-400" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        {children}
      </Container>
    </section>
  );
}
