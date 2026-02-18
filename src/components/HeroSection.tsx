import { motion } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Floating grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono text-primary">Ready to Work</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold font-heading mb-4 text-foreground"
        >
          Hey, I'm{" "}
          <span className="text-primary text-glow-strong">Developer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
        >
          An enthusiastic coder learning various languages, passionate about
          Data Structures & Algorithms, and building cool things.
        </motion.p>

        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="max-w-lg mx-auto bg-card border border-border rounded-xl p-5 text-left font-mono text-sm box-glow"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-[hsl(45,93%,47%)]" />
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
          <TypingLine delay={1.0} text='> const me = "Enthusiastic Coder";' />
          <TypingLine delay={2.2} text='> const interests = ["DSA", "Web Dev", "Problem Solving"];' />
          <TypingLine delay={3.6} text='> const status = "🟢 Ready to Work";' />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5 }}
            className="flex items-center gap-1 text-primary mt-1"
          >
            <ChevronRight className="w-4 h-4" />
            <span className="animate-pulse">_</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const TypingLine = ({ text, delay }: { text: string; delay: number }) => (
  <motion.p
    initial={{ opacity: 0, width: 0 }}
    animate={{ opacity: 1, width: "100%" }}
    transition={{ delay, duration: 0.8 }}
    className="text-muted-foreground overflow-hidden whitespace-nowrap"
  >
    {text}
  </motion.p>
);

export default HeroSection;
