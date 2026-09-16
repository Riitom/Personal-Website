import { motion } from "framer-motion";
import { useSceneScroll as useScroll } from "@/hooks/useSceneScroll";

const LiquidBackdrop = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="liquid-backdrop" aria-hidden="true">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <div className="liquid-orb liquid-orb-one" />
      <div className="liquid-orb liquid-orb-two" />
      <div className="liquid-orb liquid-orb-three" />
      <div className="liquid-grain" />
    </div>
  );
};

export default LiquidBackdrop;
