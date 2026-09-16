import { useRef } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useSceneScroll as useScroll } from "@/hooks/useSceneScroll";

const Word = ({ word, index, count, progress }: { word: string; index: number; count: number; progress: MotionValue<number> }) => {
  const reduced = useReducedMotion();
  const start = index / count * 0.75;
  const opacity = useTransform(progress, [start, start + 0.25], [0.32, 1]);
  return <motion.span aria-hidden="true" style={{ opacity: reduced ? 1 : opacity }}>{word}{" "}</motion.span>;
};

const ScrollWords = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const words = text.split(" ");
  return <p ref={ref} className="story-words" aria-label={text}>
    {words.map((word, index) => <Word key={`${word}-${index}`} word={word} index={index} count={words.length} progress={scrollYProgress} />)}
  </p>;
};

export default ScrollWords;
