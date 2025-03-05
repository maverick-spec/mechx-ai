
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";

const Tutorials = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 py-12">
          <SectionHeading
            title="Tutorials"
            subtitle="Watch and learn from our collection of mechatronics video tutorials"
          />
          <div className="p-8 border border-dashed text-center text-muted-foreground rounded-lg">
            Tutorials page content will go here
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tutorials;
