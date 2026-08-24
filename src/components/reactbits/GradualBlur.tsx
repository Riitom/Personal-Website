import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type BlurPosition = "top" | "bottom" | "left" | "right";
type BlurCurve = "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
type BlurTarget = "parent" | "page";
type BlurAnimation = boolean | "scroll";

type GradualBlurProps = {
  position?: BlurPosition;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  curve?: BlurCurve;
  opacity?: number;
  animated?: BlurAnimation;
  duration?: string;
  easing?: string;
  hoverIntensity?: number;
  target?: BlurTarget;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
  onAnimationComplete?: () => void;
};

const curves: Record<BlurCurve, (progress: number) => number> = {
  linear: (progress) => progress,
  bezier: (progress) => progress * progress * (3 - 2 * progress),
  "ease-in": (progress) => progress * progress,
  "ease-out": (progress) => 1 - (1 - progress) ** 2,
  "ease-in-out": (progress) =>
    progress < 0.5 ? 2 * progress * progress : 1 - (-2 * progress + 2) ** 2 / 2,
};

const gradientDirection: Record<BlurPosition, string> = {
  top: "to top",
  bottom: "to bottom",
  left: "to left",
  right: "to right",
};

const durationToMilliseconds = (duration: string) => {
  const value = Number.parseFloat(duration);
  return duration.trim().endsWith("ms") ? value : value * 1000;
};

const GradualBlur = ({
  position = "bottom",
  strength = 2,
  height = "6rem",
  width,
  divCount = 5,
  exponential = false,
  curve = "linear",
  opacity = 1,
  animated = false,
  duration = "0.3s",
  easing = "ease-out",
  hoverIntensity,
  target = "parent",
  zIndex = 1000,
  className = "",
  style,
  onAnimationComplete,
}: GradualBlurProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(animated === "scroll" ? 0 : 1);
  const layerCount = Math.max(1, Math.round(divCount));

  useEffect(() => {
    if (animated !== "scroll") return;

    let frame = 0;
    const updateVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const maximumScroll = Math.max(root.scrollHeight - window.innerHeight, 0);
        const remainingScroll = Math.max(maximumScroll - window.scrollY, 0);
        const fadeDistance = Math.max(window.innerHeight * 0.14, 110);
        const nextOpacity = maximumScroll > 1 ? Math.min(1, remainingScroll / fadeDistance) : 0;
        setScrollOpacity(nextOpacity);
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [animated]);

  useEffect(() => {
    if (animated !== "scroll" || scrollOpacity <= 0 || !onAnimationComplete) return;
    const timer = window.setTimeout(onAnimationComplete, durationToMilliseconds(duration));
    return () => window.clearTimeout(timer);
  }, [animated, duration, onAnimationComplete, scrollOpacity]);

  const layers = useMemo(() => {
    const increment = 100 / layerCount;
    const currentStrength = isHovered && hoverIntensity ? strength * hoverIntensity : strength;
    const curveFunction = curves[curve];

    return Array.from({ length: layerCount }, (_, index) => {
      const layer = index + 1;
      const progress = curveFunction(layer / layerCount);
      const blurValue = exponential
        ? 2 ** (progress * 4) * 0.0625 * currentStrength
        : 0.0625 * (progress * layerCount + 1) * currentStrength;
      const start = Math.round((increment * layer - increment) * 10) / 10;
      const solidStart = Math.round(increment * layer * 10) / 10;
      const solidEnd = Math.round((increment * layer + increment) * 10) / 10;
      const end = Math.round((increment * layer + increment * 2) * 10) / 10;
      let gradient = `transparent ${start}%, black ${solidStart}%`;
      if (solidEnd <= 100) gradient += `, black ${solidEnd}%`;
      if (end <= 100) gradient += `, transparent ${end}%`;

      const layerStyle: CSSProperties = {
        position: "absolute",
        inset: 0,
        maskImage: `linear-gradient(${gradientDirection[position]}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${gradientDirection[position]}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity,
      };

      return <div key={layer} style={layerStyle} />;
    });
  }, [curve, exponential, hoverIntensity, isHovered, layerCount, opacity, position, strength]);

  const vertical = position === "top" || position === "bottom";
  const pageTarget = target === "page";
  const containerStyle: CSSProperties = {
    position: pageTarget ? "fixed" : "absolute",
    pointerEvents: hoverIntensity ? "auto" : "none",
    height: vertical ? height : "100%",
    width: vertical ? width ?? "100%" : width ?? height,
    top: position === "top" || !vertical ? 0 : undefined,
    bottom: position === "bottom" || !vertical ? 0 : undefined,
    left: position === "left" || vertical ? 0 : undefined,
    right: position === "right" || vertical ? 0 : undefined,
    opacity: animated === "scroll" ? scrollOpacity : 1,
    transition: animated ? `opacity ${duration} ${easing}` : undefined,
    zIndex: pageTarget ? zIndex + 100 : zIndex,
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${pageTarget ? "gradual-blur-page" : "gradual-blur-parent"} ${className}`}
      style={containerStyle}
      onPointerEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onPointerLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
      aria-hidden="true"
    >
      <div className="gradual-blur-inner">{layers}</div>
    </div>
  );
};

export default memo(GradualBlur);
