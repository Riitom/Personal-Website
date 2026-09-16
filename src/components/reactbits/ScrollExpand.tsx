import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useSceneScroll as useScroll } from "@/hooks/useSceneScroll";
import "./ScrollExpand.css";

type ScrollExpandProps = {
  media: ReactNode;
  children: ReactNode;
  title: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  scrollDistance?: number;
  holdDistance?: number;
};

// The supplied React Bits frame expansion, adapted to native window scrolling
// and the existing Framer Motion runtime. Follows the shared page-scroll clock.
const ScrollExpand = ({
  media, children, title, scrollHint = "Keep scrolling to open",
  startWidth = 56, startHeight = 58, startRadius = 32, endRadius = 0,
  scrollDistance = 1.15, holdDistance = 0.3,
}: ScrollExpandProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = scrollYProgress;
  const expansionEnd = scrollDistance / (scrollDistance + holdDistance);
  const clipPath = useTransform(smooth, (value) => {
    const progress = Math.min(1, Math.max(0, value / expansionEnd));
    const eased = progress * progress * (3 - 2 * progress);
    const x = (100 - startWidth) * (1 - eased) / 2;
    const y = (100 - startHeight) * (1 - eased) / 2;
    const radius = startRadius + (endRadius - startRadius) * eased;
    return `inset(${y}% ${x}% round ${radius}px)`;
  });
  const scale = useTransform(smooth, [0, expansionEnd], [1.35, 1]);
  const titleOpacity = useTransform(smooth, [0.2, expansionEnd * 0.8], [1, 0]);
  const titleY = useTransform(smooth, [0.2, expansionEnd * 0.8], [0, -40]);
  const overlayOpacity = useTransform(smooth, [expansionEnd * 0.65, expansionEnd], [0, 1]);
  const overlayY = useTransform(smooth, [expansionEnd * 0.65, expansionEnd], [28, 0]);
  const hintOpacity = useTransform(smooth, [0, 0.15], [1, 0]);
  const logoBlur = useTransform(smooth, [0, expansionEnd * 0.85], ["blur(4px)", "blur(24px)"]);
  const logoOpacity = useTransform(smooth, [0, expansionEnd * 0.85], [0.5, 0.1]);

  return (
    <div ref={ref} className={`scroll-expand ${reduced ? "is-static" : ""}`}
      style={{ minHeight: reduced ? undefined : `${(1 + scrollDistance + holdDistance) * 100}svh` }}>
      <div className="scroll-expand__stage">
        <motion.div className="scroll-expand__frame" style={{ clipPath: reduced ? "none" : clipPath }}>
          <motion.div className="scroll-expand__media" style={{ scale: reduced ? 1 : scale,
            "--logo-blur": reduced ? "blur(24px)" : logoBlur,
            "--logo-opacity": reduced ? 0.1 : logoOpacity,
          } as import("framer-motion").MotionStyle}>{media}</motion.div>
          <div className="scroll-expand__scrim" />
          <motion.div className="scroll-expand__overlay" style={{ opacity: reduced ? 1 : overlayOpacity, y: reduced ? 0 : overlayY }}>
            {children}
          </motion.div>
        </motion.div>
        {!reduced && <>
          <motion.div className="scroll-expand__title" aria-hidden="true" style={{ opacity: titleOpacity, y: titleY }}>{title}</motion.div>
          <motion.p className="scroll-expand__hint" style={{ opacity: hintOpacity }}>{scrollHint} <span>↓</span></motion.p>
        </>}
      </div>
    </div>
  );
};

export default ScrollExpand;
