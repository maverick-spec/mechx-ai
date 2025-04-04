
import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Calendar, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProjectIdeaForm from "@/components/forms/ProjectIdeaForm";
import { Link } from "react-router-dom";

interface TeamUp {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  skills_required: string[] | null;
  team_size: number | null;
  open_positions: number | null;
  difficulty: string;
  duration: string | null;
  created_at: string;
  updated_at: string;
}

const fetchTeamUpOpportunities = async () => {
  const { data, error } = await supabase.from("team_up").select("*");
  if (error) throw error;
  return data as TeamUp[];
};

// Mock team members for display purposes
const mockTeamMembers = [
  { name: "Alex K.", image: "https://i.pravatar.cc/150?img=1" },
  { name: "Maria L.", image: "https://i.pravatar.cc/150?img=5" },
  { name: "Jason T.", image: "https://i.pravatar.cc/150?img=3" },
  { name: "Sara P.", image: "https://i.pravatar.cc/150?img=10" },
  { name: "Mike R.", image: "https://i.pravatar.cc/150?img=12" },
  { name: "Emma S.", image: "https://i.pravatar.cc/150?img=18" },
];

const TeamUp = () => {
  const { data: teamOpportunities, isLoading, error, refetch } = useQuery({
    queryKey: ["team-up"],
    queryFn: fetchTeamUpOpportunities,
  });

  const [activeDifficulty, setActiveDifficulty] = useState<string>("all");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const { toast } = useToast();

  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  const filteredOpportunities = activeDifficulty === "all" 
    ? teamOpportunities 
    : teamOpportunities?.filter(opportunity => opportunity.difficulty === activeDifficulty);

  const handleJoinTeam = (teamName: string) => {
    toast({
      title: "Application Submitted",
      description: `You've applied to join "${teamName}". The team leader will contact you soon.`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 py-12">
          <SectionHeading
            title="Team Up"
            subtitle="Find collaborators and join projects that match your interests and skills"
          />

          <div className="mt-8 max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">
              Connect with fellow engineering enthusiasts, form teams, and build amazing projects together. 
              Whether you're looking to join an existing project or start your own, this is the place to find collaborators.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
                <DialogTrigger asChild>
                  <Button className="bg-mechatronix-600 hover:bg-mechatronix-700">
                    Submit Project Idea
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <ProjectIdeaForm 
                    onClose={() => {
                      setShowProjectForm(false);
                      refetch(); // Refresh data after submission
                    }} 
                  />
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                Browse All Teams
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full mt-12">
            <div className="flex justify-center mb-8">
              <TabsList>
                {difficulties.map((difficulty) => (
                  <TabsTrigger 
                    key={difficulty}
                    value={difficulty}
                    onClick={() => setActiveDifficulty(difficulty)}
                    className="capitalize"
                  >
                    {difficulty}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeDifficulty} className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item) => (
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
                  <p className="text-red-500">Error loading team opportunities. Please try again later.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredOpportunities?.map((opportunity, index) => {
                    // Assign random team members for display purposes
                    const randomMembers = [...mockTeamMembers]
                      .sort(() => 0.5 - Math.random())
                      .slice(0, opportunity.team_size ? opportunity.team_size - opportunity.open_positions! : 2);

                    return (
                      <Card 
                        key={opportunity.id} 
                        className="overflow-hidden hover-scale transition-all duration-300 border-border/40 hover:border-primary/20 bg-card/80 backdrop-blur-sm"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={opportunity.image_url || 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2940&auto=format&fit=crop'}
                            alt={opportunity.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm capitalize">
                              {opportunity.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                          <CardDescription>{opportunity.description}</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="p-4 pt-0">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Team: {opportunity.team_size || 0}</span>
                            </div>
                            
                            {opportunity.duration && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{opportunity.duration}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {opportunity.skills_required?.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-secondary/80 text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {randomMembers.map((member, i) => (
                                <Avatar key={i} className="border-2 border-background">
                                  <AvatarImage src={member.image} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <Badge variant="secondary" className="bg-mechatronix-100 dark:bg-mechatronix-900/50 text-mechatronix-800 dark:text-mechatronix-300">
                              {opportunity.open_positions} Position{opportunity.open_positions !== 1 ? 's' : ''} Open
                            </Badge>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="p-4 border-t border-border/50">
                          <Button 
                            className="w-full bg-mechatronix-600 hover:bg-mechatronix-700"
                            onClick={() => handleJoinTeam(opportunity.title)}
                          >
                            Apply to Join
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-16 flex justify-center">
            <Button variant="outline" className="group" asChild>
              <Link to="/community">
                View Community Forum
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamUp;
