/**
 * Image registry. Every image on the site is referenced from here.
 *
 * TEMPORARY images (Phase 1): royalty-free placeholders from Unsplash
 * (Unsplash License — free to use, no attribution required). Replace them with
 * official ATLAS / conference photography by dropping a new file into
 * /public/images and updating `src`, `width`, `height` and `alt` below.
 */

export const images = {
  about: {
    src: "/images/temporary/about-fibre-optic-network.jpg",
    width: 2000,
    height: 1125,
    alt: "Close-up of glowing fibre-optic strands carrying light, representing interconnected intelligent systems",
    temporary: true,
    credit: { author: "Luke Jones", url: "https://unsplash.com/photos/tBvF46kmwBw" },
  },
  theme: {
    src: "/images/temporary/theme-solar-farm-aerial.jpg",
    width: 2000,
    height: 1125,
    alt: "Aerial view of rows of solar panels across a large solar farm, representing sustainable energy infrastructure",
    temporary: true,
    credit: { author: "Vlad Burac", url: "https://unsplash.com/photos/e5kpS6Xpg04" },
  },
  cfp: {
    src: "/images/temporary/cfp-circuit-board-macro.jpg",
    width: 2000,
    height: 1333,
    alt: "Macro photograph of a printed circuit board with surface-mounted electronic components",
    temporary: true,
    credit: { author: "Gabriel Vasiliu", url: "https://unsplash.com/photos/mrDj2_hoJOU" },
  },
  venue: {
    src: "/images/temporary/venue-mumbai-worli-skyline.jpg",
    width: 2000,
    height: 1125,
    alt: "Mumbai skyline seen from Worli Sea Face, with high-rise towers along the Arabian Sea coast",
    temporary: true,
    credit: { author: "Drone Master", url: "https://unsplash.com/photos/qrj4LiT9NRQ" },
  },
};

/** Official ATLAS SkillTech University logo files (resized copies of the files in /ref). */
export const logos = {
  primary: { src: "/logos/atlas-skilltech-logo.png", width: 960, height: 431, alt: "ATLAS SkillTech University" },
  reversed: { src: "/logos/atlas-skilltech-logo-reversed.png", width: 960, height: 493, alt: "ATLAS SkillTech University" },
  schools: {
    src: "/logos/atlas-schools-logo.png",
    width: 1097,
    height: 133,
    alt: "ATLAS SkillTech University — ISDI, ISME, uGDX and LAW",
  },
  mark: { src: "/logos/atlas-mark.png", width: 256, height: 256, alt: "ATLAS SkillTech University emblem" },
};
