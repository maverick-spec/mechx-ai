
import { useState } from "react";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 md:pt-16 px-4">
      <div className="text-center mb-8">
        <Link to="/">
          <h1 className="font-syne font-bold text-3xl inline-flex items-center">
            <span className="text-mechatronix-600 mr-1">M</span>echX
          </h1>
        </Link>
      </div>

      <Link to="/" className="mb-6">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div className="w-full max-w-md mx-auto bg-card p-6 rounded-lg shadow-sm border">
        <ClerkSignIn
          signUpUrl="/sign-up"
          afterSignInUrl="/"
          appearance={{
            elements: {
              rootBox: "w-full mx-auto",
              card: "shadow-none border-none p-0",
              headerTitle: "text-foreground font-syne",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "border border-input bg-background hover:bg-muted",
              formFieldInput: "bg-background border-input",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
              footerActionText: "text-muted-foreground",
              footerActionLink: "text-primary hover:text-primary/80",
              formFieldLabel: "text-foreground",
              formFieldLabelRow: "text-foreground",
              identityPreviewEditButton: "text-primary hover:text-primary/80",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
