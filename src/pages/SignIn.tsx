
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignIn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sign-in");

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">
        <div className="container px-4 md:px-6 py-12">
          <SectionHeading
            title="Welcome to Mechx AI"
            subtitle="Sign in to access exclusive features and collaborate with the community"
          />

          <div className="max-w-md mx-auto mt-8 bg-card rounded-lg border border-border p-6 shadow-sm">
            <Tabs defaultValue="sign-in" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger 
                  value="sign-in" 
                  className="text-center"
                  onClick={() => setActiveTab("sign-in")}
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="sign-up" 
                  className="text-center"
                  onClick={() => setActiveTab("sign-up")}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sign-in" className="mt-0">
                <div className="flex justify-center">
                  <ClerkSignIn 
                    signUpUrl="/sign-in" 
                    afterSignInUrl="/projects" 
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "w-full shadow-none p-0 border-0",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border border-border bg-background text-foreground hover:bg-muted",
                        formFieldInput: "bg-background border border-border",
                        formButtonPrimary: "bg-mechatronix-600 hover:bg-mechatronix-700",
                        footerAction: "hidden"
                      }
                    }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="sign-up" className="mt-0">
                <div className="flex justify-center">
                  <ClerkSignIn
                    signUpUrl="/sign-in"
                    afterSignUpUrl="/projects"
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "w-full shadow-none p-0 border-0",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border border-border bg-background text-foreground hover:bg-muted",
                        formFieldInput: "bg-background border border-border",
                        formButtonPrimary: "bg-mechatronix-600 hover:bg-mechatronix-700",
                        footerAction: "hidden"
                      }
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
