/**
 * Important dates. Update this file only — the UI renders whatever is here.
 *
 * status:
 *   "tba"       → shows "To Be Announced" (date must be null)
 *   "confirmed" → shows `display`, with `date` (and optional `endDate`) as ISO yyyy-mm-dd
 *   "extended"  → shows `display` plus the struck-through `previousDisplay`
 *
 * Source: MOU draft "Planned Dates" — every milestone is "To be finalized" as of Oct 2026.
 */

export const importantDates = [
  {
    id: "cfp",
    label: "Call for Papers",
    status: "tba",
    date: null,
    display: null,
  },
  {
    id: "submission",
    label: "Paper Submission",
    status: "tba",
    date: null,
    display: null,
  },
  {
    id: "notification",
    label: "Notification of Acceptance",
    status: "tba",
    date: null,
    display: null,
  },
  {
    id: "camera-ready",
    label: "Camera-Ready Paper",
    status: "tba",
    date: null,
    display: null,
  },
  {
    id: "conference",
    label: "Conference",
    status: "confirmed",
    date: "2027-11-26",
    endDate: "2027-11-27",
    display: "26–27 November 2027",
    highlight: true,
  },
];
