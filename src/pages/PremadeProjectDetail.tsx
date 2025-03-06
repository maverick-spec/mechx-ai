
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  CheckCircle, 
  ShoppingCart, 
  Download,
  Box, 
  Layers, 
  Cpu, 
  ChevronRight,
  Package,
  FileText,
  Video
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PremadeProjectDetail = () => {
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
        .from("premade_projects")
        .select("*")
        .eq("id", id)
        .single();

      if (projectError) throw projectError;
      setProject(projectData);

      // Fetch related projects (same category)
      if (projectData) {
        const { data: relatedData, error: relatedError } = await supabase
          .from("premade_projects")
          .select("*")
          .eq("category", projectData.category)
          .neq("id", id)
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedProjects(relatedData || []);

        // Fetch featured projects
        const { data: featuredData, error: featuredError } = await supabase
          .from("premade_projects")
          .select("*")
          .order("views", { ascending: false })
          .neq("id", id)
          .limit(3);

        if (featuredError) throw featuredError;
        setFeaturedProjects(featuredData || []);
      }
    } catch (error) {
      console.error("Error fetching pre-made project details:", error);
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
        .from("premade_projects")
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

  const handlePurchase = () => {
    if (!project) return;
    
    toast({
      title: "Added to cart!",
      description: `${project.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24">
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
                      <Badge variant="secondary" className="bg-secondary">
                        {project.category}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {project.difficulty}
                      </Badge>
                      <Badge variant="default" className="bg-mechatronix-600 text-white font-bold px-3 py-1">
                        ₹{(project.price * 83).toFixed(0)}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Details PDF
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="gap-2 bg-mechatronix-600 hover:bg-mechatronix-700"
                        onClick={handlePurchase}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Purchase Kit
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Project Info Tabs */}
                <Tabs defaultValue="overview" className="mb-12">
                  <TabsList className="w-full justify-start mb-8 bg-muted/50">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="components">Components</TabsTrigger>
                    <TabsTrigger value="features">System Features</TabsTrigger>
                    <TabsTrigger value="included">What's Included</TabsTrigger>
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
                  <TabsContent value="included">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            Physical Kit
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {project.kit_contents?.map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            )) || (
                              <>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>All required hardware components</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Pre-assembled main board</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Connection cables and adapters</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Custom 3D printed enclosure</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Documentation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {project.documentation?.map((doc, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{doc}</span>
                              </li>
                            )) || (
                              <>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Comprehensive user manual</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Step-by-step assembly guide</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Circuit diagrams and schematics</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Troubleshooting guide</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Video className="h-5 w-5 text-primary" />
                            Digital Resources
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {project.digital_resources?.map((resource, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{resource}</span>
                              </li>
                            )) || (
                              <>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Complete source code repository</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Video tutorials and demonstrations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Project extension ideas</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>60 days of technical support</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Related Projects */}
                <div className="mb-16">
                  <h3 className="text-2xl font-bold mb-8">New Projects</h3>
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
                        <CardContent className="p-4 pt-0 mb-16">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedProject.description}
                          </p>
                        </CardContent>
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                          <Badge variant="default" className="bg-mechatronix-600 text-white">
                            ₹{(relatedProject.price * 83).toFixed(0)}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                            <a href={`/premade-projects/${relatedProject.id}`}>View Details</a>
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
                        <CardContent className="p-4 pt-0 mb-16">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {featuredProject.description}
                          </p>
                        </CardContent>
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                          <Badge variant="default" className="bg-mechatronix-600 text-white">
                            ₹{(featuredProject.price * 83).toFixed(0)}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                            <a href={`/premade-projects/${featuredProject.id}`}>View Details</a>
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
              <a href="/premade-projects">Back to Pre-made Projects</a>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PremadeProjectDetail;
