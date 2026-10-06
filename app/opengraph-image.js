import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { site } from "@/data/site";

export const alt = `${site.shortName} — ${site.name}, ${site.dates.display}, ${site.venue.name}, ${site.venue.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time. The ATLAS logo sits on #342B7C, so the card uses that exact colour. */
export default async function OpenGraphImage() {
  const [logo, geist, serif] = await Promise.all([
    readFile(join(process.cwd(), "public/logos/atlas-skilltech-logo-reversed.png"), "base64"),
    readFile(join(process.cwd(), "assets/fonts/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/InstrumentSerif-Italic.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#342b7c",
          backgroundImage:
            "radial-gradient(circle at 92% 108%, rgba(0,168,184,0.4), transparent 42%), radial-gradient(circle at 0% 100%, rgba(18,14,48,0.9), transparent 60%)",
          color: "white",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 8, color: "#8fdfe7" }}>ICCISF2027</div>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse (Satori) requires a plain img */}
          <img src={`data:image/png;base64,${logo}`} width={176} height={90} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 54, lineHeight: 1.08, letterSpacing: -1.5, color: "rgba(255,255,255,0.9)" }}>
            International Conference on
          </div>
          <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 76, lineHeight: 1.1, color: "#8fdfe7" }}>
            Convergent Intelligence
          </div>
          <div style={{ display: "flex", fontSize: 54, lineHeight: 1.08, letterSpacing: -1.5 }}>for Sustainable Futures</div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            fontSize: 26,
            color: "#e6e4f4",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>{site.dates.display}</div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.35)" }}>·</div>
          <div style={{ display: "flex" }}>
            {site.venue.name}, {site.venue.city}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geist, weight: 600, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
      ],
    }
  );
}
