import { useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { useSceneScroll as useScroll } from "@/hooks/useSceneScroll";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
import ScrollExpand from "./reactbits/ScrollExpand";
import ChapterTitle from "./reactbits/ChapterTitle";

const questions = {
  scrap: "How much can a camera tell us about scrap?",
  border: "When does movement become a meaningful event?",
  thermal: "Could a room adapt before you reach for the remote?",
};

const ProjectStep = ({ item, index }: { item: Project["steps"][number]; index: number }) => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 40%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  return <motion.section ref={ref} className="project-story-step" style={{ opacity: reduced ? 1 : opacity }}>
    <motion.span className="project-step-rule" aria-hidden="true" style={{ scaleX: reduced ? 1 : scrollYProgress }} />
    <p className="eyebrow"><span>0{index + 1}</span> {item.label}</p>
    <h4>{item.title}</h4>
    <p className="project-story-copy">{item.text}</p>
    <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
  </motion.section>;
};

const ProjectChapter = ({ project }: { project: Project }) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: bodyRef, offset: ["start center", "end center"] });
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  useMotionValueEvent(scrollYProgress, "change", (value) => setStep(previous => {
    const next = Math.min(2, Math.floor(Math.max(0, value) * 3));
    // A small dead band keeps a resting wheel from flickering between stages.
    if (next > previous && value > next / 3 + 0.012) return next;
    if (next < previous && value < previous / 3 - 0.012) return next;
    return previous;
  }));

  return (
    <article id={project.id} className="project-chapter page-width section-wrap" style={{ "--project-accent": project.accent } as CSSProperties}>
      <header className="project-chapter-heading">
        <div className="project-heading-meta"><span className="eyebrow">{project.number} / {project.category}</span><span className="project-status">{project.status}</span></div>
        <p className="project-hook">{questions[project.id]}</p>
        <ChapterTitle>{project.title}</ChapterTitle>
        <p>{project.summary}</p>
        <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </header>
      <div ref={bodyRef} className="project-chapter-body">
        <div className="project-visual-sticky">
          <motion.div style={{ scale: reduced ? 1 : scale }}><ProjectVisual project={project} step={step} progress={scrollYProgress} /></motion.div>
          <p className="project-visual-caption">{project.shortTitle}</p>
        </div>
        <div className="project-narrative">
          {project.steps.map((item, index) => <ProjectStep key={item.label} item={item} index={index} />)}
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
