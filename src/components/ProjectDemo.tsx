import { useId } from "react";
import type { Project } from "@/data/projects";

const captions: Record<Project["id"], string[]> = {
  scrap: ["Locate material regions", "Separate detection from weight estimation", "Preserve the inspection evidence"],
  border: ["Link observations across frames", "Interpret movement against a zone", "Surface evidence for human review"],
  thermal: ["Fuse environmental and occupancy inputs", "Predict a target temperature", "Constrain actuation before applying it"],
  quantum: ["Represent roads and battery state", "Replan with calibrated learned guidance", "Compare exact planners on shared scenarios"],
};

const ScrapDemo = ({ step }: { step: number }) => <>
  <rect className="demo-surface" x="32" y="25" width="300" height="195" rx="12" />
  <g className="demo-region"><path d="M80 80 154 64 182 133 115 155 70 118Z" /><path d="m211 116 69-25 25 66-58 29-37-26Z" /></g>
  <path className="demo-muted-line" d="M48 44h20m-20 0v20m268-20h-20m20 0v20M48 201h20m-20 0v-20m268 20h-20m20 0v-20" />
  <g className="demo-detections"><rect x="64" y="54" width="123" height="108" rx="3" /><rect x="200" y="83" width="111" height="110" rx="3" /><text x="66" y="47">REGION 01</text><text x="202" y="77">REGION 02</text></g>
  <path className="demo-scan demo-animated" d="M48 45H316" />
  <g className="demo-phase" opacity={step === 1 ? 1 : 0.2}><path className="demo-line" d="M66 175v12m0-6h120m0-6v12" /><text className="demo-label" x="106" y="203">AREA</text></g>
  <path className="demo-muted-line" d="M342 125h22" />
  <g className="demo-phase" opacity={step === 2 ? 0.3 : 1}>
    <text className="demo-label" x="382" y="68">ESTIMATION</text>
    <text className="demo-value" x="382" y="103">Area</text><text className="demo-small" x="382" y="130">× fill ratio</text><text className="demo-small" x="382" y="153">× thickness</text><text className="demo-small" x="382" y="176">× density</text>
    <path className="demo-line" d="M380 187h94" /><text className="demo-label" x="382" y="210">WEIGHT RANGE</text>
  </g>
  <g className="demo-phase" opacity={step === 2 ? 1 : 0}>
    <rect className="demo-surface" x="367" y="45" width="127" height="177" rx="10" />
    <text className="demo-label" x="382" y="73">RECORD</text><path className="demo-muted-line" d="M383 93h90m-90 20h62m-62 20h78m-78 20h55" /><path className="demo-line" d="m413 184 10 10 25-27" /><text className="demo-label" x="385" y="210">REVIEW + RERUN</text>
  </g>
</>;

const BorderDemo = ({ step }: { step: number }) => <>
  <path className="demo-map-line" d="M32 76h296M32 139h296M32 204h296M98 27v209M185 27v209M278 27v209" />
  <path className="demo-zone" d="m225 46 109 18-9 135-93-33-31-65Z" />
  <text className="demo-label" x="239" y="91">ZONE A</text>
  <path className="demo-muted-line" strokeDasharray="4 7" d="M62 203 121 159 181 157 226 117 277 127" />
  <path className="demo-line demo-route-signal demo-animated" d="M62 203 121 159 181 157 226 117 277 127" />
  <g className="demo-tracker demo-animated"><circle className="demo-track-halo" r="13" /><circle className="demo-dot" r="4" /><path className="demo-line" d="M-18-8v-10h10M18-8v-10H8M-18 8v10h10M18 8v10H8" /></g>
  <path className="demo-muted-line" d="M347 32v197" />
  <text className="demo-label" x="367" y="54">TRACK 01</text>
  <text className="demo-value" x="367" y="91">Continuity</text><text className="demo-small" x="367" y="119">across frames</text>
  <g className="demo-phase" opacity={step >= 1 ? 1 : 0.25}><path className="demo-line" d="M369 145h98" /><text className="demo-label" x="367" y="168">TRAJECTORY</text><text className="demo-small" x="367" y="189">+ zone context</text></g>
  <g className="demo-phase" opacity={step === 2 ? 1 : 0}><rect className="demo-surface" x="362" y="202" width="132" height="31" rx="6" /><text className="demo-label" x="375" y="222">HUMAN REVIEW</text></g>
</>;

