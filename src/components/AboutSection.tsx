import { motion } from "framer-motion";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python"] },
  { category: "Languages", items: ["C", "C++", "Java"] },
  { category: "Tools", items: ["Git", "VS Code", "Linux"] },
];

const AboutSection = () => (
  <section id="about" className="py-28 px-6">
    <div className="max-w-4xl mx-auto">
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

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-2xl"
      >
        I'm an enthusiastic coder passionate about building products that are both 
        beautiful and functional. Currently learning various programming languages 
        and deeply interested in <span className="text-primary font-medium">Data Structures & Algorithms</span>. 
        I love solving complex problems and turning ideas into reality with clean code.
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i + 0.3 }}
            className="bg-card border border-border rounded-xl p-4 hover:border-primary/20 hover:box-glow transition-all duration-300"
          >
            <h3 className="text-xs font-mono text-primary mb-3 uppercase tracking-wider">{group.category}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-secondary text-muted-foreground"
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

export default AboutSection;
