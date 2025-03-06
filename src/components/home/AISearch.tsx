
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WarpBackground } from "@/components/ui/warp-background";

export const AISearch = () => {
  return (
    <WarpBackground className="w-full p-6 md:p-8 rounded-xl">
      <div className="text-center mb-6 space-y-2">
        <h2 className="text-2xl md:text-3xl font-syne font-bold">AI-Powered Project Search</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find the perfect project idea by describing what you want to build in natural language.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            className="pl-9 bg-background/80 backdrop-blur-sm border-muted" 
            placeholder="Describe your ideal project (e.g., 'Arduino robot that follows light')"
          />
        </div>
        <Button className="bg-mechatronix-600 hover:bg-mechatronix-700">
          Search Projects
        </Button>
      </div>
    </WarpBackground>
  );
};
