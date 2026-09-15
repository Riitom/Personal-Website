import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import GooeyNav from "./reactbits/GooeyNav";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav glass-nav-scrolled" : "glass-nav hero-nav"
      }`}
    >
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="page-width nav-inner flex items-center justify-between py-4">
        <a href="#" className="font-heading font-bold text-lg text-foreground hover:text-primary transition-colors">
          riitom<span className="text-primary">.dev</span>
        </a>
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <GooeyNav items={navLinks} />
          </div>
          <ThemeToggle />
        </div>
      </div>
      <div className="mobile-nav" aria-label="Section navigation">
        {navLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
      </div>
    </motion.nav>
  );
};

export default Navbar;
