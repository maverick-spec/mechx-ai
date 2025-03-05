
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchIcon, Zap } from "lucide-react";

const textPhrases = [
  "AI-Powered Mechatronics Projects",
  "Industrial Robotics Solutions",
  "Smart Automation Systems",
  "IoT-Connected Devices",
  "Embedded Control Systems"
];

export const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = useRef(100);
  const deletingSpeed = useRef(50);
  const pauseDelay = useRef(2000);

  useEffect(() => {
    const currentPhrase = textPhrases[phraseIndex];
    
    const timeout = setTimeout(() => {
      // Typing text
      if (!isDeleting && textIndex < currentPhrase.length) {
        setTypedText(prev => prev + currentPhrase[textIndex]);
        setTextIndex(prev => prev + 1);
        typingSpeed.current = 100 - Math.random() * 50;
      } 
      // Pause before deleting
      else if (!isDeleting && textIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), pauseDelay.current);
      } 
      // Deleting text
      else if (isDeleting && typedText.length > 0) {
        setTypedText(prev => prev.slice(0, -1));
        deletingSpeed.current = 50 - Math.random() * 20;
      } 
      // Move to next phrase
      else if (isDeleting && typedText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex(prev => (prev + 1) % textPhrases.length);
        setTextIndex(0);
      }
    }, isDeleting ? deletingSpeed.current : typingSpeed.current);
    
    return () => clearTimeout(timeout);
  }, [textIndex, isDeleting, phraseIndex, typedText]);

  return (
    <section className="relative w-full overflow-hidden pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-radial-gradient opacity-70" />
      <div className="absolute inset-0 bg-grid" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-muted border border-muted-foreground/20 mb-2 animate-fade-in">
            <Zap className="h-3.5 w-3.5 mr-1.5 text-mechatronix-600" />
            <span>Next-gen engineering solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne tracking-tight">
            <span className="text-gradient">NexTech Mechatronics</span>: Future-Proof Your Engineering With{" "}
            <span className="relative">
              <span className="text-gradient">{typedText}</span>
              <span className="absolute right-0 top-0 h-full w-0.5 bg-mechatronix-600 animate-pulse-slow" style={{ display: !isDeleting && textIndex < textPhrases[phraseIndex].length ? 'block' : 'none' }}></span>
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 animate-fade-in font-jakarta" style={{ animationDelay: "0.2s" }}>
            Discover breakthrough projects, access pre-made solutions, and collaborate 
            with the global community to build tomorrow's mechatronics innovations today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="bg-mechatronix-600 hover:bg-mechatronix-700" asChild>
              <Link to="/projects">Explore Projects</Link>
            </Button>
            <Button size="lg" variant="outline" className="group" asChild>
              <Link to="/premade-projects">
                Pre-made Projects
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="group" asChild>
              <Link to="/projects">
                <SearchIcon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Search for Ideas
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-12 md:mt-16 relative max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-1/3 bottom-0 z-10"></div>
          <div className="rounded-xl overflow-hidden border border-border shadow-2xl">
            <img 
              src="/lovable-uploads/ee6bfad7-d15b-410b-a32b-c28526235f62.png" 
              alt="Engineer working with industrial robot" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
