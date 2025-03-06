
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, BookOpen, Tags } from "lucide-react";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string | null;
  video_url: string | null;
  difficulty: string;
  category: string;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

const fetchTutorials = async () => {
  const { data, error } = await supabase.from("tutorials").select("*");
  if (error) throw error;
  return data as Tutorial[];
};

const Tutorials = () => {
  const { data: tutorials, isLoading, error } = useQuery({
    queryKey: ["tutorials"],
    queryFn: fetchTutorials,
  });

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categories = ["all", ...new Set((tutorials || []).map(tutorial => tutorial.category))];

  const filteredTutorials = activeCategory === "all" 
    ? tutorials 
    : tutorials?.filter(tutorial => tutorial.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 py-12">
          <SectionHeading
            title="Tutorials"
            subtitle="Watch and learn from our collection of mechatronics video tutorials"
          />

          <Tabs defaultValue="all" className="w-full mt-8">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted/50">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category}
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeCategory} className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <Skeleton className="h-48 w-full" />
                      <div className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">Error loading tutorials. Please try again later.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTutorials?.map((tutorial) => (
                    <Card 
                      key={tutorial.id} 
                      className="overflow-hidden hover-scale transition-all duration-300 border-border/40 hover:border-primary/20 bg-card/80 backdrop-blur-sm"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={tutorial.image_url || 'https://via.placeholder.com/800x450?text=Tutorial'}
                          alt={tutorial.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm">
                            {tutorial.category}
                          </Badge>
                          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm capitalize">
                            {tutorial.difficulty}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                        <CardDescription>{tutorial.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tutorial.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-secondary text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-4 border-t border-border/50 flex justify-between">
                        <Button variant="outline" size="sm" className="gap-1">
                          <BookOpen className="h-4 w-4" />
                          Read
                        </Button>
                        
                        {tutorial.video_url && (
                          <Button variant="default" size="sm" className="gap-1 bg-mechatronix-600 hover:bg-mechatronix-700">
                            <Play className="h-4 w-4" />
                            Watch Video
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tutorials;
