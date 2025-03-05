
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Cpu, Github, RotateCw } from "lucide-react";

// Sample featured projects data
const featuredProjects = [
  {
    id: 1,
    title: "Autonomous Robot Arm",
    description: "A 6-axis robotic arm with computer vision for precise object manipulation.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2940&auto=format&fit=crop",
    difficulty: "Advanced",
    category: "Robotics",
    tags: ["Arduino", "Computer Vision", "3D Printing"]
  },
  {
    id: 2,
    title: "Gesture Controlled Drone",
    description: "Control a quadcopter using hand gestures through a machine learning model.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2940&auto=format&fit=crop",
    difficulty: "Intermediate",
    category: "Drones",
    tags: ["ESP32", "Machine Learning", "Sensors"]
  },
  {
    id: 3,
    title: "Smart Home Automation",
    description: "IoT-based home automation system with voice control and energy monitoring.",
    image: "https://images.unsplash.com/photo-1558002038-BB0237f4f3e6?q=80&w=2940&auto=format&fit=crop",
    difficulty: "Beginner",
    category: "IoT",
    tags: ["Raspberry Pi", "IoT", "Web Interface"]
  }
];

export const FeaturedProjects = () => {
  const [isHovering, setIsHovering] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 w-full bg-muted/30">
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="Featured Projects"
          subtitle="Discover trending mechatronics projects with complete code and documentation"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredProjects.map((project) => (
            <Card 
              key={project.id}
              className="overflow-hidden hover-scale transition-all duration-300 border-border/40 hover:border-primary/20 bg-card/80 backdrop-blur-sm"
              onMouseEnter={() => setIsHovering(project.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{
                    transform: isHovering === project.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm">
                    {project.category}
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                    {project.difficulty}
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-secondary text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 flex justify-between border-t border-border/50">
                <Button variant="ghost" size="sm" className="text-xs gap-1 hover:bg-secondary">
                  <Code className="h-3.5 w-3.5" />
                  View Code
                </Button>
                <Button variant="ghost" size="sm" className="text-xs gap-1 hover:bg-secondary">
                  <Github className="h-3.5 w-3.5" />
                  Repository
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" className="group">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
