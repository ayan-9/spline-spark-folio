import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectModal from "./ProjectModal";
import { Gamepad2, Play } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  users: string;
  level: string;
  technologies: string[];
  features: string[];
  launchDate: string;
  videoUrl?: string;
  idealFor: string[];
}

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    {
      id: "1",
      title: "Musa Escape",
      description: "C Game Project with graphics - A story-based console puzzle game",
      longDescription: "Musa Escape is a story-based console game developed in C, where a child named Musa is alone in his house after his parents leave. The house contains 7 different rooms, each filled with riddles, puzzles, and logical challenges. The goal is to help Musa overcome his fear, solve the riddles, and find a way out of the house.\n\nThis project is designed to demonstrate strong programming logic, game flow control, and problem-solving skills, making it an excellent academic and portfolio-level project.",
      price: "Paid",
      duration: "Self-paced",
      users: "500+",
      level: "Beginner to Intermediate",
      technologies: [
        "C",
        "Object-Oriented Programming (OOP)",
        "Data Structures",
        "Functions & Control Flow",
        "File Handling",
        "Game Logic & Algorithms"
      ],
      features: [
        "Story-driven game design in C",
        "Implementation of riddles and puzzles",
        "Use of OOP concepts (classes, objects, encapsulation)",
        "Decision-making using conditions and loops",
        "Room-based game navigation logic",
        "User interaction via console",
        "Code structuring for large programs",
        "Logical thinking and debugging skills"
      ],
      launchDate: "2025",
      videoUrl: "/videos/musa-escape-demo.mp4",
      idealFor: [
        "C learners",
        "University students",
        "DSA & OOP practice",
        "Final-year or semester projects"
      ]
    }
  ];

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                My Projects
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore my projects showcasing programming skills and creative problem-solving
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {projects.map((project, index) => (
              <GlassCard 
                key={project.id} 
                variant="course" 
                className="group cursor-pointer animate-fade-in hover:scale-105 transition-all duration-300 max-w-sm w-full"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => openProjectModal(project)}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Gamepad2 className="text-primary group-hover:text-secondary transition-colors" size={24} />
                    <Badge 
                      variant="secondary" 
                      className="bg-primary/20 text-primary border-primary/30"
                    >
                      {project.level}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="text-xs bg-card/30 text-foreground border-card-border"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs bg-card/30 text-muted-foreground border-card-border"
                      >
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-card-border">
                    <div className="text-sm text-muted-foreground">
                      {project.users} users
                    </div>
                    <div className="text-lg font-bold text-secondary">
                      {project.price}
                    </div>
                  </div>

                  <Button 
                    variant="glass" 
                    size="sm" 
                    className="w-full group-hover:bg-primary/20 transition-colors"
                  >
                    <Play size={14} className="mr-2" />
                    View Details
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </>
  );
};

export default ProjectsSection;
