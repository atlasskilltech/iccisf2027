import { site } from "@/data/site";
import { committeeMembers } from "@/data/committee";

/** Add new routes here as pages are introduced. */
export default function sitemap() {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/committee`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...committeeMembers.map((member) => ({
      url: `${site.url}/committee/${member.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    })),
  ];
}
