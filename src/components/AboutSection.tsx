import { motion } from "framer-motion";
import ScrollReveal from "./reactbits/ScrollReveal";
import SkillBento from "./reactbits/SkillBento";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"] },
  { category: "Backend", items: ["Python", "FastAPI", "SQLite", "REST APIs"] },
  { category: "Languages", items: ["Python", "C", "C++", "Java", "TypeScript"] },
  { category: "Tools", items: ["Git", "VS Code", "YOLO", "PyTorch", "Ultralytics"] },
];

const AboutSection = () => (
  <section id="about" className="py-12 md:py-16 px-5 sm:px-6 section-wrap">
    <div className="max-w-5xl mx-auto glass-panel section-panel">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-label mb-3"
      >
        // about
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold font-heading mb-8"
      >
        A bit about me
      </motion.h2>

      <ScrollReveal className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-3xl">
        I’m a B.Tech Computer Science and Engineering student and a tech enthusiast with a strong interest in AI and machine learning. I enjoy building practical, Python-driven projects that connect software, data, computer vision, and real-world problem solving.
      </ScrollReveal>

      <SkillBento groups={skills} />
    </div>
  </section>
);

export default AboutSection;
