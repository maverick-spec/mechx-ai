
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Lightbulb, Award, BookOpen, Zap, UserPlus, ArrowRight, MessageSquare } from "lucide-react";

const StudentsContent = () => {
  return (
    <>
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Students Get</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our student community offers invaluable resources and opportunities to help you kickstart your engineering career
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: "Learning Resources",
                description: "Access tutorials, guides, and courses on robotics, programming, and electronics"
              },
              {
                icon: <Lightbulb className="h-6 w-6" />,
                title: "Project Collaboration",
                description: "Team up with peers to work on exciting mechatronics projects and competitions"
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: "Certification",
                description: "Earn industry-recognized certifications to boost your resume"
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Mentorship",
                description: "Connect with experienced professionals who can guide your learning journey"
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Hackathons",
                description: "Participate in exciting challenges to test and improve your skills"
              },
              {
                icon: <UserPlus className="h-6 w-6" />,
                title: "Networking",
                description: "Build connections with fellow students and potential employers"
              }
            ].map((item, index) => (
              <div key={index} className="bg-card border rounded-lg p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Students working on robotics" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Featured Student Projects</h2>
              <p className="text-muted-foreground mb-8">
                Check out some of the amazing projects created by students in our community. Get inspired and start your own project today!
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Autonomous Delivery Robot",
                    creator: "Team RoboTech",
                    description: "A small-scale delivery robot designed for campus environments"
                  },
                  {
                    title: "Smart Home Automation System",
                    creator: "IoT Innovators",
                    description: "An affordable and modular home automation solution"
                  },
                  {
                    title: "AI-powered Plant Care System",
                    creator: "Green Thumbs",
                    description: "Uses computer vision to monitor and maintain indoor plants"
                  }
                ].map((project, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-sm text-primary">{project.creator}</p>
                    <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button asChild>
                  <Link to="/projects">
                    View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Community Forum
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentsContent;
