/**
 * In-page navigation that works with or without Lenis smooth scrolling.
 * Moves keyboard focus to the target section so screen-reader and keyboard
 * users land where sighted users do.
 */

let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};
export const getLenis = () => lenis;

export function scrollToHash(hash, { updateHistory = true } = {}) {
  if (!hash || hash === "#") return false;
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return false;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (lenis) {
    // The header offset comes from `scroll-padding-top` in globals.css, which Lenis honours.
    lenis.scrollTo(target, { duration: 1.1, force: true });
  } else {
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
  if (updateHistory && window.location.hash !== hash) {
    history.pushState(null, "", hash);
    // pushState does not fire hashchange; components such as the track cards listen for it.
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  return true;
}

export function lockScroll(locked) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (lenis) (locked ? lenis.stop() : lenis.start());
}
