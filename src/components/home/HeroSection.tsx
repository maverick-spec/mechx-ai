
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchIcon, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Safari } from "../magicui/safari";
import { Cover } from "../ui/cover";
import { Spotlight } from "../ui/spotlight-new";
import { WordRotate } from "../ui/word-rotate";

const rotatingWords = [
 "AI",
 "Robotics",
 "Automation",
 "IoT"
];

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative w-full overflow-hidden pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-radial-gradient opacity-70" />
      <div className="absolute inset-0 bg-grid" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-muted border border-muted-foreground/20 mb-2 animate-fade-in">
            <Spotlight />
            <Zap className="h-3.5 w-3.5 mr-1.5 text-mechatronix-600" />
            <span>Next-gen engineering solutions</span>
          </div>
          <Spotlight />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne tracking-tight">
            Future-Proof Your <Cover>Engineering</Cover> With{" "}
            <WordRotate words={rotatingWords} />
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 animate-fade-in font-jakarta" style={{ animationDelay: "0.2s" }}>
            Discover breakthrough projects, access pre-made solutions, and collaborate 
            with the global community to build tomorrow's mechatronics innovations today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="bg-mechatronix-600 hover:bg-mechatronix-700" asChild>
              <Link to="/projects">Explore Projects</Link>
            </Button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full max-w-md mt-4 flex gap-2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Input 
              type="text" 
              placeholder="Search for projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </div>

        {/* Hero Video */}
        <div className="mt-12 md:mt-16 relative max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="relative">
            <Safari url="mechx-ai.xyz" className="size-full">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://www.pexels.com/download/video/7868125/?fps=25.0&h=1080&w=1920" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Safari>
          </div>
        </div>
      </div>
    </section>
  );
};
