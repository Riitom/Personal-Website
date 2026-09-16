import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useSceneScroll as useScroll } from "@/hooks/useSceneScroll";
import { ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 10%"] });
  const reveal = useTransform(scrollYProgress, [0.15, 0.85], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return (
    <section ref={ref} id="contact" className="contact-chapter section-wrap">
      <div className="contact-stage page-width">
        <div className="contact-opening"><p className="eyebrow">03 / THE NEXT CHAPTER</p><span>GOOD THINGS START WITH A CONVERSATION.</span></div>
        <h2 className="contact-title">The next idea.<br /><span className="contact-title-reveal"><span aria-hidden="true">Let’s build it.</span><motion.em style={{ clipPath: reduced ? "none" : reveal }}>Let’s build it.</motion.em></span></h2>
        <div className="contact-bottom">
          <div><p className="contact-intro">An interesting problem. A product worth building. Or a shared curiosity about AI and what comes next.</p><p className="contact-availability">Open to opportunities, collaborations and conversations.</p></div>
          <div className="contact-links">
            <a className="contact-email" href="https://mail.google.com/mail/?view=cm&fs=1&to=riitom09@gmail.com" target="_blank" rel="noopener noreferrer"><span>Start a conversation<small>riitom09@gmail.com</small></span><ArrowUpRight size={28} aria-hidden="true" /></a>
            <div className="contact-elsewhere"><a href="https://github.com/Riitom" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/riitom-modak-b018a131a/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
