import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;

float triangleDistance(vec2 p) {
  const float k = 1.7320508;
  p.x = abs(p.x) - 1.0;
  p.y = p.y + 1.0 / k;
  if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
  p.x -= clamp(p.x, -2.0, 0.0);
  return -length(p) * sign(p.y);
}

mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
  vec2 pointer = (uPointer * 2.0 - 1.0) * vec2(1.0, -1.0);
  uv += pointer * 0.075;
  uv *= rotate2d(uTime * 0.09 + pointer.x * 0.12);
  uv.y += sin(uv.x * 2.8 + uTime * 0.6) * 0.035;

  float face = 1.0 - smoothstep(-0.19, 0.055, triangleDistance(uv * 1.06));
  float edge = 1.0 - smoothstep(0.0, 0.075, abs(triangleDistance(uv * 1.06)));
  float inner = 1.0 - smoothstep(0.0, 0.045, abs(triangleDistance((uv + vec2(0.0, 0.12)) * 1.45)));
  float light = clamp(0.55 + uv.x * 0.22 - uv.y * 0.18, 0.0, 1.0);

  vec3 mint = vec3(0.34, 0.94, 0.63);
  vec3 cyan = vec3(0.37, 0.86, 0.93);
  vec3 pearl = vec3(0.92, 1.0, 0.97);
  vec3 color = mix(mint, cyan, light);
  color = mix(color, pearl, edge * 0.75 + inner * 0.24);
  color += 0.1 * sin(vec3(0.0, 2.0, 4.0) + uTime + uv.xyx * 4.0);

  float alpha = face * 0.28 + edge * 0.8 + inner * 0.28;
  alpha *= 1.0 - smoothstep(0.35, 1.4, length(uv));
  gl_FragColor = vec4(color, alpha);
}`;

const Prism = () => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.className = "prism-canvas";
    host.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uPointer: { value: [0.5, 0.5] },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let frame = 0;
    let start = performance.now();

    const resize = () => {
      const rect = host.getBoundingClientRect();
      renderer.setSize(Math.max(rect.width, 1), Math.max(rect.height, 1));
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };
    const pointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      program.uniforms.uPointer.value = [
        (event.clientX - rect.left) / Math.max(rect.width, 1),
        (event.clientY - rect.top) / Math.max(rect.height, 1),
      ];
    };
    const render = (now: number) => {
      if (visible) {
        program.uniforms.uTime.value = reducedMotion ? 0 : (now - start) / 1000;
        renderer.render({ scene: mesh });
      } else {
        start = now - program.uniforms.uTime.value * 1000;
      }
      frame = requestAnimationFrame(render);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(host);
    host.addEventListener("pointermove", pointerMove);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener("pointermove", pointerMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="prism-host" aria-hidden="true" />;
};

export default Prism;
