import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useSceneScroll as useScroll } from "@/hooks/useSceneScroll";

const ChapterTitle = ({ children }: { children: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 48%"] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return <h3 ref={ref} className="chapter-title" aria-label={children}>
    <span className="chapter-title-base" aria-hidden="true">{children}</span>
    <motion.span className="chapter-title-ink" aria-hidden="true" style={{ clipPath: reduced ? "none" : clipPath }}>{children}</motion.span>
  </h3>;
};

export default ChapterTitle;
