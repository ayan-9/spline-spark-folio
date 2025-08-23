import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Rocket, Zap } from "lucide-react";

const AboutSection = () => {
  const skills = [
    "React", "TypeScript", "Node.js", "Python", "Three.js", "WebGL",
    "Next.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker",
    "Tailwind CSS", "Framer Motion", "GraphQL", "REST APIs"
  ];

  const features = [
    {
      icon: <Code className="text-primary" size={24} />,
      title: "Full-Stack Development",
      description: "Building scalable applications from frontend to backend with modern technologies."
    },
    {
      icon: <Palette className="text-secondary" size={24} />,
      title: "3D & Interactive Design",
      description: "Creating immersive experiences with Three.js, WebGL, and creative coding."
    },
    {
      icon: <Rocket className="text-primary" size={24} />,
      title: "Performance Optimization",
      description: "Delivering lightning-fast applications with optimized code and best practices."
    },
    {
      icon: <Zap className="text-secondary" size={24} />,
      title: "Innovation & Learning",
      description: "Constantly exploring new technologies and pushing the boundaries of web development."
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate developer with a love for creating digital experiences that inspire and engage
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <GlassCard variant="default" className="animate-slide-in">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">My Journey</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              With over 5 years of experience in web development, I've had the privilege of working 
              on diverse projects ranging from e-commerce platforms to interactive art installations. 
              My passion lies in the intersection of technology and creativity.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              I believe in writing clean, maintainable code and creating user experiences that not 
              only look beautiful but also perform exceptionally well. Every project is an opportunity 
              to learn something new and push the boundaries of what's possible on the web.
            </p>
          </GlassCard>

          <GlassCard variant="default" className="animate-slide-in">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="bg-card/30 text-foreground border border-card-border hover:bg-card/50 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <GlassCard 
              key={feature.title} 
              variant="default" 
              className="text-center hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h4 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h4>
              <p className="text-sm text-foreground/70">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;