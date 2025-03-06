
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Download, Search, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PremadeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("beginner"); // Default to beginner
  const [visibleProjects, setVisibleProjects] = useState(20); // Default to 20 projects
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error, count } = await supabase
        .from("premade_projects")
        .select("*", { count: 'exact' })
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setProjects(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error("Error fetching premade projects:", error);
      toast({
        title: "Error fetching pre-made projects",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || project.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Get only visible number of projects
  const displayedProjects = filteredProjects.slice(0, visibleProjects);

  // Extract unique categories for filter
  const categories = ["all", ...new Set(projects.map(project => project.category))];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  const handlePurchase = (project) => {
    toast({
      title: "Added to cart!",
      description: `${project.title} has been added to your cart.`,
    });
  };

  const loadMoreProjects = () => {
    setVisibleProjects(prev => prev + 10);
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 py-12">
          <SectionHeading
            title="Pre-made Projects"
            subtitle="Ready-to-use mechatronics project kits with complete code and documentation"
          />

          {/* Info Banner */}
          <div className="bg-primary/10 p-4 rounded-lg mb-8 border border-primary/20">
            <p className="text-sm text-center">
              All pre-made projects include complete source code, documentation, and direct support from our team.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search pre-made projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Projects Count */}
          <div className="text-sm text-muted-foreground mb-6">
            Showing {displayedProjects.length} of {filteredProjects.length} projects
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="border rounded-lg overflow-hidden">
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
                </div>
              ))}
            </div>
          ) : displayedProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover-scale border-border/40 hover:border-primary/20 flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                          {project.difficulty}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="default" className="bg-mechatronix-600 text-white font-bold px-3 py-1">
                          ₹{(project.price * 83).toFixed(0)}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Includes:</h4>
                        <ul className="space-y-1">
                          {project.features?.map((feature, index) => (
                            <li key={index} className="text-xs flex items-start">
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                          {!project.features?.length && (
                            <li className="text-xs flex items-start">
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>Complete source code</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 flex justify-between border-t border-border/50">
                      <Button variant="outline" size="sm" className="text-xs gap-1">
                        <Download className="h-3.5 w-3.5" />
                        Details
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="text-xs gap-1 bg-mechatronix-600 hover:bg-mechatronix-700"
                        onClick={() => handlePurchase(project)}
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              {filteredProjects.length > visibleProjects && (
                <div className="flex justify-center mt-10">
                  <Button onClick={loadMoreProjects} variant="outline">
                    Load More Projects
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 border border-dashed rounded-lg">
              <h3 className="text-xl font-medium mb-2">No pre-made projects found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setDifficultyFilter("beginner");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PremadeProjects;
