import { motion, useReducedMotion } from "framer-motion";

type ScrollRevealProps = {
  children: string;
  className?: string;
};

const ScrollReveal = ({ children, className = "" }: ScrollRevealProps) => {
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");

  return (
    <motion.p
      className={`scroll-reveal ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.022 } },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          className="scroll-reveal-word"
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0.12, y: reduceMotion ? 0 : 14, filter: reduceMotion ? "blur(0px)" : "blur(5px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  );
};

export default ScrollReveal;
