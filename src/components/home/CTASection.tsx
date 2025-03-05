
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-16 md:py-24 w-full relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mechatronix-600/20 to-purple-600/10" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-mechatronix-500/10 border border-mechatronix-500/20 mb-4">
            <Zap className="h-3.5 w-3.5 mr-1.5 text-mechatronix-600" />
            <span>Start building amazing projects today</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Ready to level up your mechatronics skills?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of engineers, access hundreds of projects, and collaborate
            with other passionate students to build the future of robotics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-mechatronix-600 hover:bg-mechatronix-700">
              Sign Up for Free
            </Button>
            <Button size="lg" variant="outline">
              Browse Projects
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row gap-4 md:gap-8 justify-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-mechatronix-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>500+ Projects & Tutorials</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-mechatronix-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>AI-Powered Project Matching</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-mechatronix-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Community of 5,000+ Engineers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
