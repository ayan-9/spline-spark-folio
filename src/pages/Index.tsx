import SplineBackground from "@/components/SplineBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <SplineBackground />
      
      {/* Content overlay */}
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <CoursesSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
