"use client";

import { useCallback, useEffect, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { Plus } from "lucide-react";
import Icon from "@/components/ui/Icon";

const PREVIEW = 3;

/**
 * Interactive track cards. Every subtopic is server-rendered; collapsed ones are
 * height-animated to 0 and made `inert`, so they stay in the HTML for search
 * engines while being skipped by keyboard and screen readers until expanded.
 */
export default function TracksGrid({ tracks }) {
  const [open, setOpen] = useState(() => new Set());
  const allOpen = open.size === tracks.length;

  const toggle = useCallback((slug) => {
    setOpen((current) => {
      const next = new Set(current);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }, []);

  // Deep links such as #track-robotics open the matching card.
  useEffect(() => {
    const openFromHash = () => {
      const slug = window.location.hash.replace("#track-", "");
      if (tracks.some((track) => track.slug === slug)) {
        setOpen((current) => new Set(current).add(slug));
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [tracks]);

  // Pointer-following highlight, written straight to CSS variables (no re-renders).
  const onPointerMove = (event) => {
    const card = event.target.closest("[data-track-card]");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="mt-14 flex justify-end lg:mt-16">
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(tracks.map((track) => track.slug)))}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-atlas-100 ring-1 ring-white/15 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300"
          >
            {allOpen ? "Collapse all tracks" : "Expand all tracks"}
          </button>
        </div>

        <ol
          data-reveal-group
          onPointerMove={onPointerMove}
          className="mt-5 grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3"
        >
          {tracks.map((track) => {
            const isOpen = open.has(track.slug);
            const extra = track.subtopics.slice(PREVIEW);
            const panelId = `track-${track.slug}-more`;
            return (
              <li
                key={track.slug}
                id={`track-${track.slug}`}
                data-reveal-item
                data-track-card
                className={`group relative flex scroll-mt-28 flex-col overflow-hidden rounded-2xl p-6 ring-1 transition-[background-color,box-shadow] duration-500 sm:p-7 ${
                  isOpen
                    ? "bg-white/[0.08] ring-aqua-300/45 shadow-[0_30px_60px_-30px] shadow-black/60"
                    : "bg-white/[0.035] ring-white/10 hover:bg-white/[0.06] hover:ring-white/20"
                }`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(22rem_circle_at_var(--x,50%)_var(--y,0%),rgba(79,203,215,0.12),transparent_60%)]"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className={`flex size-12 items-center justify-center rounded-xl ring-1 transition-colors duration-500 ${
                      isOpen ? "bg-aqua-500 text-atlas-950 ring-aqua-300" : "bg-aqua-500/10 text-aqua-200 ring-aqua-300/25"
                    }`}
                  >
                    <Icon name={track.icon} className="size-[1.375rem]" strokeWidth={1.6} />
                  </span>
                  <span aria-hidden="true" className="font-mono text-sm tracking-[0.12em] text-atlas-300 tabular-nums">
                    {String(track.number).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-6 text-lg leading-snug font-semibold tracking-tight text-white sm:text-xl">
                  <span className="sr-only">Track {track.number}: </span>
                  {track.title}
                </h3>

                <ul className="relative mt-5 space-y-2.5 text-[0.9375rem] leading-snug text-atlas-100/80">
                  {track.subtopics.slice(0, PREVIEW).map((topic) => (
                    <li key={topic} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.55em] size-1 shrink-0 rounded-full bg-aqua-300" />
                      {topic}
                    </li>
                  ))}
                </ul>
                {extra.length > 0 && (
                  <m.div
                    id={panelId}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    inert={!isOpen}
                    className="relative overflow-hidden"
                  >
                    <ul className="space-y-2.5 pt-2.5 text-[0.9375rem] leading-snug text-atlas-100/80">
                      {extra.map((topic) => (
                        <li key={topic} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.55em] size-1 shrink-0 rounded-full bg-aqua-300" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </m.div>
                )}

                {extra.length > 0 && (
                  <button
                    type="button"
                    onClick={() => toggle(track.slug)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="relative mt-auto inline-flex min-h-11 items-center gap-2.5 self-start rounded-full pt-6 text-sm font-semibold text-aqua-200 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua-300"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-7 items-center justify-center rounded-full ring-1 ring-aqua-300/40 transition-transform duration-500 ease-out-expo group-hover:ring-aqua-300"
                    >
                      <Plus className={`size-3.5 transition-transform duration-500 ease-out-expo ${isOpen ? "rotate-45" : ""}`} />
                    </span>
                    {isOpen ? "Show fewer" : `Show all ${track.subtopics.length} subtopics`}
                    <span className="sr-only"> for {track.shortTitle}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </MotionConfig>
    </LazyMotion>
  );
}
