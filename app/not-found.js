import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/data/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-dvh items-center overflow-hidden bg-atlas-950 px-5 py-24 text-white sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 size-[50rem] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(67,57,142,0.7),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      </div>
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-sm tracking-[0.3em] text-aqua-300">404</p>
        <h1 className="mt-6 text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-tight font-semibold tracking-[-0.03em] text-balance">
          This page could not be <span className="font-serif font-normal text-aqua-200 italic">found</span>.
        </h1>
        <p className="mt-5 text-atlas-200">
          The {site.shortName} website is in its initial phase — more pages will be added as planning progresses.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-aqua-500 px-6 text-sm font-semibold text-atlas-950 transition-colors hover:bg-aqua-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua-300"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to {site.shortName}
        </Link>
      </div>
    </main>
  );
}
