import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LiquidBackdrop from "@/components/LiquidBackdrop";
import ClickSpark from "@/components/reactbits/ClickSpark";

const Index = () => (
  <ClickSpark>
    <div className="site-shell min-h-screen text-foreground transition-colors duration-500">
      <LiquidBackdrop />
      <Navbar />
      <main className="relative z-10 overflow-hidden">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  </ClickSpark>
);

export default Index;
