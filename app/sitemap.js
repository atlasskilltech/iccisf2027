import { site } from "@/data/site";

/** Phase 1 is a single page. Add new routes here as pages are introduced. */
export default function sitemap() {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
