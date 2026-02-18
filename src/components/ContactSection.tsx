import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-28 px-6">
    <div className="max-w-4xl mx-auto text-center">
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
        href="mailto:riitom09@Gmail.com"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:box-glow-strong transition-all duration-300"
      >
        <Mail className="w-4 h-4" />
        Get in touch
      </motion.a>
    </div>
  </section>
);

export default ContactSection;
