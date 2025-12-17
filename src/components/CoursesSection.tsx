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
      title: "C++ Programming",
      description: "Notes, explanations, practice problems for quizzes and exams",
      longDescription: "Comprehensive C++ programming course with detailed notes, explanations, and practice problems. Perfect for students preparing for quizzes and exams. Covers fundamental concepts to advanced topics with hands-on coding exercises.",
      price: "Free",
      duration: "Self-paced",
      students: "500+",
      level: "Beginner to Advanced",
      technologies: ["C++", "OOP", "STL", "Data Structures"],
      features: [
        "Complete C++ syntax and fundamentals",
        "Object-oriented programming concepts",
        "Standard Template Library (STL)",
        "Memory management and pointers",
        "Practice problems with solutions",
        "Quiz preparation materials",
        "Exam-focused examples",
        "Code optimization techniques"
      ],
      launchDate: "2024",
      url: "https://github.com/ayan-9/Cpp"
    },
    {
      id: "2",
      title: "Python Programming",
      description: "Notes, explanations, practice problems for quizzes and exams",
      longDescription: "Complete Python programming course designed for students. Includes comprehensive notes, detailed explanations, and practice problems to help you excel in quizzes and exams. From basics to advanced concepts.",
      price: "Free",
      duration: "Self-paced",
      students: "800+",
      level: "Beginner to Advanced",
      technologies: ["Python", "Libraries", "Data Structures", "Algorithms"],
      features: [
        "Python fundamentals and syntax",
        "Data structures and algorithms",
        "Object-oriented programming in Python",
        "Popular Python libraries",
        "Practice problems with detailed solutions",
        "Quiz and exam preparation",
        "Real-world coding examples",
        "Best practices and conventions"
      ],
      launchDate: "2024",
      url: "https://github.com/ayan-9/Python-Course"
    },
    {
      id: "3",
      title: "Frontend Web Development",
      description: "Notes, explanations with folders to create your first website step by step",
      longDescription: "Complete frontend web development course with organized folders and step-by-step tutorials. Learn to create your first website from scratch with detailed explanations and practical examples. Perfect for beginners starting their web development journey.",
      price: "Free",
      duration: "Self-paced",
      students: "1,200+",
      level: "Beginner",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      features: [
        "HTML fundamentals and semantic markup",
        "CSS styling and layout techniques",
        "JavaScript programming basics",
        "Responsive web design principles",
        "Step-by-step project tutorials",
        "Organized folder structure",
        "Best practices and modern techniques",
        "Portfolio project examples"
      ],
      launchDate: "2024",
      url: "https://github.com/ayan-9/Frontend-Web"
    },
    {
      id: "4",
      title: "Data Structures & Algorithms",
      description: "Notes, explanations, practice problems for quizzes and exams",
      longDescription: "Comprehensive DSA course with detailed notes, explanations, and practice problems. Essential for computer science students preparing for quizzes, exams, and technical interviews. Covers all fundamental data structures and algorithms.",
      price: "Free",
      duration: "Self-paced",
      students: "600+",
      level: "Intermediate",
      technologies: ["Algorithms", "Data Structures", "Problem Solving", "Complexity Analysis"],
      features: [
        "Fundamental data structures (Arrays, Lists, Trees, Graphs)",
        "Sorting and searching algorithms",
        "Dynamic programming concepts",
        "Time and space complexity analysis",
        "Practice problems with step-by-step solutions",
        "Interview preparation materials",
        "Quiz and exam focused content",
        "Algorithm implementation examples"
      ],
      launchDate: "2024",
      url: "https://github.com/ayan-9/DSA-COURSE"
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
      <section id="courses" className="py-20 px-4">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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