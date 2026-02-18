import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Briefcase } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="section-label mb-4"
        >
          Hi, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading mb-6 leading-tight"
        >
          Riitom <span className="text-primary text-glow-strong">Modak</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed"
        >
          I’m an enthusiastic learner and aspiring developer, passionate about creating interactive experiences and growing through code. 
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" /> Kolkata
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Open to work
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-3"
        >
          {[
            { icon: Github, href: "https://github.com/Riitom", label: "GH" },
            { icon: Linkedin, href: "https://www.linkedin.com/authwall?trk=gf&trkInfo=AQGXhoEmvSdULwAAAZxxJI34x72LTjfP9p8tS4a-MfHKp0ygY0RuinDfpEpRokAJxrT4lyHl6e8ZUoiYtrd-N3yw1NNcntfsrKe1p3s7oNIbjda1lS_afBQLibYLbtn9Y3kFa_Q=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Friitom-modak-b018a131a%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app", label: "LI" },
            { icon: Mail, href: "mailto:riitom09@Gmail.com", label: "Email" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:box-glow transition-all duration-300 group"
              aria-label={link.label}
            >
              <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
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
          className="w-5 h-9 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
