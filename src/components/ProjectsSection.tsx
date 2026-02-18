import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Project Alpha",
    description: "A web application built with React and TypeScript",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Project Beta",
    description: "Mobile-first dashboard with real-time data",
    tags: ["Next.js", "Supabase", "Charts"],
  },
  {
    title: "Project Gamma",
    description: "E-commerce platform with seamless checkout",
    tags: ["Node.js", "Stripe", "PostgreSQL"],
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-28 px-6">
    <div className="max-w-4xl mx-auto">
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
          <motion.a
            key={project.title}
            href="#"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i + 0.2 }}
            whileHover={{ x: 6 }}
            className="group flex items-start justify-between bg-card border border-border rounded-xl p-6 hover:border-primary/20 hover:box-glow transition-all duration-300"
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
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-secondary text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-1 flex-shrink-0 ml-4" />
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
