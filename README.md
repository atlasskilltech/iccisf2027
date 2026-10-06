# ICCISF2027 — Conference Website (Phase 1)

International Conference on Convergent Intelligence for Sustainable Futures · 26–27 November 2027 ·
ATLAS SkillTech University, Mumbai. Production domain: https://iccisf2027.com

Next.js 16 (App Router, JavaScript only) · Tailwind CSS v4 · GSAP + ScrollTrigger · Motion · Lenis

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes are static)
npm run start    # serve the production build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` to override the canonical domain (defaults to `https://iccisf2027.com`).

## Updating content — edit `/data`, not components

| Change | File |
|---|---|
| Title, dates, venue, host, contact email, SEO text, navigation | `data/site.js` |
| Important dates (`tba` → `confirmed` / `extended`) | `data/dates.js` |
| Tracks and subtopics | `data/tracks.js` |
| Organizing chair, committee, future committees | `data/committee.js` |
| About / Theme / Call for Papers copy | `data/content.js` |
| Images and logos (temporary images are flagged) | `data/images.js` |

- **Contact:** set `site.contact.email` and the Contact section switches from "will be announced" to the address.
- **IEEE branding:** withheld while `site.ieeeApproved` is `false`. Do not add IEEE logos or sponsorship claims until TCS approval.
- **Temporary images** live in `public/images/temporary/` (Unsplash License). Replace the file and update `data/images.js`.
- **New sections/pages:** add a component in `components/sections/`, a nav item in `data/site.js`, and (for new routes) an entry in `app/sitemap.js`.

## Structure

```
app/            layout (metadata, fonts), page, sitemap, robots, manifest, OG/Twitter images, icons
components/
  layout/       Header (client: scroll-spy, mobile menu), Footer
  sections/     one server component per section (+ small client islands: TracksGrid, CommitteeGrid, MapEmbed)
  animations/   MotionRuntime (GSAP/ScrollTrigger/Lenis, lazy-loaded), ConvergenceSphere (Canvas 2D hero)
  ui/           Container, SectionHeader, ButtonLink, Icon
data/           all conference content
lib/            scroll helpers, structured data, initials
public/         logos/, images/
assets/fonts/   fonts used only to render the Open Graph image
ref/            reference material — NOT deployed, git-ignored (contains private contact data)
```

## Animation & performance notes

- Sections are server components; animations attach via `data-reveal`, `data-parallax`, `data-draw`,
  `data-rail`, `data-count` attributes handled by one client island (`MotionRuntime`).
- GSAP, ScrollTrigger and Lenis are dynamically imported after hydration and skipped entirely for
  `prefers-reduced-motion: reduce`. Lenis runs for mouse/trackpad users only.
- Content is visible in the server HTML; only below-the-fold elements are faded in.
- Google Maps loads only on request (click-to-load facade).
