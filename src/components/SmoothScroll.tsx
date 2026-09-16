import { useEffect } from "react";
import { cancelFrame, frame } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const SmoothScroll = () => {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    // Run input smoothing before Motion measures scroll on the same frame.
    const update = ({ timestamp }: { timestamp: number }) => lenis?.raf(timestamp);
    const configure = () => {
      cancelFrame(update);
      lenis?.destroy();
      lenis = undefined;
      if (preference.matches) return;
      lenis = new Lenis({
        lerp: 0.13,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });
      frame.read(update, true);
    };
    configure();
    const navigate = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href^='#']") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      let id: string;
      try { id = decodeURIComponent(link.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      // Keep native history and focus without allowing a simultaneous browser jump.
      event.preventDefault();
      if (window.location.hash !== link.hash) window.history.pushState(null, "", link.hash);
      lenis.scrollTo(target, { onComplete: () => {
        const needsTabIndex = !target.hasAttribute("tabindex");
        if (needsTabIndex) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        if (needsTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      } });
    };
    const interruptForKeyboard = (event: KeyboardEvent) => {
      if (lenis && ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        lenis.scrollTo(lenis.actualScroll, { immediate: true });
      }
    };
    document.addEventListener("click", navigate);
    window.addEventListener("keydown", interruptForKeyboard);
    preference.addEventListener("change", configure);
    return () => {
      document.removeEventListener("click", navigate);
      window.removeEventListener("keydown", interruptForKeyboard);
      preference.removeEventListener("change", configure);
      cancelFrame(update);
      lenis?.destroy();
    };
  }, []);
  return null;
};

export default SmoothScroll;
