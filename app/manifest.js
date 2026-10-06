import { site } from "@/data/site";

export default function manifest() {
  return {
    name: `${site.shortName} — ${site.name}`,
    short_name: site.shortName,
    description: site.seo.description,
    start_url: "/",
    display: "browser",
    background_color: "#f6f5f1",
    theme_color: "#120e30",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
