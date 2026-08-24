import type { CSSProperties, ReactNode } from "react";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

const GradientText = ({ children, className = "", speed = 7 }: GradientTextProps) => (
  <span
    className={`gradient-text ${className}`}
    style={{ "--gradient-speed": `${speed}s` } as CSSProperties}
  >
    {children}
  </span>
);

export default GradientText;
