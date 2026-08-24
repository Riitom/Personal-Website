import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BorderGlow from "./reactbits/BorderGlow";

const projects = [
  {
    title: "AI-Assisted Scrap Detection And Weight Estimation",
    description:
      "AI-powered scrap inspection system that uses a YOLO model, FastAPI, and React to detect materials, estimate weight ranges, and keep auditable inspection history.",
    tags: ["Python", "YOLO", "FastAPI", "React"],
    href: "https://github.com/Riitom/AI-Assisted-Scrap-Detection-And-Weight-Estimation",
  },
  {
    title: "Project Beta",
    description: "A responsive personal portfolio website built with React, TypeScript, and Tailwind CSS.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    href: "https://github.com/Riitom/Personal-Website",
  },
  {
    title: "Project Gamma",
    description: "Smart room temperature monitoring and controlling system using Machine Learning",
    tags: ["Python", "Raspberry Pi", "TensorFlow"],
    href: "#",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-12 md:py-16 px-5 sm:px-6 section-wrap">
    <div className="max-w-5xl mx-auto glass-panel section-panel">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-label mb-3"
      >
        // projects
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold font-heading mb-12"
      >
        Things I've built
      </motion.h2>

      <div className="grid gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 25, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i + 0.2 }}
            whileHover={{ y: -6, scale: 1.008 }}
          >
            <BorderGlow>
              <a
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="project-card group flex items-start justify-between rounded-2xl p-6"
              >
                <div>
                  <h3 className="text-lg font-semibold font-heading mb-1.5 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="skill-tag px-2.5 py-1 rounded-md text-xs font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-1 flex-shrink-0 ml-4" />
              </a>
            </BorderGlow>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
