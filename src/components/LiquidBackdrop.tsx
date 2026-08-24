import { motion, useScroll, useSpring } from "framer-motion";

const LiquidBackdrop = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.35,
  });

  return (
    <div className="liquid-backdrop" aria-hidden="true">
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} />
      <div className="liquid-orb liquid-orb-one" />
      <div className="liquid-orb liquid-orb-two" />
      <div className="liquid-orb liquid-orb-three" />
      <div className="liquid-grain" />
    </div>
  );
};

export default LiquidBackdrop;
