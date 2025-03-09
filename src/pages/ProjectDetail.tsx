
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Code, ExternalLink, Box, Layers, Cpu, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);

      // Fetch the current project
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (projectError) throw projectError;
      setProject(projectData);

      // Fetch related projects (same category)
      if (projectData) {
        const { data: relatedData, error: relatedError } = await supabase
          .from("projects")
          .select("*")
          .eq("category", projectData.category)
          .neq("id", id)
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedProjects(relatedData || []);

        // Fetch featured projects
        const { data: featuredData, error: featuredError } = await supabase
          .from("projects")
          .select("*")
          .order("views", { ascending: false })
          .neq("id", id)
          .limit(3);

        if (featuredError) throw featuredError;
        setFeaturedProjects(featuredData || []);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
      toast({
        title: "Error fetching project details",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProjectViews = async () => {
    if (!project) return;

    try {
      const { error } = await supabase
        .from("projects")
        .update({ views: (project.views || 0) + 1 })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating project views:", error);
    }
  };

  useEffect(() => {
    if (project) {
      updateProjectViews();
    }
  }, [project]);

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
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-24">
        {loading ? (
          <div className="container px-4 md:px-6 py-12">
            <Skeleton className="h-16 w-2/3 mx-auto mb-12" />
            <div className="max-w-5xl mx-auto">
              <Skeleton className="h-96 w-full rounded-lg mb-12" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Skeleton className="h-8 w-40 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div>
                  <Skeleton className="h-8 w-40 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        ) : project ? (
          <>
            <div className="container px-4 md:px-6 py-12">
              <SectionHeading
                title={project.title}
                subtitle={project.description}
                align="center"
                className="mb-12"
              />

              <div className="max-w-5xl mx-auto">
                {/* Project Gallery */}
                <div className="bg-card rounded-lg overflow-hidden mb-12">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-wrap justify-between items-center">
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                      <Badge variant="secondary" className={getCategoryBadgeStyle(project.category)}>
                        {project.category}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyBadgeStyle(project.difficulty)}>
                        {project.difficulty}
                      </Badge>
                      {project.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-muted">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2" 
                        asChild
                      >
                        <Link to={project.difficulty !== "beginner" ? "/pricing" : `/projects/${project.id}`}>
                          <Code className="h-4 w-4" />
                          Source Code
                        </Link>
                      </Button>
                      {project.project_url && (
                        <Button variant="default" size="sm" className="gap-2" asChild>
                          <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Visit Project
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info Tabs */}
                <Tabs defaultValue="overview" className="mb-12">
                  <TabsList className="w-full justify-start mb-8 bg-muted/50">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="components">Components</TabsTrigger>
                    <TabsTrigger value="features">System Features</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="max-w-none">
                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                      <h3>Project Overview</h3>
                      <p>{project.detailed_description || project.description}</p>
                      
                      <h4>Learning Outcomes</h4>
                      <ul>
                        {project.learning_outcomes?.map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        )) || (
                          <>
                            <li>Understanding of {project.category} principles</li>
                            <li>Practical experience with hardware integration</li>
                            <li>Software development for embedded systems</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="components">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-primary" />
                            Hardware Components
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {project.hardware_components?.map((component, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                <span>{component}</span>
                              </li>
                            )) || (
                              <>
                                <li className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                  <span>Main controller board</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                  <span>Sensors and actuators</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                  <span>Power management system</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Layers className="h-5 w-5 text-primary" />
                            Software Requirements
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {project.software_requirements?.map((software, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                <span>{software}</span>
                              </li>
                            )) || (
                              <>
                                <li className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                  <span>Programming environment</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                  <span>Required libraries and dependencies</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                  <span>Operating system compatibility</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="features">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Cpu className="h-5 w-5 text-primary" />
                          System Features
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-base font-semibold mb-3">Core Features</h4>
                            <ul className="space-y-3">
                              {project.core_features?.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              )) || (
                                <>
                                  <li className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                    <span>Real-time data processing</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                    <span>User interface and control</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                    <span>Automated operation modes</span>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-base font-semibold mb-3">Advanced Capabilities</h4>
                            <ul className="space-y-3">
                              {project.advanced_features?.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              )) || (
                                <>
                                  <li className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                    <span>Data logging and analysis</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                    <span>Remote monitoring capabilities</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                    <span>System optimization algorithms</span>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Related Projects */}
                <div className="mb-16">
                  <h3 className="text-2xl font-bold mb-8">Related Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedProjects.map((relatedProject) => (
                      <Card 
                        key={relatedProject.id} 
                        className="overflow-hidden hover-scale border-border/40 hover:border-primary/20"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={relatedProject.image_url}
                            alt={relatedProject.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-xl">{relatedProject.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 mb-12">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedProject.description}
                          </p>
                        </CardContent>
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                          <Badge variant="secondary" className={getCategoryBadgeStyle(relatedProject.category)}>
                            {relatedProject.category}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                            <Link to={`/projects/${relatedProject.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Featured Projects */}
                <div>
                  <h3 className="text-2xl font-bold mb-8">Featured Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredProjects.map((featuredProject) => (
                      <Card 
                        key={featuredProject.id} 
                        className="overflow-hidden hover-scale border-border/40 hover:border-primary/20"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={featuredProject.image_url}
                            alt={featuredProject.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-xl">{featuredProject.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 mb-12">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {featuredProject.description}
                          </p>
                        </CardContent>
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                          <Badge variant="secondary" className={getCategoryBadgeStyle(featuredProject.category)}>
                            {featuredProject.category}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                            <Link to={`/projects/${featuredProject.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container px-4 md:px-6 py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/projects">Back to Projects</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
