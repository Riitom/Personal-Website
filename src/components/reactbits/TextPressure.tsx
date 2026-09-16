import { useEffect, useRef, useState } from "react";

type TextPressureProps = {
  text: string;
  accentIndex?: number;
  minFontSize?: number;
};

const TextPressure = ({ text, accentIndex = text.length + 1, minFontSize = 48 }: TextPressureProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const characterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [fontSize, setFontSize] = useState(minFontSize);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const resize = () => {
      const width = container.clientWidth;
      setFontSize(Math.max(minFontSize, Math.min(width / (text.length * 0.49), 164)));
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [minFontSize, text.length]);

  useEffect(() => {
    const title = titleRef.current;
    const container = containerRef.current;
    if (!title || !container) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)");
    const characters = characterRefs.current.filter((character): character is HTMLSpanElement => character !== null);
    let width = title.getBoundingClientRect().width;
    const pointer = { x: width / 2, y: 0 };
    let target = { ...pointer };
    let visible = false;
    let frame = 0;
    const animate = () => {
      frame = 0;
      if (!visible || preference.matches) return;
      pointer.x += (target.x - pointer.x) * 0.18;
      pointer.y += (target.y - pointer.y) * 0.18;
      // Stable slots avoid read/write layout thrashing as the font changes width.
      characters.forEach((character, index) => {
        const center = width * (index + 0.5) / characters.length;
        const proximity = Math.max(0, 1 - Math.hypot(pointer.x - center, pointer.y) / Math.max(width * 0.48, 1));
        const weight = Math.round(360 + proximity * 540);
        const stretch = Math.round(82 + proximity * 60);
        character.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${stretch}, 'opsz' 144`;
        character.style.transform = `translateY(${-proximity * 4}px)`;
      });
      if (Math.hypot(target.x - pointer.x, target.y - pointer.y) > 0.1) frame = requestAnimationFrame(animate);
    };
    const wake = () => { if (!frame && visible && !preference.matches) frame = requestAnimationFrame(animate); };
    const move = (event: PointerEvent) => {
      const rect = title.getBoundingClientRect();
      target = { x: event.clientX - rect.left, y: event.clientY - rect.top - rect.height / 2 };
      wake();
    };
    const reset = () => { target = { x: width / 2, y: 0 }; wake(); };
    const resize = new ResizeObserver(() => { width = container.clientWidth; reset(); });
    resize.observe(container);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    intersection.observe(container);
    const changePreference = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      characters.forEach(character => { character.style.fontVariationSettings = ""; character.style.transform = ""; });
      wake();
    };
    container.addEventListener("pointermove", move);
    container.addEventListener("pointerleave", reset);
    preference.addEventListener("change", changePreference);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      container.removeEventListener("pointermove", move);
      container.removeEventListener("pointerleave", reset);
      preference.removeEventListener("change", changePreference);
    };
  }, [text]);

  return (
    <div ref={containerRef} className="text-pressure-wrap">
      <h1 ref={titleRef} className="text-pressure-title" style={{ fontSize }} aria-label={text}>
        {text.split("").map((character, index) => (
          <span
            key={`${character}-${index}`}
            ref={(element) => {
              characterRefs.current[index] = element;
            }}
            className={index >= accentIndex ? "pressure-char pressure-char-accent" : "pressure-char"}
            aria-hidden="true"
          >
            {character === " " ? "\u00A0" : character}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
