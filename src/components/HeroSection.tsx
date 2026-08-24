import { motion } from "framer-motion";
import { Mail, MapPin, Briefcase } from "lucide-react";
import GradientText from "./reactbits/GradientText";
import Prism from "./reactbits/Prism";
import TextPressure from "./reactbits/TextPressure";

const GitHubMark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .55a11.45 11.45 0 0 0-3.62 22.31c.57.1.78-.24.78-.55v-2.1c-3.19.69-3.86-1.36-3.86-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.95 10.95 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.24 2.75.12 3.04.73.8 1.17 1.83 1.17 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.16v3.2c0 .31.2.66.79.55A11.45 11.45 0 0 0 12 .55Z" />
  </svg>
);

const LinkedInMark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V8.99h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.57V8.99H3.56v11.46Z" />
  </svg>
);

const HeroSection = () => {
  return (
    <section className="hero-section min-h-screen flex flex-col justify-center px-5 sm:px-6 pt-24 pb-16 relative">
      <div className="hero-grid" aria-hidden="true" />
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="hero-name-stage"
        >
          <div className="hero-prism-shell">
            <Prism />
          </div>
          <TextPressure text="RIITOM MODAK" accentIndex={7} minFontSize={46} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.65 }}
          className="hero-domain-line"
        >
          <GradientText>AI · MACHINE LEARNING · COMPUTER VISION</GradientText>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.7 }}
          className="hero-intro text-lg md:text-xl max-w-2xl mb-9 leading-relaxed"
        >
          An aspiring developer building thoughtful AI, machine learning, and computer vision experiences with Python.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.7 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          <span className="glass-pill inline-flex items-center gap-2 px-3.5 py-2 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" /> Kolkata
          </span>
          <span className="glass-pill glass-pill-active inline-flex items-center gap-2 px-3.5 py-2 text-sm text-primary font-medium">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Open to work
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56, duration: 0.7 }}
          className="flex items-center gap-3"
        >
          <a
            href="https://github.com/Riitom"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub profile"
          >
            <GitHubMark />
          </a>
          <a
            href="https://www.linkedin.com/in/riitom-modak-b018a131a/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn profile"
          >
            <LinkedInMark />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=riitom09@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Email Riitom"
          >
            <Mail />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="scroll-cue w-5 h-9 rounded-full flex items-start justify-center pt-2"
        >
          <div className="w-1 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
