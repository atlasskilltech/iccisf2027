"use client";

import { useEffect } from "react";
import { scrollToHash, setLenis } from "@/lib/scroll";

/**
 * The only global animation island. Renders nothing.
 *
 * - In-page anchor links → smooth scroll with focus management (always on).
 * - GSAP + ScrollTrigger and Lenis are code-split and imported after hydration,
 *   only when the visitor has not asked for reduced motion.
 *
 * Content is fully visible in the server HTML. Only elements that start below the
 * fold are faded in (opacity/transform only — no layout shift), so nothing above
 * the fold flashes and crawlers always see the content.
 *
 * Hooks used by server components:
 *   data-reveal / data-reveal-item  fade-up on scroll (batched, staggered)
 *   data-parallax                   subtle scrubbed image drift
 *   data-draw                       SVG stroke draw-in
 *   data-rail                       timeline rail grows in
 *   data-count (+ data-count-pad)   number counts up once
 */
export default function MotionRuntime() {
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;
      if (scrollToHash(link.getAttribute("href"))) event.preventDefault();
    };
    document.addEventListener("click", onClick);

    let cancelled = false;
    let teardown = () => {};

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      (async () => {
        const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        // Smooth scrolling for mouse/trackpad users only; touch keeps native scrolling.
        let lenis = null;
        let tick = null;
        if (window.matchMedia("(pointer: fine)").matches) {
          lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
          setLenis(lenis);
          lenis.on("scroll", ScrollTrigger.update);
          tick = (time) => lenis.raf(time * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
        }

        const belowFold = (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9;
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
          // Reveals
          const revealables = gsap.utils.toArray("[data-reveal], [data-reveal-item]").filter(belowFold);
          gsap.set(revealables, { opacity: 0, y: 28 });
          ScrollTrigger.batch(revealables, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07, overwrite: true }),
          });

          // Image drift
          gsap.utils.toArray("[data-parallax]").forEach((img) => {
            gsap.fromTo(
              img,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: "none",
                scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
              }
            );
          });

          // SVG connectors
          gsap.utils.toArray("[data-draw]").forEach((path) => {
            const length = path.getTotalLength();
            gsap.fromTo(
              path,
              { strokeDasharray: length, strokeDashoffset: length },
              {
                strokeDashoffset: 0,
                duration: 1.4,
                ease: "power2.inOut",
                scrollTrigger: { trigger: path.closest("svg"), start: "top 85%", once: true },
              }
            );
          });

          // Count-up numbers (only those that start off-screen, so nothing visibly resets)
          gsap.utils.toArray("[data-count]").filter(belowFold).forEach((el) => {
            const target = Number(el.dataset.count);
            const pad = Number(el.dataset.countPad || 0);
            const format = (value) => String(Math.round(value)).padStart(pad, "0");
            const state = { value: 0 };
            el.textContent = format(0);
            gsap.to(state, {
              value: target,
              duration: 1.4,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
              onUpdate: () => {
                el.textContent = format(state.value);
              },
              onComplete: () => {
                el.textContent = format(target);
              },
            });
          });
        });

        // Timeline rail grows along its own axis.
        mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, ({ conditions }) => {
          gsap.utils.toArray("[data-rail]").forEach((rail) => {
            gsap.from(rail, {
              [conditions.desktop ? "scaleX" : "scaleY"]: 0,
              duration: 1.6,
              ease: "expo.out",
              scrollTrigger: { trigger: rail.parentElement, start: "top 85%", once: true },
            });
          });
        });

        teardown = () => {
          ctx.revert();
          mm.revert();
          if (tick) gsap.ticker.remove(tick);
          lenis?.destroy();
          setLenis(null);
        };
      })();
    }

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      teardown();
    };
  }, []);

  return null;
}
