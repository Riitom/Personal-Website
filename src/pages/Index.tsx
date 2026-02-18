import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
