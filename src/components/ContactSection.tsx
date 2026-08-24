import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-12 md:py-16 px-5 sm:px-6 section-wrap">
    <div className="max-w-5xl mx-auto glass-panel contact-panel text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-label mb-3"
      >
        // contact
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold font-heading mb-4"
      >
        Let's work together.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
      >
        Feel free to reach out if you'd like to collaborate or just say hello.
      </motion.p>

      <motion.a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=riitom09@gmail.com"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="liquid-button inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
      >
        <Mail className="w-4 h-4" />
        Mail me
      </motion.a>
    </div>
  </section>
);

export default ContactSection;
