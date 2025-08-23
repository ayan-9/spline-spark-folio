import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Users, Clock } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  students: string;
  level: string;
  technologies: string[];
  features: string[];
  launchDate: string;
  url: string;
}

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

const CourseModal = ({ course, isOpen, onClose }: CourseModalProps) => {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-xl border border-card-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {course.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              {course.level}
            </Badge>
            <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
              {course.price}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center text-primary">
                <Clock size={16} />
              </div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">{course.duration}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center text-secondary">
                <Users size={16} />
              </div>
              <p className="text-sm text-muted-foreground">Students</p>
              <p className="font-semibold text-foreground">{course.students}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center text-primary">
                <Calendar size={16} />
              </div>
              <p className="text-sm text-muted-foreground">Launched</p>
              <p className="font-semibold text-foreground">{course.launchDate}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">About This Course</h3>
            <p className="text-foreground/80 leading-relaxed">{course.longDescription}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Technologies Covered</h3>
            <div className="flex flex-wrap gap-2">
              {course.technologies.map((tech) => (
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
            <h3 className="text-lg font-semibold mb-3 text-foreground">What You'll Learn</h3>
            <ul className="space-y-2">
              {course.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="hero" 
              className="flex-1 group"
              asChild
            >
              <a href={course.url} target="_blank" rel="noopener noreferrer">
                View Course
                <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </a>
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;