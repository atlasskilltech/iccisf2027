import { Info } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import TracksGrid from "@/components/sections/TracksGrid";
import { tracks, tracksNote } from "@/data/tracks";

export default function Tracks() {
  const subtopicCount = tracks.reduce((sum, track) => sum + track.subtopics.length, 0);

  return (
    <section
      id="tracks"
      aria-labelledby="tracks-title"
      className="relative isolate overflow-hidden bg-atlas-950 py-24 text-white sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-[-10%] size-[46rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgba(52,43,124,0.9),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[4.5rem_100%] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      </div>

      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index="05"
            eyebrow="Conference Tracks"
            title={`${tracks.length} tracks. ${subtopicCount} research directions.`}
            id="tracks-title"
            tone="dark"
          />
          <p data-reveal role="note" className="flex max-w-md items-start gap-3 text-sm leading-relaxed text-atlas-200 lg:pb-2">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-aqua-300" />
            {tracksNote}
          </p>
        </div>

        <TracksGrid tracks={tracks} />
      </Container>
    </section>
  );
}
