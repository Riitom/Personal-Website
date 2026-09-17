import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useSceneScroll as useScroll } from "@/hooks/useSceneScroll";
import { ArrowDown, ArrowUpRight, Mail, MapPin, Briefcase } from "lucide-react";
import GradientText from "./reactbits/GradientText";
import Prism from "./reactbits/Prism";
import TextPressure from "./reactbits/TextPressure";
import { socialLinks } from "@/data/socials";

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
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.08, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="cinematic-hero">
      <div className="hero-sticky-stage">
        <div className="hero-prism-background">
          <Prism animationType="rotate" timeScale={0.5} height={3.5} baseWidth={5.5}
            scale={3.6} hueShift={0} colorFrequency={1} noise={0.012} glow={1}
            maxDpr={1.5} maxPixels={1500000} suspendWhenOffscreen />
        </div>
        <div className="hero-cinematic-shade" aria-hidden="true" />
        <motion.div className="hero-editorial page-width" style={{ opacity: reduced ? 1 : opacity }}>
          <motion.p className="hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <span className="hero-status-dot" /> A CURIOUS MIND. A BUILDER AT HEART.
          </motion.p>
          <motion.div className="hero-name-stage" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <TextPressure text="RIITOM MODAK" accentIndex={7} minFontSize={28} />
          </motion.div>
          <div className="hero-bottom-grid">
            <div>
              <div className="hero-domain-line"><GradientText>AI · MACHINE LEARNING · COMPUTER VISION</GradientText></div>
              <p className="hero-editorial-intro">Turning curiosity into code.<br />And code into things that matter.</p>
              <div className="hero-meta"><span><MapPin size={13} /> Kolkata, India</span><span><Briefcase size={13} /> Open to opportunities</span></div>
              <a className="hero-work-link" href="#projects">Explore my work <ArrowUpRight size={18} /></a>
            </div>
            <div className="hero-socials">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub profile"><GitHubMark /></a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn profile"><LinkedInMark /></a>
              <a href={socialLinks.email} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Email Riitom"><Mail /></a>
            </div>
          </div>
        </motion.div>
        <div className="hero-bottom-rail page-width"><a href="#about">SCROLL TO DISCOVER <ArrowDown size={14} /></a><span>PORTFOLIO / RIITOM MODAK</span></div>
      </div>
    </section>
  );
};

export default HeroSection;