const ThermalDemo = ({ step }: { step: number }) => <>
  <g className="demo-muted-line"><path d="M120 61h38v64h46M120 125h84M120 189h38v-64" /><path d="M314 125h45m60 31v60H285" /></g>
  {[61, 125, 189].map((y, index) => <g key={y}><rect className="demo-surface" x="25" y={y - 20} width="95" height="40" rx="8" /><text className="demo-small" textAnchor="middle" x="72" y={y + 4}>{["Climate", "Presence", "Energy"][index]}</text></g>)}
  <path className="demo-line demo-route-signal demo-animated" d="M120 125h239" />
  <rect className="demo-chip" x="204" y="79" width="110" height="92" rx="12" />
  <text className="demo-value" textAnchor="middle" x="259" y="119">ESP32</text><text className="demo-label" textAnchor="middle" x="259" y="142">EDGE ML</text>
  <path className="demo-muted-line" d="M365 127a54 54 0 0 1 108 0" />
  <path className="demo-line" d="M378 92a54 54 0 0 1 73-8" />
  <g className="demo-needle demo-animated"><path className="demo-line" d="M419 125 397 91" /></g><circle className="demo-dot" cx="419" cy="125" r="4" />
  <text className="demo-label" textAnchor="middle" x="419" y="153">TARGET</text>
  <g className="demo-phase" opacity={step === 2 ? 1 : 0.4}><rect className="demo-surface" x="175" y="197" width="155" height="38" rx="7" /><text className="demo-label" textAnchor="middle" x="252" y="220">GUARDED CONTROL</text></g>
  <text className="demo-label" textAnchor="middle" x="419" y="242">AC · FAN · HEATER</text>
</>;

const QuantumDemo = ({ step }: { step: number }) => {
  const route = step === 0 ? "M48 160 139 102 245 46 349 78 461 106" : "M48 160 139 102 239 171 350 153 461 106";
  const nodes = [[48,160],[139,102],[245,46],[349,78],[461,106],[141,211],[239,171],[350,153],[437,210],[64,48]];
  return <>
    <path className="demo-map-line" d="M48 160 139 102 245 46 349 78 461 106 437 210 350 153 239 171 141 211 48 160 64 48 139 102 239 171 245 46M349 78l1 75 111-47M141 211l-2-109" />
    <path className="demo-zone" d="m218 24 58 14-10 36-58-15Z" opacity={step > 0 ? 0.7 : 0} />
    {nodes.map(([x,y]) => <circle key={`${x}-${y}`} className="demo-map-node" cx={x} cy={y} r="4" />)}
    <path className="demo-line" d={route} /><path className="demo-line demo-route-signal demo-animated" d={route} />
    <circle className="demo-dot" cx="48" cy="160" r="6" /><text className="demo-label" x="26" y="185">START</text>
    <g className="demo-phase" opacity={step > 0 ? 1 : 0}><path className="demo-closure" d="m223 40 14 14m0-14-14 14" /><text className="demo-label" x="202" y="20">CLOSURE</text></g>
    <rect className="demo-chip" x="445" y="90" width="32" height="32" rx="7" /><path className="demo-line" d="m464 94-9 14h10l-8 12" /><text className="demo-label" x="414" y="78">CHARGER</text>
    <g className="demo-muted-line"><path d="M25 239h470" /></g>
    <text className="demo-label" x="28" y="262">HQNN GUIDANCE</text><text className="demo-label" x="209" y="262">CALIBRATION</text><text className="demo-label" x="385" y="262">EXACT SEARCH</text>
  </>;
};

const ProjectDemo = ({ id, step }: { id: Project["id"]; step: number }) => {
  const pattern = useId();
  return <div className={`project-demo demo-${id}`} role="img" aria-label={`${captions[id][step]}. Illustrative system schematic, not measured results.`}>
    <svg viewBox="0 0 520 280" aria-hidden="true">
      <defs><pattern id={pattern} width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.65" fill="currentColor" /></pattern></defs>
      <rect className="demo-grid" width="520" height="280" fill={`url(#${pattern})`} />
      {id === "scrap" ? <ScrapDemo step={step} /> : id === "border" ? <BorderDemo step={step} /> : id === "thermal" ? <ThermalDemo step={step} /> : <QuantumDemo step={step} />}
    </svg>
    <p className="demo-disclaimer">{id === "quantum" ? "SCHEMATIC NETWORK · NOT A MEASURED KOLKATA ROUTE" : "ILLUSTRATIVE WORKFLOW · NO LIVE DATA"}</p>
  </div>;
};

export default ProjectDemo;
