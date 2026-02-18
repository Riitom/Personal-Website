import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const FooterSection = () => (
  <footer className="py-16 px-6 border-t border-border">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold font-heading mb-4"
      >
        Let's <span className="text-primary text-glow">Connect</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground mb-8"
      >
        Currently open to opportunities. Let's build something awesome together.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-4"
      >
        {[
          { icon: Github, href: "#", label: "GitHub" },
          { icon: Linkedin, href: "#", label: "LinkedIn" },
          { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="p-3 rounded-xl bg-card border border-border hover:box-glow hover:border-primary/30 transition-all duration-300"
            aria-label={link.label}
          >
            <link.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
        ))}
      </motion.div>
      <p className="text-xs text-muted-foreground mt-12 font-mono">
        built with ❤️ and too much caffeine
      </p>
    </div>
  </footer>
);

export default FooterSection;
