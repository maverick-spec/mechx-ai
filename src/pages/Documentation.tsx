
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">
        <section className="container px-4 md:px-6 py-12 md:py-20">
          <SectionHeading 
            title="Documentation" 
            subtitle="Comprehensive guides and resources for MechatronixHub"
          />
          
          <div className="max-w-5xl mx-auto mt-8">
            <Tabs defaultValue="getting-started">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="getting-started" className="font-syne">Getting Started</TabsTrigger>
                <TabsTrigger value="project-guide" className="font-syne">Project Guide</TabsTrigger>
                <TabsTrigger value="api-reference" className="font-syne">API Reference</TabsTrigger>
              </TabsList>
              
              <TabsContent value="getting-started" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-syne font-bold">Welcome to MechatronixHub</h3>
                  <p className="text-muted-foreground font-jakarta">
                    This guide will help you get started with MechatronixHub and make the most of our platform.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-syne font-bold">Creating Your Account</h4>
                  <p className="text-muted-foreground font-jakarta">
                    To access all features of MechatronixHub, you'll need to create an account. 
                    Click on the "Sign Up" button in the top right corner of the page and follow the registration process.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-syne font-bold">Exploring Projects</h4>
                  <p className="text-muted-foreground font-jakarta">
                    Once registered, you can browse through our extensive library of mechatronics projects. 
                    Use the filters to narrow down projects based on difficulty, components used, time required, and more.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-syne font-bold">Watching Tutorials</h4>
                  <p className="text-muted-foreground font-jakarta">
                    Our Tutorials section offers step-by-step video guides on various aspects of mechatronics engineering. 
                    You can save tutorials to watch later and track your progress.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="project-guide" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-syne font-bold">Project Guide</h3>
                  <p className="text-muted-foreground font-jakarta">
                    Learn how to create, submit, and collaborate on projects within MechatronixHub.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-syne font-bold">Project Structure</h4>
                  <p className="text-muted-foreground font-jakarta">
                    Each project on MechatronixHub follows a standard structure to ensure consistency and ease of understanding:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-jakarta">
                    <li>Overview - A brief description of the project</li>
                    <li>Components List - All hardware components required</li>
                    <li>Software Requirements - Required libraries, frameworks, etc.</li>
                    <li>Step-by-Step Guide - Detailed instructions with images</li>
                    <li>Code Repository - Access to the project's source code</li>
                    <li>Troubleshooting - Common issues and their solutions</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-syne font-bold">Submitting Your Project</h4>
                  <p className="text-muted-foreground font-jakarta">
                    To submit your own project, navigate to the "Submit Project" page from the Projects section. 
                    You'll need to provide project details, upload images, and link to your code repository.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="api-reference" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-syne font-bold">API Reference</h3>
                  <p className="text-muted-foreground font-jakarta">
                    Documentation for developers who want to integrate with MechatronixHub's API.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-syne font-bold">Authentication</h4>
                  <p className="text-muted-foreground font-jakarta">
                    All API requests require authentication using an API key. You can generate an API key in your account settings.
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">
                      {`// Example API request with authentication
fetch('https://api.mechatronixhub.com/v1/projects', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})`}
                    </code>
                  </pre>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-syne font-bold">Endpoints</h4>
                  <p className="text-muted-foreground font-jakarta">
                    The MechatronixHub API provides the following endpoints:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-jakarta">
                    <li><code>/v1/projects</code> - Get a list of projects</li>
                    <li><code>/v1/projects/:id</code> - Get a specific project</li>
                    <li><code>/v1/tutorials</code> - Get a list of tutorials</li>
                    <li><code>/v1/tutorials/:id</code> - Get a specific tutorial</li>
                    <li><code>/v1/users/:id/projects</code> - Get a user's projects</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
