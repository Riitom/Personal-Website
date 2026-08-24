import type { PointerEvent, ReactNode } from "react";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
};

const BorderGlow = ({ children, className = "" }: BorderGlowProps) => {
  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--edge-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--edge-y", `${event.clientY - rect.top}px`);
    event.currentTarget.style.setProperty("--edge-opacity", "1");
  };

  return (
    <div
      className={`border-glow ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={(event) => event.currentTarget.style.setProperty("--edge-opacity", "0")}
    >
      {children}
    </div>
  );
};

export default BorderGlow;
