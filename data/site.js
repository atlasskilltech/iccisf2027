/**
 * Central site configuration — the single source of truth for conference identity,
 * dates, venue, host institution and SEO.
 *
 * Source documents (kept under /ref, never deployed):
 *   - ATLAS_IEEE2027_TCS_MOU_Draft.docx  (internal draft, not yet approved by IEEE)
 *   - Conference_Committee_Tracker.xlsx
 *   - Organizer email "Request for Domain Registration and Initial Website Development"
 *
 * To change the production domain, set NEXT_PUBLIC_SITE_URL or edit `url` below.
 */

export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://iccisf2027.com").replace(/\/$/, ""),

  shortName: "ICCISF2027",
  name: "International Conference on Convergent Intelligence for Sustainable Futures",
  edition: "2027",

  /**
   * IEEE branding is withheld until Technical Co-Sponsorship is approved.
   * The MOU draft's official title is "IEEE 2027 International Conference on Convergent
   * Intelligence for Sustainable Futures", acronym "IEEE ATLAS-ICCISF2027". The email uses
   * "IEEE ICCISF2027". Neither is rendered while `ieeeApproved` is false.
   */
  ieeeApproved: false,
  pendingOfficialTitle: "IEEE 2027 International Conference on Convergent Intelligence for Sustainable Futures",
  pendingOfficialAcronym: "IEEE ATLAS-ICCISF2027",

  nature: "International Conference",

  dates: {
    start: "2027-11-26",
    end: "2027-11-27",
    display: "26–27 November 2027",
    short: "26–27 Nov 2027",
  },

  venue: {
    name: "ATLAS SkillTech University",
    street: "Equinox Business Park, Off Bandra-Kurla Complex (BKC)",
    locality: "Kurla West",
    city: "Mumbai",
    postalCode: "400070",
    region: "Maharashtra",
    country: "India",
    countryCode: "IN",
    lines: [
      "Equinox Business Park,",
      "Off Bandra-Kurla Complex (BKC),",
      "Kurla West, Mumbai – 400070,",
      "Maharashtra, India",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=ATLAS+SkillTech+University+Equinox+Business+Park+Kurla+West+Mumbai",
    embedUrl:
      "https://www.google.com/maps?q=ATLAS+SkillTech+University,+Equinox+Business+Park,+Kurla+West,+Mumbai&output=embed",
  },

  host: {
    name: "ATLAS SkillTech University",
    school: "UGDx School of Technology",
    website: "https://atlasuniversity.edu.in",
    websiteLabel: "atlasuniversity.edu.in",
  },

  /** No conference-specific contact has been issued yet. Do not invent one. */
  contact: {
    email: null,
    phone: null,
    pendingMessage: "Conference contact details will be announced.",
  },

  statusNote: "Initial website — conference details will be updated as planning progresses.",
  disclaimer: "Conference information is provisional and subject to change as planning progresses.",

  seo: {
    title: "ICCISF2027 — International Conference on Convergent Intelligence for Sustainable Futures",
    description:
      "ICCISF2027, the International Conference on Convergent Intelligence for Sustainable Futures, will be held on 26–27 November 2027 at ATLAS SkillTech University, BKC, Mumbai. Explore the conference theme, tracks and important dates.",
    keywords: [
      "ICCISF2027",
      "ICCISF 2027",
      "Convergent Intelligence for Sustainable Futures",
      "international conference 2027",
      "Mumbai conference 2027",
      "ATLAS SkillTech University",
      "UGDx School of Technology",
      "artificial intelligence conference",
      "machine learning conference",
      "robotics conference",
      "VLSI conference",
      "wireless communications conference",
      "call for papers 2027",
    ],
    locale: "en_IN",
  },
};

/**
 * Primary navigation. `#hash` items scroll to homepage sections; `/path` items are pages.
 * `section` lets a page item also highlight while its homepage section is in view.
 */
export const navigation = [
  { label: "About", href: "#about" },
  { label: "Theme", href: "#theme" },
  { label: "Dates", href: "#dates" },
  { label: "Call for Papers", href: "#call-for-papers" },
  { label: "Tracks", href: "#tracks" },
  { label: "Committee", href: "/committee", section: "#committee" },
  { label: "Venue", href: "#venue" },
  { label: "Contact", href: "#contact" },
];
