import { useEffect, useRef, useState } from "react";

type TextPressureProps = {
  text: string;
  accentIndex?: number;
  minFontSize?: number;
};

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y);

const TextPressure = ({ text, accentIndex = text.length + 1, minFontSize = 48 }: TextPressureProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const characterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const resize = () => {
      const width = container.clientWidth;
      setFontSize(Math.max(minFontSize, Math.min(width / (text.length * 0.49), 164)));
      const rect = title.getBoundingClientRect();
      pointerRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      cursorRef.current = pointerRef.current;
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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onPointerMove = (event: PointerEvent) => {
      cursorRef.current = { x: event.clientX, y: event.clientY };
    };
    const onPointerLeave = () => {
      const rect = titleRef.current?.getBoundingClientRect();
      if (rect) cursorRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove);
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    let frame = 0;
    const animate = () => {
      pointerRef.current.x += (cursorRef.current.x - pointerRef.current.x) * 0.13;
      pointerRef.current.y += (cursorRef.current.y - pointerRef.current.y) * 0.13;
      const titleRect = titleRef.current?.getBoundingClientRect();
      const maxDistance = Math.max(titleRect?.width ?? 1, 1) * 0.48;

      characterRefs.current.forEach((character) => {
        if (!character) return;
        const rect = character.getBoundingClientRect();
        const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        const proximity = Math.max(0, 1 - distance(pointerRef.current, center) / maxDistance);
        const weight = Math.round(360 + proximity * 540);
        const width = Math.round(82 + proximity * 60);
        character.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}, 'opsz' 144`;
        character.style.transform = `translateY(${-proximity * 4}px)`;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

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
