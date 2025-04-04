
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Lightbulb, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import ProjectIdeaForm from "@/components/forms/ProjectIdeaForm";

// Team cards data
const teamCards = [
  {
    title: "Autonomous Drone Team",
    description: "Building a gesture-controlled drone with obstacle avoidance capabilities",
    members: [
      { name: "Alex K.", image: "https://i.pravatar.cc/150?img=1" },
      { name: "Maria L.", image: "https://i.pravatar.cc/150?img=5" },
      { name: "Jason T.", image: "https://i.pravatar.cc/150?img=3" },
    ],
    skills: ["Computer Vision", "Flight Control", "3D Printing"],
    openPositions: 2,
  },
  {
    title: "Smart Agriculture",
    description: "Creating automated irrigation and monitoring systems for sustainable farming",
    members: [
      { name: "Sara P.", image: "https://i.pravatar.cc/150?img=10" },
      { name: "Mike R.", image: "https://i.pravatar.cc/150?img=12" },
    ],
    skills: ["IoT", "Sensors", "Embedded Systems"],
    openPositions: 3,
  },
  {
    title: "Prosthetic Hand Project",
    description: "Developing an affordable myoelectric prosthetic hand with advanced grip patterns",
    members: [
      { name: "David W.", image: "https://i.pravatar.cc/150?img=15" },
      { name: "Lisa M.", image: "https://i.pravatar.cc/150?img=16" },
      { name: "John D.", image: "https://i.pravatar.cc/150?img=17" },
      { name: "Emma S.", image: "https://i.pravatar.cc/150?img=18" },
    ],
    skills: ["Actuators", "Biomedical", "3D Modeling"],
    openPositions: 1,
  },
];

export const CollaborationSection = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  
  return (
    <section className="py-16 md:py-24 w-full bg-muted/50 relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <div className="container px-4 md:px-6 relative">
        <SectionHeading
          title="Collaboration Hub"
          subtitle="Connect with fellow mechatronics students to form teams and build amazing projects together"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {teamCards.map((team, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover-scale transition-all duration-300 border-border/40 hover:border-primary/20 bg-card/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">{team.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{team.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {team.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-muted/70">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex -space-x-2">
                    {team.members.map((member, i) => (
                      <Avatar key={i} className="border-2 border-background">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Badge variant="secondary" className="bg-mechatronix-100 dark:bg-mechatronix-900/50 text-mechatronix-800 dark:text-mechatronix-300">
                    {team.openPositions} Position{team.openPositions > 1 ? 's' : ''} Open
                  </Badge>
                </div>
                
                <Button className="w-full bg-mechatronix-600 hover:bg-mechatronix-700">
                  Apply to Join
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="col-span-1 md:col-span-3 border-border/30 bg-card/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-mechatronix-500/10 rounded-full blur-2xl" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />
            
            <CardContent className="p-6 md:p-8 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="col-span-2">
                  <h3 className="text-2xl font-bold mb-2">Have a Project Idea?</h3>
                  <p className="text-muted-foreground mb-4">
                    Share your innovative mechatronics project idea and find team members with 
                    the skills you need. Our AI will help match you with the right collaborators.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
                      <DialogTrigger asChild>
                        <Button className="gap-2 bg-mechatronix-600 hover:bg-mechatronix-700">
                          <Lightbulb className="h-4 w-4" />
                          Submit Project Idea
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <ProjectIdeaForm onClose={() => setShowProjectForm(false)} />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="gap-2" asChild>
                      <Link to="/team-up">
                        <Users className="h-4 w-4" />
                        Browse All Teams
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="hidden md:flex justify-center">
                  <div className="w-full max-w-xs aspect-square rounded-full bg-gradient-to-br from-mechatronix-200 to-mechatronix-50 dark:from-mechatronix-900 dark:to-mechatronix-800 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                      <Users className="h-16 w-16 text-mechatronix-600" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-14 text-center">
          <Button variant="outline" className="group" asChild>
            <Link to="/community">
              View Community Forum
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
