export type Project = {
  id: "scrap" | "border" | "thermal";
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  status: string;
  summary: string;
  tags: string[];
  href?: string;
  accent: string;
  steps: { label: string; title: string; text: string; points: string[] }[];
  note: string;
};

export const projects: Project[] = [
  {
    id: "scrap", number: "01", title: "AI-Assisted Scrap Detection & Weight Estimation",
    shortTitle: "From waste to insight.", category: "COMPUTER VISION / APPLIED ML", status: "Working application",
    summary: "An inspection workflow that turns a material image into detections, explainable weight ranges and a traceable record.",
    tags: ["Python", "YOLO26x", "FastAPI", "React", "SQLite"], accent: "#79edb5",
    href: "https://github.com/Riitom/AI-Assisted-Scrap-Detection-And-Weight-Estimation",
    steps: [
      { label: "THE PROBLEM", title: "Make inspection measurable.", text: "Manual scrap inspection can leave material estimates disconnected from the evidence behind them. This application brings image validation, material detection and inspection history into one reviewable workflow.", points: ["Multiple-image inspection", "Quality checks before inference"] },
      { label: "THE SYSTEM", title: "Detect. Estimate. Explain.", text: "A YOLO26x detector identifies material classes and bounding boxes. A separate estimator combines corrected box area, calibration, assumed thickness and material density to produce an expected weight range. The detector and estimator remain independent.", points: ["Annotated material detections", "Configurable confidence and material properties"] },
      { label: "THE OUTCOME", title: "Keep the evidence with the result.", text: "A FastAPI backend records inputs, annotations, settings and estimates in SQLite. The React interface supports searchable history, side-by-side review, reruns and an operations dashboard, making each inspection easier to revisit.", points: ["Input/output audit history", "Search, compare and rerun inspections"] },
    ],
    note: "Weight is an approximate engineering range; operational accuracy requires calibration and measured reference samples.",
  },
  {
    id: "border", number: "02", title: "BORDER-SENSE AI", shortTitle: "Understand motion. See context.",
    category: "VIDEO INTELLIGENCE / TRACKING", status: "MVP 1.2.1",
    summary: "A local video-intelligence prototype that combines object tracking, relative depth and restricted-area event review.",
    tags: ["YOLO26x", "ByteTrack", "Depth Anything V2", "FastAPI", "CUDA"], accent: "#af9cff",
    href: "https://github.com/Riitom/Border-Sense",
    steps: [
      { label: "THE PROBLEM", title: "A frame is only part of the story.", text: "Understanding activity in a video requires continuity. BORDER-SENSE accepts a webcam or recorded video and brings detections, movement history and operator-defined areas into a single local command-center interface.", points: ["Live webcam and recorded-video input", "Persistent person and vehicle tracks"] },
      { label: "THE SYSTEM", title: "Follow movement through space.", text: "YOLO26x and ByteTrack maintain object identities and movement trails. Depth Anything V2 Base adds relative-depth visualization, while short-horizon trajectory estimates support predicted-entry and observed-entry events for polygon restricted areas.", points: ["Two-second direction estimates", "Relative depth and configurable zones"] },
      { label: "THE OUTCOME", title: "Context for a human decision.", text: "The dashboard presents explainable event scores and local response-policy guidance for operator review. Parallel detector/depth startup and cached model sessions improve the workflow when switching between webcam and recorded-video sessions.", points: ["Operator-reviewed event guidance", "Parallel model loading and cached reuse"] },
    ],
    note: "A working prototype for human review. Depth is relative, and predictions do not establish identity, intent or physical distance.",
  },
  {
    id: "thermal", number: "03", title: "ESP32 Smart Thermal Controller", shortTitle: "Comfort, with a little intelligence.",
    category: "EMBEDDED AI / ENERGY OPTIMIZATION", status: "Research & system design",
    summary: "An autonomous thermal-control design that uses local ML to choose a temperature target, with a separate controller managing appliance constraints.",
    tags: ["ESP32", "Python", "Edge ML", "Sensor fusion", "C/C++"], accent: "#f3c78b",
    steps: [
      { label: "THE PROBLEM", title: "Respond to the room, not a fixed number.", text: "The design aims to balance comfort, energy consumption and unnecessary switching as conditions change. It combines indoor SHT35 and outdoor DHT11 readings with PIR/mmWave occupancy evidence, appliance states and real electrical-power measurements.", points: ["Indoor/outdoor temperature and humidity", "Occupancy fusion and measured energy"] },
      { label: "THE SYSTEM", title: "Learn a target. Constrain the action.", text: "Models are trained in Python on a PC, then prepared for compact inference on the ESP32. The model recommends an optimal target temperature. A deterministic safety and predictive-control layer applies comfort bounds, dwell times and fault handling before appliance commands.", points: ["Local inference without cloud control", "IR AC commands and constrained fan/heater control"] },
      { label: "THE RESEARCH", title: "Measure the improvement honestly.", text: "The planned evaluation compares fixed-setpoint, predictive and ACWPH baselines against ML-assisted control. Chronological data splits, measured kWh, comfort preservation, switching counts and embedded resource usage will determine whether the learned target adds value.", points: ["Time-based training and evaluation", "Energy, comfort and inference-footprint metrics"] },
    ],
    note: "Based on the technical PRD. Hardware validation, model evaluation and measured energy savings remain planned; no performance results are claimed.",
  },
];
