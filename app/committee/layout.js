import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionRuntime from "@/components/animations/MotionRuntime";

/** Shared chrome for /committee and every /committee/[slug] profile. */
export default function CommitteeLayout({ children }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-atlas-700 px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:outline-2 focus:outline-offset-2 focus:outline-aqua-400"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer linkPrefix="/" />
      <MotionRuntime />
    </>
  );
}
