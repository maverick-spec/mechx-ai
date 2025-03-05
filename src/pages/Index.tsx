
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AISearch } from "@/components/home/AISearch";
import { CollaborationSection } from "@/components/home/CollaborationSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProjects />
        <AISearch />
        <CollaborationSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
