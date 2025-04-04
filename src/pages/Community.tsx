
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProjectIdeaForm from "@/components/forms/ProjectIdeaForm";

// Import college and student community content components
import CollegeContent from "@/components/community/CollegeContent";
import StudentsContent from "@/components/community/StudentsContent";

const Community = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showProjectForm, setShowProjectForm] = useState(false);
  
  // Get the type from URL params or default to "students"
  const type = searchParams.get("type") || "students";
  
  const handleTabChange = (value: string) => {
    navigate(`/community?type=${value}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute inset-0 bg-radial-gradient opacity-70" />
          
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Community</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connect, collaborate, and build amazing engineering projects together
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-mechatronix-600 hover:bg-mechatronix-700">
                      Submit Project Idea
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <ProjectIdeaForm onClose={() => setShowProjectForm(false)} />
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="mt-10">
                <Tabs defaultValue={type} onValueChange={handleTabChange}>
                  <TabsList className="bg-muted/50 justify-center">
                    <TabsTrigger value="students">Students Community</TabsTrigger>
                    <TabsTrigger value="college">College Community</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="students">
                    <StudentsContent />
                  </TabsContent>
                  
                  <TabsContent value="college">
                    <CollegeContent />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
