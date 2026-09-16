import { useEffect, useRef, useState } from "react";

type NavItem = { label: string; href: string };

type GooeyNavProps = {
  items: NavItem[];
};

const GooeyNav = ({ items }: GooeyNavProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const particleRef = useRef<HTMLSpanElement>(null);

  const positionIndicator = (index: number) => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    const item = list?.querySelectorAll("a")[index] as HTMLElement | undefined;
    if (!list || !indicator || !item) return;
    indicator.style.width = `${item.offsetWidth}px`;
    indicator.style.height = `${item.offsetHeight}px`;
    indicator.style.transform = `translate3d(${item.offsetLeft}px, ${item.offsetTop}px, 0)`;
  };

  useEffect(() => {
    positionIndicator(activeIndex);
    const observer = new ResizeObserver(() => positionIndicator(activeIndex));
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = 0;
      items.forEach((item, index) => {
        const section = document.querySelector(item.href);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.4) current = index;
      });
      setActiveIndex(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  const releaseParticles = () => {
    const host = particleRef.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    host.replaceChildren();
    Array.from({ length: 7 }, (_, index) => {
      const particle = document.createElement("i");
      const angle = (Math.PI * 2 * index) / 7 + Math.random() * 0.28;
      const radius = 18 + Math.random() * 16;
      particle.style.setProperty("--particle-x", `${Math.cos(angle) * radius}px`);
      particle.style.setProperty("--particle-y", `${Math.sin(angle) * radius}px`);
      particle.style.setProperty("--particle-delay", `${index * 18}ms`);
      particle.style.setProperty("--particle-scale", `${0.55 + Math.random() * 0.65}`);
      host.appendChild(particle);
      particle.addEventListener("animationend", () => particle.remove(), { once: true });
      return particle;
    });
  };

  return (
    <div className="gooey-nav-shell">
      <div ref={listRef} className="gooey-nav-list">
        <span ref={indicatorRef} className="gooey-nav-indicator" aria-hidden="true">
          <span ref={particleRef} className="gooey-nav-particles" />
        </span>
        {items.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={activeIndex === index ? "location" : undefined}
            className={activeIndex === index ? "is-active" : ""}
            onClick={() => {
              setActiveIndex(index);
              releaseParticles();
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default GooeyNav;
