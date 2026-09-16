import { useRef } from "react";
import { motion, useInView, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";

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
};

type ArchitectureStage = (typeof architectures)["scrap"]["stages"][number];

const StageProgress = ({ progress, index }: { progress: MotionValue<number>; index: number }) => {
  const reduced = useReducedMotion();
  const fill = useTransform(progress, [index / 3, (index + 1) / 3], [0, 1]);
  return <span className="architecture-progress-track"><motion.span style={{ scaleX: reduced ? 1 : fill }} /></span>;
};

const DiagramStage = ({ stage, index, active, projectId, progress }: {
  stage: ArchitectureStage; index: number; active: boolean; projectId: string; progress: MotionValue<number>;
}) => {
  const reduced = useReducedMotion();
  const connection = useTransform(progress, [(index + 0.65) / 3, (index + 1) / 3], [0, 1]);
  return (
    <li className={active ? "architecture-node is-current" : "architecture-node"}>
      {active && <motion.span className="architecture-focus" aria-hidden="true"
        layoutId={reduced ? undefined : `${projectId}-stage-focus`}
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }} />}
      <div className="architecture-node-heading"><span className="architecture-number">0{index + 1}</span><h5>{stage.name}</h5><ArrowRight size={15} aria-hidden="true" /></div>
      <p className="architecture-tech">{stage.tech}</p>
      <div className="architecture-io"><span>{stage.input}</span><span className="architecture-signal" aria-hidden="true"><i className="architecture-packet" /></span><strong>{stage.output}</strong></div>
      {index < 2 && <span className="architecture-connector" aria-hidden="true"><motion.i style={{ scaleY: reduced ? 1 : connection }} /></span>}
    </li>
  );
};

const ProjectVisual = ({ project, step, progress }: { project: Project; step: number; progress: MotionValue<number> }) => {
  const architecture = architectures[project.id];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const reduced = useReducedMotion();
  return (
    <figure ref={ref} className={`project-visual ${inView && !reduced ? "diagram-running" : ""}`} aria-label={`${project.shortTitle} system architecture`}>
      <figcaption className="visual-topline"><span>SYSTEM ARCHITECTURE</span><span>{project.number} / 03</span></figcaption>
      <div className="architecture-heading"><h4>{architecture.title}</h4><span>{architecture.input}</span></div>
      <div className="architecture-progress" aria-hidden="true">{architecture.stages.map((stage, index) => <StageProgress key={stage.name} progress={progress} index={index} />)}</div>
      <ol className="architecture-flow">
        {architecture.stages.map((stage, index) => <DiagramStage key={stage.name} stage={stage} index={index} active={index === step} projectId={project.id} progress={progress} />)}
      </ol>
      <div className="architecture-context">
        {architecture.stages.map((stage, index) => <p key={stage.name} className={step === index ? "is-current" : ""} aria-hidden={step !== index}>{stage.detail}</p>)}
      </div>
      <div className="architecture-footnote">{architecture.note}</div>
    </figure>
  );
};

export default ProjectVisual;
