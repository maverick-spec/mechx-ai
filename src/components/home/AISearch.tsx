
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionHeading } from "@/components/ui/section-heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const AISearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/ai-search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="py-16 md:py-24 w-full bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:18px_18px]"></div>
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="AI-Powered Project Search"
          subtitle="Describe your interests or skills and get personalized mechatronics project recommendations"
          center
        />

        <div className="mt-10 max-w-2xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              placeholder="Describe a project or skills you want to learn..."
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="gap-1.5">
              <Sparkles className="h-4 w-4" />
              Search with AI
            </Button>
          </form>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm">
              <span className="font-medium mb-1">Personalized</span>
              <p>Get projects tailored to your experience level and interests</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm">
              <span className="font-medium mb-1">Discover</span>
              <p>Find projects that match components you already have</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm">
              <span className="font-medium mb-1">Learn</span>
              <p>Focus on projects that teach the skills you want to develop</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
