
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Code, Cpu, ExternalLink, Github, RotateCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const FeaturedProjects = () => {
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .limit(3);
      
      if (error) {
        throw error;
      }
      
      setFeaturedProjects(data || []);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      // Fallback to sample data if the API fails
      setFeaturedProjects([
        {
          id: 1,
          title: "Autonomous Robot Arm",
          description: "A 6-axis robotic arm with computer vision for precise object manipulation.",
          image_url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2940&auto=format&fit=crop",
          difficulty: "advanced",
          category: "Robotics",
          tags: ["Arduino", "Computer Vision", "3D Printing"]
        },
        {
          id: 2,
          title: "Gesture Controlled Drone",
          description: "Control a quadcopter using hand gestures through a machine learning model.",
          image_url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2940&auto=format&fit=crop",
          difficulty: "intermediate",
          category: "Drones",
          tags: ["ESP32", "Machine Learning", "Sensors"]
        },
        {
          id: 3,
          title: "Smart Home Automation",
          description: "IoT-based home automation system with voice control and energy monitoring.",
          image_url: "https://images.unsplash.com/photo-1558002038-BB0237f4f3e6?q=80&w=2940&auto=format&fit=crop",
          difficulty: "beginner",
          category: "IoT",
          tags: ["Raspberry Pi", "IoT", "Web Interface"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get badge color based on category
  const getCategoryBadgeStyle = (category) => {
    const categoryColors = {
      "Robotics": "bg-blue-600 text-white",
      "Drones": "bg-purple-600 text-white",
      "IoT": "bg-green-600 text-white",
      "AI": "bg-red-600 text-white",
      "Electronics": "bg-yellow-600 text-black",
    };
    
    return categoryColors[category] || "bg-gray-700 text-white";
  };
  
  // Helper function to get badge color based on difficulty
  const getDifficultyBadgeStyle = (difficulty) => {
    const difficultyColors = {
      "beginner": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      "intermediate": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
      "advanced": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    };
    
    return difficultyColors[difficulty] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  };

  return (
    <section className="py-16 md:py-24 w-full bg-muted/30">
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="Featured Projects"
          subtitle="Discover trending mechatronics projects with complete code and documentation"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden border-border/40">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2 mt-4">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
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
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{
                      transform: isHovering === project.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant="secondary" className={getCategoryBadgeStyle(project.category)}>
                      {project.category}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyBadgeStyle(project.difficulty)}>
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
                    {project.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-secondary text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between border-t border-border/50">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs gap-1 hover:bg-secondary" 
                    asChild
                  >
                    <Link to={project.difficulty !== "beginner" ? "/pricing" : `/projects/${project.id}`}>
                      <Code className="h-3.5 w-3.5" />
                      View Code
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs gap-1 hover:bg-secondary" asChild>
                    <Link to={`/projects/${project.id}`}>
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Button variant="outline" className="group" asChild>
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
