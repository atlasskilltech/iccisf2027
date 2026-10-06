import { CalendarCheck2, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { importantDates } from "@/data/dates";

const TBA = "To Be Announced";

function DateValue({ item }) {
  if (item.status === "tba" || !item.display) {
    return <span className="text-atlas-950/45">{TBA}</span>;
  }
  return (
    <span className="flex flex-col">
      {item.status === "extended" && item.previousDisplay && (
        <del className="text-sm font-normal text-atlas-950/40">{item.previousDisplay}</del>
      )}
      <time dateTime={item.date}>{item.display}</time>
    </span>
  );
}

export default function ImportantDates() {
  return (
    <section id="dates" aria-labelledby="dates-title" className="relative bg-white py-24 sm:py-28 lg:py-36">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader index="03" eyebrow="Important Dates" title="Milestones on the road to November 2027." id="dates-title" />
          <p data-reveal className="max-w-sm text-atlas-950/65 lg:pb-2 lg:text-right">
            Submission and review dates will be published here as soon as they are finalized.
          </p>
        </div>

        <ol data-reveal-group className="relative mt-16 grid gap-4 lg:mt-20 lg:grid-cols-5 lg:gap-5">
          {/* Timeline rail */}
          <span
            aria-hidden="true"
            data-rail
            className="absolute top-3 bottom-3 left-[0.5625rem] w-px origin-top bg-gradient-to-b from-atlas-200 via-atlas-200 to-aqua-500 lg:top-[0.5625rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left lg:bg-gradient-to-r"
          />
          {importantDates.map((item, i) => {
            const confirmed = item.status !== "tba";
            const highlight = item.highlight;
            return (
              <li key={item.id} data-reveal-item className="relative pl-10 lg:pt-12 lg:pl-0">
                <span
                  aria-hidden="true"
                  className={`absolute top-6 left-0 flex size-[1.125rem] items-center justify-center rounded-full ring-4 ring-white lg:top-0 ${
                    highlight ? "bg-aqua-500" : "border border-atlas-300 bg-white"
                  }`}
                >
                  {highlight && <span className="size-1.5 rounded-full bg-white" />}
                </span>
                <div
                  className={`flex h-full flex-col rounded-2xl p-6 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 ${
                    highlight
                      ? "bg-atlas-700 text-white shadow-[0_30px_60px_-30px] shadow-atlas-700/70"
                      : "bg-paper ring-1 ring-atlas-100 hover:shadow-[0_24px_50px_-30px] hover:shadow-atlas-900/30"
                  }`}
                >
                  <span className={`font-mono text-[0.68rem] tracking-[0.16em] ${highlight ? "text-aqua-200" : "text-atlas-400"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`mt-3 text-lg leading-snug font-semibold tracking-tight ${highlight ? "text-white" : "text-atlas-950"}`}>
                    {item.label}
                  </h3>
                  <p className={`mt-4 text-base font-semibold tracking-tight lg:mt-auto lg:pt-6 ${highlight ? "text-white" : ""}`}>
                    <DateValue item={item} />
                  </p>
                  <p
                    className={`mt-4 inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-medium ${
                      confirmed
                        ? highlight
                          ? "bg-white/12 text-aqua-100"
                          : "bg-aqua-50 text-aqua-800"
                        : "bg-atlas-50 text-atlas-600"
                    }`}
                  >
                    {confirmed ? (
                      <CalendarCheck2 aria-hidden="true" className="size-3.5" />
                    ) : (
                      <Clock aria-hidden="true" className="size-3.5" />
                    )}
                    {confirmed ? (item.status === "extended" ? "Extended" : "Confirmed") : "Pending"}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
