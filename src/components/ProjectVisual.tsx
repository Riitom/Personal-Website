import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

// Original vector workflow illustrations; these are not product screenshots or live measurements.
const ProjectVisual = ({ project, step }: { project: Project; step: number }) => (
  <div className={`project-visual visual-${project.id}`} style={{ "--project-accent": project.accent } as CSSProperties}>
    <div className="visual-topline"><span>{project.id === "thermal" ? "EDGE CONTROLLER" : "VISION WORKFLOW"}</span><span>0{step + 1} / 03</span></div>
    <svg viewBox="0 0 540 420" className="workflow-art" role="img" aria-label={`${project.title} workflow illustration`}>
      <defs>
        <pattern id={`grid-${project.id}`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeOpacity=".1" /></pattern>
        <radialGradient id={`light-${project.id}`}><stop stopColor={project.accent} stopOpacity=".2" /><stop offset="1" stopColor={project.accent} stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="540" height="420" fill={`url(#grid-${project.id})`} />
      <ellipse cx="270" cy="210" rx="240" ry="195" fill={`url(#light-${project.id})`} />
      {project.id === "scrap" && <>
        <g className="scrap-shapes" fill="#172c29" stroke={project.accent} strokeOpacity=".65" strokeWidth="1.2">
          <path d="m95 165 80-45 62 40-68 60Z" /><path d="m95 165 74 55v68l-74-46Z" /><path d="m169 220 68-60v76l-68 52Z" />
          <path d="m305 180 78-47 52 44-70 45Z" /><path d="m305 180 60 42v87l-60-41Z" /><path d="m365 222 70-45v78l-70 54Z" />
        </g>
        <g className="detection-boxes" fill="none" stroke={project.accent} strokeWidth="1.4">
          <rect x="78" y="103" width="177" height="203" rx="3" /><rect x="288" y="115" width="165" height="213" rx="3" />
          <path className="scan-line" d="M55 150h430" strokeOpacity=".75" />
        </g>
        <g fill={project.accent} fontSize="11" fontFamily="monospace"><text x="80" y="91">MATERIAL DETECTION</text><text x="290" y="350">ESTIMATED RANGE</text></g>
        <path d="M257 210h27m-8-7 8 7-8 7" stroke={project.accent} fill="none" />
      </>}
      {project.id === "border" && <>
        <g fill="none" stroke={project.accent}>
          <circle cx="270" cy="210" r="150" opacity=".3" /><circle cx="270" cy="210" r="100" opacity=".25" /><circle cx="270" cy="210" r="50" opacity=".3" />
          <path d="M270 50v320M110 210h320" opacity=".3" />
          <path d="m305 103 139 47-47 141-81-47Z" fill={project.accent} fillOpacity=".07" strokeDasharray="5 6" />
          <path d="m112 307 49-21 42-34 40-13 49-28" strokeWidth="2" />
          <path d="m292 211 68-25" strokeWidth="2" strokeDasharray="5 5" />
          <path d="m350 181 10 5-5 10" />
          <path className="radar-sweep" d="M270 210 408 154" strokeOpacity=".8" />
          <rect x="271" y="176" width="42" height="62" rx="4" strokeWidth="1.7" />
        </g>
        <circle cx="292" cy="201" r="8" fill={project.accent} /><path d="M284 229v-17h16v17" fill={project.accent} />
        <g fill={project.accent} fontSize="11" fontFamily="monospace"><text x="276" y="165">TRACK 01</text><text x="340" y="97">RESTRICTED AREA</text><text x="85" y="356">OBSERVED → PREDICTED</text></g>
      </>}
      {project.id === "thermal" && <>
        <g fill="none" stroke={project.accent}>
          <path d="m122 160 148-101 148 101v155H122Z" opacity=".4" />
          <rect x="207" y="157" width="126" height="107" rx="16" fill="#271f19" strokeWidth="1.4" />
          <path d="M144 204h62m128 0h61M270 129v28m0 107v53" strokeDasharray="4 5" />
          <circle cx="140" cy="204" r="13" /><circle cx="400" cy="204" r="13" />
          <path d="M78 350c45 0 41-55 88-55s40 50 86 50 40-46 82-46 43 25 123 25" strokeWidth="2" />
          <path d="M80 325h380" strokeDasharray="5 5" opacity=".4" />
        </g>
        <g fill={project.accent} textAnchor="middle" fontFamily="monospace"><text x="270" y="204" fontSize="22">ESP32</text><text x="270" y="228" fontSize="10">LOCAL INFERENCE</text><text x="139" y="237" fontSize="10">SENSE</text><text x="400" y="237" fontSize="10">CONTROL</text><text x="270" y="386" fontSize="11">COMFORT ↔ ENERGY</text></g>
      </>}
    </svg>
    <div className="visual-stage-label"><span className="visual-status-dot" /><span>{project.steps[step].label}</span><span>WORKFLOW ILLUSTRATION</span></div>
    <div className="visual-step-bars" aria-hidden="true">{[0, 1, 2].map(i => <span key={i} className={i <= step ? "active" : ""} />)}</div>
  </div>
);

export default ProjectVisual;
