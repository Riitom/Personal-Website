import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

type Spark = {
  x: number;
  y: number;
  angle: number;
  startedAt: number;
};

type ClickSparkProps = {
  children: ReactNode;
  sparkColor?: string;
  sparkCount?: number;
  sparkRadius?: number;
};

const ClickSpark = ({
  children,
  sparkColor = "#66e7a3",
  sparkCount = 9,
  sparkRadius = 24,
}: ClickSparkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(window.innerWidth * ratio));
      canvas.height = Math.max(1, Math.round(window.innerHeight * ratio));
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.getContext("2d")?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const draw = (now: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    sparksRef.current = sparksRef.current.filter((spark) => {
      const progress = (now - spark.startedAt) / 520;
      if (progress >= 1) return false;

      const eased = 1 - (1 - progress) ** 3;
      const distance = eased * sparkRadius;
      const length = 7 * (1 - progress);
      const startX = spark.x + Math.cos(spark.angle) * distance;
      const startY = spark.y + Math.sin(spark.angle) * distance;
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(
        startX + Math.cos(spark.angle) * length,
        startY + Math.sin(spark.angle) * length,
      );
      context.strokeStyle = sparkColor;
      context.globalAlpha = 1 - progress;
      context.lineWidth = 2;
      context.lineCap = "round";
      context.stroke();
      return true;
    });
    context.globalAlpha = 1;

    if (sparksRef.current.length > 0) {
      frameRef.current = requestAnimationFrame(draw);
    } else {
      frameRef.current = null;
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (event.button !== 0) return;

    const x = event.clientX;
    const y = event.clientY;
    const startedAt = performance.now();

    sparksRef.current.push(
      ...Array.from({ length: sparkCount }, (_, index) => ({
        x,
        y,
        angle: (Math.PI * 2 * index) / sparkCount,
        startedAt,
      })),
    );
    if (!frameRef.current) frameRef.current = requestAnimationFrame(draw);
  };

  return (
    <div ref={rootRef} className="click-spark-root" onPointerDownCapture={handlePointerDown}>
      <canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true" />
      {children}
    </div>
  );
};

export default ClickSpark;
