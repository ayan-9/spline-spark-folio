import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CourseModal from "./CourseModal";
import { BookOpen, Play } from "lucide-react";

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

const CoursesSection = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const courses: Course[] = [
    {
      id: "1",
      title: "Modern React Development",
      description: "Master React 18+ with hooks, context, and modern patterns",
      longDescription: "Dive deep into modern React development with this comprehensive course. You'll learn React 18+ features, advanced hooks, state management, performance optimization, and build real-world applications. Perfect for developers who want to level up their React skills.",
      price: "$99",
      duration: "12 weeks",
      students: "2,500+",
      level: "Intermediate",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
      features: [
        "React 18+ features and concurrent rendering",
        "Advanced hooks and custom hook creation",
        "State management with Context and Zustand",
        "Performance optimization techniques",
        "Server-side rendering with Next.js",
        "Building responsive UIs with Tailwind CSS",
        "Adding animations with Framer Motion",
        "Testing with Jest and React Testing Library"
      ],
      launchDate: "Jan 2024",
      url: "https://example.com/react-course"
    },
    {
      id: "2",
      title: "3D Web Development",
      description: "Create stunning 3D experiences with Three.js and WebGL",
      longDescription: "Learn to create immersive 3D web experiences using Three.js, WebGL, and modern web technologies. This course covers everything from basic 3D concepts to advanced rendering techniques and interactive animations.",
      price: "$149",
      duration: "16 weeks",
      students: "1,200+",
      level: "Advanced",
      technologies: ["Three.js", "WebGL", "GLSL", "Blender", "React Three Fiber"],
      features: [
        "3D fundamentals and coordinate systems",
        "Three.js scene setup and rendering",
        "Working with geometries, materials, and lights",
        "Creating animations and interactions",
        "GLSL shader programming",
        "Optimizing 3D performance",
        "Integrating with React Three Fiber",
        "Building portfolio-worthy projects"
      ],
      launchDate: "Mar 2024",
      url: "https://example.com/3d-course"
    },
    {
      id: "3",
      title: "Full-Stack TypeScript",
      description: "Build scalable applications with TypeScript, Node.js, and PostgreSQL",
      longDescription: "Master full-stack development with TypeScript. Learn to build robust backends with Node.js, work with databases, create APIs, and integrate everything with modern frontend frameworks. Perfect for developers who want to work across the entire stack.",
      price: "$199",
      duration: "20 weeks",
      students: "3,100+",
      level: "Intermediate",
      technologies: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Docker"],
      features: [
        "TypeScript fundamentals and advanced types",
        "Building REST APIs with Express",
        "Database design and management with PostgreSQL",
        "ORM with Prisma for type-safe database access",
        "Authentication and authorization",
        "Testing strategies for full-stack applications",
        "Deployment with Docker and cloud platforms",
        "Real-time features with WebSockets"
      ],
      launchDate: "Feb 2024",
      url: "https://example.com/fullstack-course"
    }
  ];

  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeCourseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                My Courses
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive courses designed to help developers master modern web technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <GlassCard 
                key={course.id} 
                variant="course" 
                className="group cursor-pointer animate-fade-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => openCourseModal(course)}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <BookOpen className="text-primary group-hover:text-secondary transition-colors" size={24} />
                    <Badge 
                      variant="secondary" 
                      className="bg-primary/20 text-primary border-primary/30"
                    >
                      {course.level}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.technologies.slice(0, 3).map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="text-xs bg-card/30 text-foreground border-card-border"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {course.technologies.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs bg-card/30 text-muted-foreground border-card-border"
                      >
                        +{course.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-card-border">
                    <div className="text-sm text-muted-foreground">
                      {course.students} students
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {course.price}
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

      <CourseModal 
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={closeCourseModal}
      />
    </>
  );
};

export default CoursesSection;