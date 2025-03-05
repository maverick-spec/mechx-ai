
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";

const TeamUp = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 py-12">
          <SectionHeading
            title="Team Up"
            subtitle="Find collaborators and join projects that match your interests and skills"
          />
          <div className="p-8 border border-dashed text-center text-muted-foreground rounded-lg">
            Team Up page content will go here
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamUp;
