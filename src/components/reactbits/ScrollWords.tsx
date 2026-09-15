import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const Word = ({ word, index, count, progress }: { word: string; index: number; count: number; progress: MotionValue<number> }) => {
  const reduced = useReducedMotion();
  const opacity = useTransform(progress, [index / count, Math.min(1, (index + 1.8) / count)], [0.25, 1]);
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
