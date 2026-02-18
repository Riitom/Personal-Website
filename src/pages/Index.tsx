import ThemeToggle from "@/components/ThemeToggle";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
    <ThemeToggle />
    <HeroSection />
    <SkillsSection />
    <FooterSection />
  </div>
);

export default Index;
