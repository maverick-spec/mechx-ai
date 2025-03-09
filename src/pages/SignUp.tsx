
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUp as ClerkSignUp, useAuth } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container px-4 py-8 md:py-12 max-w-6xl">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center">
              <h1 className="font-syne font-bold text-3xl">
                <span className="text-mechatronix-600 mr-1">M</span>echX AI
              </h1>
            </Link>
          </div>
          
          <Button 
            variant="ghost" 
            asChild 
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* Left column - Sign Up information */}
            <div className="flex flex-col justify-center max-w-md">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Join MechX AI Community
                </h1>
                <p className="text-muted-foreground">
                  Create an account to access exclusive features and collaborate with other engineers
                </p>
              </div>
              
              <div className="mt-6 space-y-5">
                <div className="space-y-2 rounded-lg border p-4 bg-muted/30">
                  <h3 className="font-semibold">Access premium projects</h3>
                  <p className="text-sm text-muted-foreground">
                    Get full documentation, code, and schematics for all our mechatronics projects
                  </p>
                </div>
                
                <div className="space-y-2 rounded-lg border p-4 bg-muted/30">
                  <h3 className="font-semibold">AI project recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized project suggestions based on your skills and interests
                  </p>
                </div>
                
                <div className="space-y-2 rounded-lg border p-4 bg-muted/30">
                  <h3 className="font-semibold">Connect with experts</h3>
                  <p className="text-sm text-muted-foreground">
                    Team up with experienced engineers and expand your professional network
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - Clerk Sign Up UI */}
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <div className="mx-auto w-full max-w-sm">
                <ClerkSignUp 
                  appearance={{
                    elements: {
                      formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
                      footerAction: "text-primary hover:text-primary/90",
                      card: "shadow-none w-full",
                    }
                  }}
                  routing="path"
                  path="/sign-up"
                  signInUrl="/sign-in"
                  fallbackRedirectUrl="/"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
