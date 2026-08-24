import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, PointerEvent } from "react";

export type SkillGroup = {
  category: string;
  items: string[];
};

type SkillBentoProps = {
  groups: SkillGroup[];
};

const SkillBento = ({ groups }: SkillBentoProps) => {
  const reduceMotion = useReducedMotion();

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 7;
    const rotateX = (0.5 - y / rect.height) * 7;
    card.style.setProperty("--spot-x", `${x}px`);
    card.style.setProperty("--spot-y", `${y}px`);
    card.style.transform = `perspective(900px) translateY(-7px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const reset = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = "perspective(900px) translateY(0) rotateX(0) rotateY(0)";
  };

  return (
    <div className="skill-bento-grid">
      {groups.map((group, index) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: index * 0.08 + 0.18, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="skill-card magic-bento-card"
          onPointerMove={handleMove}
          onPointerLeave={reset}
          style={{ "--card-index": index } as CSSProperties}
        >
          <div className="bento-spotlight" aria-hidden="true" />
          <div className="bento-stars" aria-hidden="true">
            {Array.from({ length: 5 }, (_, star) => <i key={star} />)}
          </div>
          <div className="bento-card-content">
            <span className="bento-number" aria-hidden="true">0{index + 1}</span>
            <h3>{group.category}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span key={item} className="skill-tag px-2.5 py-1 rounded-md text-xs font-mono text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillBento;
