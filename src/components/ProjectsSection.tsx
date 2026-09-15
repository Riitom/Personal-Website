import { useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
import ScrollExpand from "./reactbits/ScrollExpand";

const ProjectChapter = ({ project }: { project: Project }) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: bodyRef, offset: ["start center", "end center"] });
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  useMotionValueEvent(scrollYProgress, "change", (value) => setStep(Math.min(2, Math.floor(Math.max(0, value) * 3))));

  return (
    <article id={project.id} className="project-chapter page-width section-wrap" style={{ "--project-accent": project.accent } as CSSProperties}>
      <header className="project-chapter-heading">
        <div className="project-heading-meta"><span className="eyebrow">{project.number} / {project.category}</span><span className="project-status">{project.status}</span></div>
        <motion.h3 initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>{project.title}</motion.h3>
        <p>{project.summary}</p>
        <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </header>
      <div ref={bodyRef} className="project-chapter-body">
        <div className="project-visual-sticky">
          <motion.div style={{ scale: reduced ? 1 : scale }}><ProjectVisual project={project} step={step} /></motion.div>
          <p className="project-visual-caption">{project.shortTitle}</p>
        </div>
        <div className="project-narrative">
          {project.steps.map((item, index) => (
            <motion.section key={item.label} className="project-story-step"
              initial={{ opacity: 0.25, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }} transition={{ duration: 0.55 }}>
              <p className="eyebrow"><span>0{index + 1}</span> {item.label}</p>
              <h4>{item.title}</h4>
              <p className="project-story-copy">{item.text}</p>
              <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
            </motion.section>
          ))}
        </div>
      </div>
      <footer className="project-chapter-footer">
        <p>{project.note}</p>
        {project.href ? <a className="project-repo-link" href={project.href} target="_blank" rel="noopener noreferrer">Explore the repository <ArrowUpRight size={19} /></a>
          : <a className="project-repo-link" href="#contact">Talk about this project <ArrowUpRight size={19} /></a>}
      </footer>
    </article>
  );
};

const ProjectsSection = () => (
  <section id="projects" className="projects-section section-wrap">
    <ScrollExpand title="Ideas into impact." media={
      <div className="work-universe" aria-hidden="true">
        <div className="universe-orbit orbit-one" /><div className="universe-orbit orbit-two" /><div className="universe-orbit orbit-three" />
        <div className="universe-core"><span>R</span></div>
        <span className="universe-coordinate coordinate-one">VISION</span>
        <span className="universe-coordinate coordinate-two">INTELLIGENCE</span>
        <span className="universe-coordinate coordinate-three">REAL-WORLD SYSTEMS</span>
      </div>
    }>
      <p className="eyebrow">02 / SELECTED WORK</p>
      <h2>Built to see.<br />Designed to <em>understand.</em></h2>
      <p>Three explorations at the intersection of software, intelligence and the physical world.</p>
    </ScrollExpand>
    <nav className="project-index page-width" aria-label="Project chapters">
      <span>EXPLORE THE WORK <ArrowDown size={14} /></span>
      {projects.map(project => <a key={project.id} href={`#${project.id}`}><span>{project.number}</span>{project.id === "scrap" ? "Scrap inspection" : project.id === "border" ? "Border-Sense" : "Thermal controller"}<ArrowUpRight size={14} /></a>)}
    </nav>
    {projects.map(project => <ProjectChapter key={project.id} project={project} />)}
  </section>
);

export default ProjectsSection;
