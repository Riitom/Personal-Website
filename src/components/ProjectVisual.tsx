import { useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectDemo from "./ProjectDemo";

const architectures = {
  scrap: {
    title: "From image to estimate", input: "IMAGE / VIDEO",
    stages: [
      { name: "Detect the material", tech: "YOLO26x", input: "Quality-checked frame", output: "Material class + region", detail: "Visual detection establishes what is present. It does not weigh the object." },
      { name: "Estimate the weight", tech: "GEOMETRY + DENSITY", input: "Area · fill ratio · thickness", output: "Estimated weight range", detail: "A separate calculation combines material assumptions with geometry. Calibration matters." },
      { name: "Keep the evidence", tech: "FASTAPI / SQLITE", input: "Estimate + source evidence", output: "Reviewable inspection record", detail: "Results and their inputs stay connected, so an inspection can be reviewed and rerun." },
    ],
    note: "Model output → calculation → application",
  },
  border: {
    title: "From motion to context", input: "CAMERA / VIDEO",
    stages: [
      { name: "Maintain the tracks", tech: "YOLO26x / BYTETRACK", input: "Incoming video frames", output: "Tracked objects over time", detail: "Persistent track IDs connect detections across frames, providing a temporal view of motion." },
      { name: "Add spatial context", tech: "DA-V2 BASE / ZONES", input: "Tracks + relative depth", output: "Trajectory + zone events", detail: "Short trajectories and configured zones add context. Relative depth is not metric distance." },
      { name: "Support a review", tech: "EVENT / POLICY LAYER", input: "Scored event evidence", output: "Human-reviewed guidance", detail: "The prototype surfaces events for a person to interpret, not autonomous enforcement." },
    ],
    note: "Observation → interpretation → human review",
  },
  thermal: {
    title: "From sensing to comfort", input: "ROOM / ENVIRONMENT",
    stages: [
      { name: "Understand the room", tech: "SENSORS / ESP32", input: "Temperature · humidity · occupancy", output: "Local environmental state", detail: "SHT35 and DHT11 readings combine with PIR and mmWave occupancy signals and energy metering." },
      { name: "Choose a target", tech: "PYTHON → EDGE ML", input: "State + learned comfort model", output: "Temperature target", detail: "The proposed model is trained on a PC. Compact ESP32 inference recommends only a target." },
      { name: "Apply safe control", tech: "CONSTRAINED CONTROLLER", input: "Target + safety constraints", output: "AC / fan / heater commands", detail: "Deterministic logic owns actuation, minimum dwell times and fault handling. Evaluation is planned." },
    ],
    note: "Proposed architecture · research & system design",
  },
  quantum: {
    title: "From learned guidance to an exact route", input: "ROADS / BATTERY STATE",
    stages: [
      { name: "Model the journey", tech: "OSM / BATTERY GRAPH", input: "Roads + battery + charger state", output: "Current routing problem", detail: "Real Kolkata road topology supports an implicit battery-state graph. Stations, traffic, queues and disruptions are simulated." },
      { name: "Guide exact search", tech: "14-QUBIT HQNN / BI-A*", input: "Calibrated learned potential", output: "Feasible snapshot route", detail: "A simulated hybrid QNN proposes guidance. Consistency calibration constrains it before exact search; replanning preserves the traveled prefix." },
      { name: "Evaluate fairly", tech: "DIJKSTRA / BI-A* / HQNN", input: "Shared held-out scenarios", output: "Audited comparisons", detail: "The planned comparison reports inference, calibration and search costs separately from simulated trip metrics. Full benchmark results remain pending." },
    ],
    note: "In-progress research · no established quantum advantage",
  },
};

type ArchitectureStage = (typeof architectures)["scrap"]["stages"][number];

const StageProgress = ({ progress, index }: { progress: MotionValue<number>; index: number }) => {
  const reduced = useReducedMotion();
  const fill = useTransform(progress, [index / 3, (index + 1) / 3], [0, 1]);
  return <span className="architecture-progress-track"><motion.span style={{ scaleX: reduced ? 1 : fill }} /></span>;
};

const DiagramStage = ({ stage, index, active, projectId, progress, onSelect }: {
  stage: ArchitectureStage; index: number; active: boolean; projectId: string; progress: MotionValue<number>; onSelect: () => void;
}) => {
  const reduced = useReducedMotion();
  return (
    <li className={active ? "architecture-node is-current" : "architecture-node"}>
      {active && <motion.span className="architecture-focus" aria-hidden="true"
        layoutId={reduced ? undefined : `${projectId}-stage-focus`}
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }} />}
      <button type="button" className="architecture-stage-button" aria-pressed={active} aria-label={`Explore stage ${index + 1}: ${stage.name}`} onClick={onSelect}>
        <span className="architecture-number">0{index + 1}</span><span className="architecture-stage-name">{stage.name}</span>
        <StageProgress progress={progress} index={index} />
      </button>
    </li>
  );
};

const ProjectVisual = ({ project, step, progress }: { project: Project; step: number; progress: MotionValue<number> }) => {
  const architecture = architectures[project.id];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const reduced = useReducedMotion();
  const [manualStep, setManualStep] = useState<number | null>(null);
  useMotionValueEvent(progress, "change", () => setManualStep(null));
  const selected = manualStep ?? step;
  return (
    <figure ref={ref} className={`project-visual ${inView && !reduced ? "diagram-running" : ""}`} aria-label={`${project.shortTitle} system architecture`}>
      <figcaption className="visual-topline"><span>SYSTEM IN MOTION</span><span>{project.number} / {String(projects.length).padStart(2, "0")}</span></figcaption>
      <div className="architecture-heading"><h4>{architecture.title}</h4><span>{architecture.input}</span></div>
      <ProjectDemo id={project.id} step={selected} />
      <ol className="architecture-flow">
        {architecture.stages.map((stage, index) => <DiagramStage key={stage.name} stage={stage} index={index} active={index === selected} projectId={project.id} progress={progress} onSelect={() => setManualStep(index)} />)}
      </ol>
      <div className="architecture-context">
        {architecture.stages.map((stage, index) => <p key={stage.name} className={selected === index ? "is-current" : ""} aria-hidden={selected !== index}>{stage.detail}</p>)}
      </div>
      <div className="architecture-footnote">{architecture.note}</div>
    </figure>
  );
};

export default ProjectVisual;
