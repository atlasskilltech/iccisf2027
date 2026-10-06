"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { navigation, site } from "@/data/site";
import { logos } from "@/data/images";
import { lockScroll, scrollToHash } from "@/lib/scroll";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Elevated style once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section crossing the middle of the viewport.
  useEffect(() => {
    const sections = ["#top", ...navigation.map((item) => item.href)]
      .map((href) => document.querySelector(href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? null : `#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: scroll lock, Escape to close, focus trap, focus restore.
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const panel = panelRef.current;
    panel?.querySelector("a")?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = [toggleRef.current, ...panel.querySelectorAll("a")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      lockScroll(false);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const navigateFromMenu = (event, href) => {
    event.preventDefault();
    setOpen(false);
    // Wait for the scroll lock to release before scrolling.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(href)));
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <header
          className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
            scrolled || open
              ? "border-b border-atlas-100/80 bg-white/85 shadow-[0_10px_40px_-24px] shadow-atlas-900/40 backdrop-blur-xl"
              : "border-b border-transparent bg-white"
          }`}
        >
          <div className="mx-auto flex h-18 w-full max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
            <a
              href="#top"
              className="flex min-w-0 shrink-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-atlas-700 sm:gap-4"
            >
              <Image
                src={logos.primary.src}
                width={logos.primary.width}
                height={logos.primary.height}
                alt={logos.primary.alt}
                loading="eager"
                className="h-8 w-auto sm:h-9"
                sizes="96px"
              />
              <span aria-hidden="true" className="h-8 w-px bg-atlas-100" />
              <span className="sr-only">Back to top: </span>
              <span className="flex flex-col leading-none">
                <span className="text-[0.95rem] font-semibold tracking-[-0.01em] text-atlas-900 sm:text-base">
                  ICCISF<span className="text-aqua-700">2027</span>
                </span>
                <span className="mt-1 hidden font-mono text-[0.65rem] tracking-[0.12em] text-atlas-500 uppercase min-[400px]:block">
                  {site.dates.short} · {site.venue.city}
                </span>
              </span>
            </a>

            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {navigation.map((item) => {
                  const isActive = active === item.href;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isActive ? "location" : undefined}
                        className={`group relative inline-flex h-10 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-atlas-700 ${
                          isActive ? "text-atlas-900" : "text-atlas-900/65 hover:text-atlas-900"
                        }`}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-aqua-500 transition-transform duration-500 ease-out-expo ${
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#call-for-papers"
                className="hidden h-10 items-center rounded-full bg-atlas-700 px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-atlas-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-atlas-700 md:inline-flex"
              >
                Call for Papers
              </a>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="inline-flex size-11 items-center justify-center rounded-full text-atlas-900 ring-1 ring-atlas-100 transition-colors hover:bg-atlas-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-700 xl:hidden"
              >
                {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <m.div
                ref={panelRef}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-atlas-100 bg-white xl:hidden"
              >
                <nav aria-label="Mobile" className="mx-auto flex min-h-full max-w-[90rem] flex-col px-5 pt-6 pb-10 sm:px-8">
                  <ul className="divide-y divide-atlas-100">
                    {navigation.map((item, i) => (
                      <m.li
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <a
                          href={item.href}
                          onClick={(event) => navigateFromMenu(event, item.href)}
                          aria-current={active === item.href ? "location" : undefined}
                          className="flex min-h-14 items-center justify-between gap-4 py-3 text-2xl font-semibold tracking-[-0.02em] text-atlas-950 focus-visible:outline-2 focus-visible:outline-atlas-700 aria-[current=location]:text-aqua-700"
                        >
                          {item.label}
                          <span aria-hidden="true" className="font-mono text-xs font-normal text-atlas-400">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </a>
                      </m.li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-10 text-sm text-atlas-700">
                    <p className="font-semibold text-atlas-950">{site.dates.display}</p>
                    <p className="mt-1">
                      {site.venue.name}, {site.venue.city}
                    </p>
                  </div>
                </nav>
              </m.div>
            )}
          </AnimatePresence>
        </header>
      </MotionConfig>
    </LazyMotion>
  );
}
