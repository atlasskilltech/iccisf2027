import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionRuntime from "@/components/animations/MotionRuntime";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Theme from "@/components/sections/Theme";
import ImportantDates from "@/components/sections/ImportantDates";
import CallForPapers from "@/components/sections/CallForPapers";
import Tracks from "@/components/sections/Tracks";
import Committee from "@/components/sections/Committee";
import Venue from "@/components/sections/Venue";
import Contact from "@/components/sections/Contact";
import { buildStructuredData } from "@/lib/structuredData";

export default function HomePage() {
  const jsonLd = buildStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-atlas-700 px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:outline-2 focus:outline-offset-2 focus:outline-aqua-400"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Theme />
        <ImportantDates />
        <CallForPapers />
        <Tracks />
        <Committee />
        <Venue />
        <Contact />
      </main>
      <Footer />
      <MotionRuntime />
    </>
  );
}
