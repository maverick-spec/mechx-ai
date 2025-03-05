
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon, Zap } from "lucide-react";

export const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const textToType = "AI-Powered Mechatronics Projects";
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (textIndex < textToType.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + textToType[textIndex]);
        setTextIndex(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [textIndex]);

  return (
    <section className="relative w-full overflow-hidden pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-radial-gradient opacity-70" />
      <div className="absolute inset-0 bg-grid" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-muted border border-muted-foreground/20 mb-2 animate-fade-in">
            <Zap className="h-3.5 w-3.5 mr-1.5 text-mechatronix-600" />
            <span>Discover next-level engineering projects</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Boost Your Engineering Skills With{" "}
            <span className="relative">
              <span className="text-gradient">{typedText}</span>
              <span className="absolute right-0 top-0 h-full w-0.5 bg-mechatronix-600 animate-pulse-slow" style={{ display: textIndex < textToType.length ? 'block' : 'none' }}></span>
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Find innovative projects, access pre-made code, watch tutorials, and collaborate 
            with fellow Mechatronics students to build amazing robotics projects.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="bg-mechatronix-600 hover:bg-mechatronix-700">
              Explore Projects
            </Button>
            <Button size="lg" variant="outline" className="group">
              <SearchIcon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Search for Ideas
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-12 md:mt-16 relative max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-1/3 bottom-0 z-10"></div>
          <div className="rounded-xl overflow-hidden border border-border shadow-2xl">
            <img 
              src="/lovable-uploads/fc06feed-5e75-4942-ad80-20a38951af76.png" 
              alt="MechatronixHub Platform Interface" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
