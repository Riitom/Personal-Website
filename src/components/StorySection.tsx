import { motion } from "framer-motion";
import { Cpu, Aperture, Code2 } from "lucide-react";
import SkillBento from "./reactbits/SkillBento";
import ScrollWords from "./reactbits/ScrollWords";

const chapters = [
  {
    number: "01", label: "THE CURIOSITY", icon: Cpu,
    text: "I’m Riitom. A computer science student who has always wanted to understand what makes things work.",
    detail: "I’m studying B.Tech in Computer Science and Engineering. From building PCs to exploring new technology and mechanical systems, I’m drawn to the relationship between the parts and the whole.",
    tags: ["B.Tech · CSE", "Kolkata, India", "Hardware + software"],
  },
  {
    number: "02", label: "THE DIRECTION", icon: Code2,
    text: "Python is where I feel at home. AI, machine learning and computer vision are where I want to go.",
    detail: "I enjoy turning ideas into practical systems: a model that can see, a backend that makes it useful, and an interface that makes it understandable. I’m building toward a career in AI, ML and data science, with a particular interest in product teams.",
    tags: ["Python first", "Applied AI", "Product thinking"],
  },
  {
    number: "03", label: "BEYOND THE SCREEN", icon: Aperture,
    text: "Away from code, you’ll find the same curiosity. In a camera frame, on a bike ride, or under the hood.",
    detail: "Photography makes me pay attention to small details. Cars, bikes and machines keep me interested in how good engineering feels in the real world. Those interests shape the way I observe, experiment and build.",
    tags: ["Photography", "Cars + motorcycles", "Always exploring"],
  },
];

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Python", "FastAPI", "SQLite", "REST APIs"] },
  { category: "Languages", items: ["Python", "C", "C++", "Java"] },
  { category: "AI & tools", items: ["YOLO", "PyTorch", "Ultralytics", "Git"] },
];

const StorySection = () => (
  <section id="about" className="story-section section-wrap">
    <div className="story-layout page-width">
      <div className="story-aside">
        <p className="eyebrow">01 / THE PERSON</p>
        <h2>A little<br />more <em>human.</em></h2>
        <p>Curiosity is the thread.<br />Technology is how I follow it.</p>
        <span className="story-aside-line" aria-hidden="true" />
      </div>
      <div className="story-chapters">
        {chapters.map(({ number, label, text, detail, tags, icon: Icon }) => (
          <article key={number} className="story-chapter">
            <div className="story-chapter-label"><Icon size={17} strokeWidth={1.4} /><span>{label}</span><span>{number}</span></div>
            <ScrollWords text={text} />
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }}>
              <p className="story-detail">{detail}</p>
              <div className="story-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </motion.div>
          </article>
        ))}
      </div>
    </div>
    <div className="skills-chapter page-width">
      <div className="skills-heading"><p className="eyebrow">MY WORKBENCH</p><h3>The tools behind the ideas.</h3></div>
      <SkillBento groups={skills} />
    </div>
  </section>
);

export default StorySection;
