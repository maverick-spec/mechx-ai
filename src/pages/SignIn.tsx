
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignIn as ClerkSignIn, useAuth } from "@clerk/clerk-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container px-4 py-10 md:py-16 max-w-6xl">
          <Button 
            variant="ghost" 
            asChild 
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* Left column - Sign In information */}
            <div className="flex flex-col justify-center max-w-md">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back to MechX AI
                </h1>
                <p className="text-muted-foreground">
                  Sign in to access your account and continue building innovative mechatronics projects
                </p>
              </div>
              
              <div className="mt-8 space-y-6">
                <div className="space-y-2 rounded-lg border p-4 bg-muted/30">
                  <h3 className="font-semibold">Explore projects and collaborate</h3>
                  <p className="text-sm text-muted-foreground">
                    Access our curated collection of robotics and mechatronics projects with complete documentation
                  </p>
                </div>
                
                <div className="space-y-2 rounded-lg border p-4 bg-muted/30">
                  <h3 className="font-semibold">Team up with other engineers</h3>
                  <p className="text-sm text-muted-foreground">
                    Find like-minded individuals and form teams to tackle challenging projects together
                  </p>
                </div>
                
                <div className="space-y-2 rounded-lg border p-4 bg-muted/30">
                  <h3 className="font-semibold">Join the community</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your knowledge, ask questions, and learn from other mechatronics enthusiasts
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - Clerk Sign In UI */}
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <div className="mx-auto w-full max-w-sm">
                <ClerkSignIn 
                  appearance={{
                    elements: {
                      formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
                      footerAction: "text-primary hover:text-primary/90",
                      card: "shadow-none w-full",
                    }
                  }}
                  routing="path"
                  path="/sign-in"
                  redirectUrl="/"
                  signUpUrl="/sign-up"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
