
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container px-4 py-12 max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                {isSigningIn ? "Welcome Back!" : "Join Mechx AI"}
              </h1>
              <p className="text-muted-foreground mb-6 text-lg">
                {isSigningIn 
                  ? "Sign in to access personalized project recommendations, collaborate with the community, and track your progress."
                  : "Create an account to discover projects, connect with other engineers, and build amazing things together."
                }
              </p>
              
              <Card className="bg-muted/50 border-border/50">
                <CardHeader>
                  <CardTitle>Why join our community?</CardTitle>
                  <CardDescription>
                    Unlock the full potential of Mechx AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="bg-mechatronix-100 dark:bg-mechatronix-900/30 text-mechatronix-600 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Personalized Recommendations</h3>
                      <p className="text-sm text-muted-foreground">Get project suggestions tailored to your skills and interests</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-mechatronix-100 dark:bg-mechatronix-900/30 text-mechatronix-600 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Collaborate on Projects</h3>
                      <p className="text-sm text-muted-foreground">Team up with other engineers on exciting challenges</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-mechatronix-100 dark:bg-mechatronix-900/30 text-mechatronix-600 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Track Your Progress</h3>
                      <p className="text-sm text-muted-foreground">Save your favorite projects and monitor your learning journey</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSigningIn(!isSigningIn)}
                  >
                    {isSigningIn ? "Need an account? Sign up" : "Already have an account? Sign in"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="bg-card rounded-lg border p-4 flex items-center justify-center min-h-[500px]">
              <ClerkSignIn 
                routing="path" 
                path="/sign-in" 
                signUpUrl="/sign-up"
                appearance={{
                  elements: {
                    rootBox: "w-full flex justify-center",
                    card: "w-full border-0 shadow-none",
                    headerTitle: "text-2xl",
                    headerSubtitle: "text-muted-foreground",
                    socialButtonsBlockButton: "border rounded-md",
                    formButtonPrimary: "bg-mechatronix-600 hover:bg-mechatronix-700",
                    footerActionLink: "text-mechatronix-600 hover:text-mechatronix-700"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
