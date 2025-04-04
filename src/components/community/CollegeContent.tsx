
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, GraduationCap, Building, ArrowRight, MessageSquare } from "lucide-react";

const CollegeContent = () => {
  return (
    <>
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">College Partnership Benefits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our network of educational institutions to provide your students with cutting-edge engineering resources
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <GraduationCap className="h-6 w-6" />,
                title: "Academic Integration",
                description: "Seamlessly integrate our platform with your engineering curriculum"
              },
              {
                icon: <Lightbulb className="h-6 w-6" />,
                title: "Research Opportunities",
                description: "Connect students with real-world research and development projects"
              },
              {
                icon: <Building className="h-6 w-6" />,
                title: "Industry Connections",
                description: "Bridge the gap between academia and industry with our partner network"
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Multi-Campus Collaboration",
                description: "Facilitate collaboration between students from different colleges"
              },
              {
                icon: <Lightbulb className="h-6 w-6" />,
                title: "Innovation Labs",
                description: "Access resources to establish innovation labs at your campus"
              },
              {
                icon: <GraduationCap className="h-6 w-6" />,
                title: "Professional Development",
                description: "Continuous learning opportunities for faculty and staff"
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
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Partner Success Stories</h2>
              <p className="text-muted-foreground mb-8">
                Learn how colleges and universities are leveraging our platform to enhance their engineering programs
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Robotics Innovation Hub",
                    institution: "Technical University of Denmark",
                    description: "Established a cross-disciplinary innovation center for robotics research"
                  },
                  {
                    title: "Smart Campus Initiative",
                    institution: "Nanyang Technological University",
                    description: "Implemented IoT solutions across campus through student projects"
                  },
                  {
                    title: "Engineering Capstone Program",
                    institution: "University of Michigan",
                    description: "Redesigned senior projects to include industry mentorship"
                  }
                ].map((story, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-bold">{story.title}</h3>
                    <p className="text-sm text-primary">{story.institution}</p>
                    <p className="text-sm text-muted-foreground mt-1">{story.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button asChild>
                  <Link to="/team-up">
                    Partner With Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Community Forum
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="College collaboration" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CollegeContent;
