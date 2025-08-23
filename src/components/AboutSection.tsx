import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Rocket, Zap } from "lucide-react";

const AboutSection = () => {
  const skills = [
    "C", "C++", "Python", "HTML", "CSS", "Java", 
    "React", "Tailwind CSS", "Next.js", "Three.js"
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
              My journey in technology began with a deep curiosity about how software works and the impact it can create. Choosing to pursue a degree in Computer Science and Information Technology (CSIT) has been the foundation of my growth, giving me exposure to both theory and practical aspects of computing. From understanding logic building to exploring the fundamentals of programming, every step has fueled my interest in solving problems through code.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Over time, I have gained hands-on experience with multiple programming languages including C, C++, Python, Java, HTML, and CSS. Each project and challenge I've taken on has shaped me into a more confident developer, capable of adapting to different technologies. My goal is to keep learning, building, and innovating — turning ideas into solutions that not only work but inspire others as well.
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