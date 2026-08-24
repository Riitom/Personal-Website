import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LiquidBackdrop from "@/components/LiquidBackdrop";
import ClickSpark from "@/components/reactbits/ClickSpark";
import GradualBlur from "@/components/reactbits/GradualBlur";

const Index = () => (
  <ClickSpark>
    <div className="site-shell min-h-screen text-foreground transition-colors duration-500">
      <LiquidBackdrop />
      <GradualBlur
        target="page"
        position="bottom"
        height="5.5rem"
        strength={1.55}
        divCount={7}
        curve="bezier"
        exponential
        opacity={0.86}
        animated="scroll"
        duration="0.45s"
        zIndex={-60}
        className="scroll-gradual-blur"
      />
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
