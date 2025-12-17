import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, MessageCircle, Play, X } from "lucide-react";
import { useState } from "react";

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

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!project) return null;

  const handleClose = () => {
    setShowVideo(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl border border-card-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Section */}
          {showVideo && project.videoUrl ? (
            <div className="relative rounded-lg overflow-hidden bg-black">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-background/50 hover:bg-background/80"
                onClick={() => setShowVideo(false)}
              >
                <X size={16} />
              </Button>
              <video 
                controls 
                autoPlay 
                className="w-full aspect-video"
                src={project.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : project.videoUrl ? (
            <Button 
              variant="hero" 
              className="w-full group"
              onClick={() => setShowVideo(true)}
            >
              <Play className="mr-2 group-hover:scale-110 transition-transform" size={18} />
              Watch Demo Video
            </Button>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              {project.level}
            </Badge>
            <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
              {project.price}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center text-primary">
                <Clock size={16} />
              </div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">{project.duration}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center text-secondary">
                <Users size={16} />
              </div>
              <p className="text-sm text-muted-foreground">Users</p>
              <p className="font-semibold text-foreground">{project.users}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center text-primary">
                <Calendar size={16} />
              </div>
              <p className="text-sm text-muted-foreground">Launched</p>
              <p className="font-semibold text-foreground">{project.launchDate}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">About This Project</h3>
            <p className="text-foreground/80 leading-relaxed">{project.longDescription}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Technologies & Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="bg-card/30 text-foreground border-card-border"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">What You'll Learn / Experience</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Ideal For</h3>
            <div className="flex flex-wrap gap-2">
              {project.idealFor.map((item) => (
                <Badge 
                  key={item} 
                  variant="outline" 
                  className="bg-primary/10 text-primary border-primary/30"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="hero" 
              className="flex-1 group"
              asChild
            >
              <a href="#contact">
                Contact to Buy
                <MessageCircle className="ml-2 group-hover:scale-110 transition-transform" size={16} />
              </a>
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
