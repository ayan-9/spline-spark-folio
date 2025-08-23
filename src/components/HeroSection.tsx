import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowDown, Sparkles } from "lucide-react";

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <GlassCard variant="hero" size="hero" className="animate-fade-in">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="text-primary animate-glow-pulse" size={24} />
                <span className="text-sm uppercase tracking-wider text-muted-foreground">
                  Welcome to my digital universe
                </span>
                <Sparkles className="text-secondary animate-glow-pulse" size={24} />
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent animate-glow-pulse">
                  Muhammad Ayan
                </span>
                {" "}
                <span className="text-foreground">
                  Anwer
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                CSIT Student & Software Developer
              </p>
            </div>

            <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Pursuing CSIT degree, skilled in C, C++, Python, Java, HTML, CSS; passionate about software development, problem-solving, and innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                variant="hero" 
                size="hero"
                onClick={scrollToAbout}
                className="group"
              >
                Explore My Work
                <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" size={20} />
              </Button>
              
              <Button 
                variant="glass" 
                size="hero"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Connect
              </Button>
            </div>
          </div>
        </GlassCard>

        <div className="mt-12 animate-float">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;