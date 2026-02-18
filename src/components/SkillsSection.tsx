import { motion } from "framer-motion";
import { Code2, Brain, Globe, Zap } from "lucide-react";

const skills = [
  { icon: Code2, label: "Languages", items: ["JavaScript", "TypeScript", "Python", "C++"], color: "text-primary" },
  { icon: Brain, label: "DSA", items: ["Arrays", "Trees", "Graphs", "DP"], color: "text-primary" },
  { icon: Globe, label: "Web Dev", items: ["React", "HTML/CSS", "Node.js", "Tailwind"], color: "text-primary" },
  { icon: Zap, label: "Tools", items: ["Git", "VS Code", "Linux", "Docker"], color: "text-primary" },
];

const SkillsSection = () => (
  <section className="py-24 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold font-heading text-center mb-16"
      >
        What I <span className="text-primary text-glow">Work With</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className="bg-card border border-border rounded-xl p-6 hover:box-glow transition-shadow duration-300"
          >
            <skill.icon className={`w-8 h-8 ${skill.color} mb-4`} />
            <h3 className="text-lg font-semibold font-heading mb-3">{skill.label}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
