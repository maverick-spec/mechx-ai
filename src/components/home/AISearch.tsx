import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, BookOpen, Bot, RotateCw, Cpu } from "lucide-react";

export const AISearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-mechatronix-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container px-4 md:px-6 relative">
        <SectionHeading
          title="AI-Powered Project Search"
          subtitle="Discover the perfect mechatronics project based on your interests, skills, and available components"
        />

        <div className="max-w-3xl mx-auto">
          <Card className="glass-card dark:glass-dark border-border/50 shadow-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Badge variant="outline" className="bg-mechatronix-100 dark:bg-mechatronix-900/30 text-mechatronix-800 dark:text-mechatronix-300 px-3 py-1 gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Powered by AI</span>
                  </Badge>
                </div>
                <h3 className="text-center text-xl font-medium mb-1">What would you like to build?</h3>
                <p className="text-center text-muted-foreground text-sm">
                  Describe your project idea, components you have, or skills you want to learn
                </p>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="e.g. 'A drone with obstacle avoidance using Arduino and ultrasonic sensors'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-4 pr-10 py-6 bg-background border-border/60 text-foreground placeholder:text-muted-foreground/70"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("Beginner Arduino project for line following robot")}
                    className="text-xs bg-muted/50 hover:bg-muted"
                  >
                    Line following robot
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("Smart home automation with Raspberry Pi")}
                    className="text-xs bg-muted/50 hover:bg-muted"
                  >
                    Smart home
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("Voice-controlled robot arm with Python")}
                    className="text-xs bg-muted/50 hover:bg-muted"
                  >
                    Voice-controlled robot
                  </Button>
                </div>

                <div className="flex justify-center pt-2">
                  <Button 
                    type="submit" 
                    className="bg-mechatronix-600 hover:bg-mechatronix-700 gap-2 px-6"
                    disabled={isSearching || !searchQuery.trim()}
                  >
                    {isSearching ? (
                      <>
                        <RotateCw className="h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Bot className="h-4 w-4" />
                        Search with AI
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-6 flex justify-between items-center pt-4 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Search across 1,000+ projects and tutorials
                  </span>
                </div>
                <Button variant="link" size="sm" className="text-xs text-mechatronix-600 p-0">
                  Advanced Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-mechatronix-100 dark:bg-mechatronix-900/30 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-mechatronix-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your interests and skills to suggest the most relevant projects
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-mechatronix-100 dark:bg-mechatronix-900/30 flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-mechatronix-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Component Matching</h3>
              <p className="text-sm text-muted-foreground">
                Find projects that match the components and equipment you already have
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-mechatronix-100 dark:bg-mechatronix-900/30 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-mechatronix-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Learning Path</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized learning paths that help you master new skills progressively
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
