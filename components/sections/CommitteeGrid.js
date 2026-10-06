"use client";

import { useMemo, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { initials } from "@/lib/initials";

/** Department filter + member list. The full list is server-rendered ("All"). */
export default function CommitteeGrid({ members }) {
  const [filter, setFilter] = useState("All");
  // Only animate after the first interaction so server HTML is never hidden.
  const [interacted, setInteracted] = useState(false);

  const filters = useMemo(() => {
    const counts = members.reduce((acc, member) => {
      acc[member.department] = (acc[member.department] || 0) + 1;
      return acc;
    }, {});
    return [{ label: "All", count: members.length }, ...Object.entries(counts).map(([label, count]) => ({ label, count }))];
  }, [members]);

  const visible = filter === "All" ? members : members.filter((member) => member.department === filter);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div role="group" aria-label="Filter committee members by department" className="mt-6 flex flex-wrap gap-2">
          {filters.map(({ label, count }) => {
            const active = filter === label;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setInteracted(true);
                  setFilter(label);
                }}
                className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-700 ${
                  active ? "bg-atlas-700 text-white" : "bg-paper text-atlas-800 ring-1 ring-atlas-100 hover:bg-atlas-50"
                }`}
              >
                {label}
                <span className={`font-mono text-xs tabular-nums ${active ? "text-aqua-200" : "text-atlas-400"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="sr-only">
          Showing {visible.length} {filter === "All" ? "" : filter} committee members
        </p>

        <m.ul
          key={filter}
          initial={interacted ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 grid gap-x-6 sm:grid-cols-2"
        >
          {visible.map((member) => (
            <li key={member.name} className="group flex items-center gap-4 border-t border-atlas-100 py-4">
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-atlas-50 font-mono text-xs font-semibold tracking-wider text-atlas-700 ring-1 ring-atlas-100 transition-colors duration-300 group-hover:bg-aqua-500 group-hover:text-atlas-950 group-hover:ring-aqua-500"
              >
                {initials(member.name)}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold tracking-tight text-atlas-950">{member.name}</span>
                <span className="block text-sm text-atlas-950/60">
                  {member.designation} · {member.department}
                </span>
              </span>
            </li>
          ))}
        </m.ul>
      </MotionConfig>
    </LazyMotion>
  );
}
