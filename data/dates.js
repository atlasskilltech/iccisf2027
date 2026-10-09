/**
 * Important dates. Update this file only — the UI renders whatever is here.
 *
 * status:
 *   "tba"       → shows "To Be Announced" (date must be null)
 *   "announced" → shows `display` with no status badge; `date` may be month-only (yyyy-mm)
 *   "confirmed" → shows `display`, with `date` (and optional `endDate`) as ISO yyyy-mm-dd
 *   "extended"  → shows `display` plus the struck-through `previousDisplay`
 *
 * Source: MOU draft "Planned Dates" (all "To be finalized"), superseded by the organizers'
 * October 2026 update announcing months only for the four paper milestones. Do not add days.
 */

export const importantDates = [
  {
    id: "cfp",
    label: "Call for Papers",
    status: "announced",
    date: "2027-01",
    display: "January 2027",
  },
  {
    id: "submission",
    label: "Paper Submission",
    status: "announced",
    date: "2027-02",
    display: "February 2027",
  },
  {
    id: "notification",
    label: "Notification of Acceptance",
    status: "announced",
    date: "2027-08",
    display: "August 2027",
  },
  {
    id: "camera-ready",
    label: "Camera-Ready Paper",
    status: "announced",
    date: "2027-09",
    display: "September 2027",
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
