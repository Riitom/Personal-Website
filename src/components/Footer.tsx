import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="py-8 px-6 border-t border-border"
  >
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
      <span>© 2026</span>
      <span>Built with care ❤️</span>
    </div>
  </motion.footer>
);

export default Footer;
