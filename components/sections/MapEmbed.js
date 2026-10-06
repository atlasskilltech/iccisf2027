"use client";

import { useState } from "react";
import { MapPin, MousePointerClick } from "lucide-react";

/**
 * Click-to-load map facade: Google Maps (heavy third-party JS + cookies) is only
 * requested when the visitor asks for it. Dimensions are reserved — no layout shift.
 */
export default function MapEmbed({ embedUrl, title }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-atlas-900 ring-1 ring-white/10 lg:aspect-auto lg:h-full lg:min-h-[28rem]">
      {loaded ? (
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[2.5rem_2.5rem]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,168,184,0.25),transparent_55%)]" />
          <div className="relative flex size-full flex-col items-center justify-center gap-6 p-6 text-center">
            <span aria-hidden="true" className="relative flex size-16 items-center justify-center rounded-full bg-aqua-500 text-atlas-950 shadow-[0_0_0_10px] shadow-aqua-500/15">
              <MapPin className="size-7" />
            </span>
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white px-6 text-sm font-semibold text-atlas-950 transition-colors hover:bg-aqua-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <MousePointerClick aria-hidden="true" className="size-4" />
              Load interactive map
            </button>
            <p className="max-w-xs text-xs text-atlas-200">Loads content from Google Maps.</p>
          </div>
        </>
      )}
    </div>
  );
}
