
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Graduation, Users, School, BookOpen, Award, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CollegeCommunity = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute inset-0 bg-radial-gradient opacity-70" />
          
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">College Community</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connecting academic institutions with industry partners to drive innovation in mechatronics
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-mechatronix-600 hover:bg-mechatronix-700">
                  Join Community
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Join Our College Community?</h2>
                <p className="text-muted-foreground mb-6">
                  Our college community brings together academic institutions, researchers, and students to collaborate on cutting-edge mechatronics projects and research.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <School className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Academic Partnerships</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect with leading institutions and research labs worldwide
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Research Opportunities</h3>
                      <p className="text-sm text-muted-foreground">
                        Access funding, resources, and collaboration for advanced research
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Graduation className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Student Development</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide real-world project experience and industry connections for students
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="College students collaborating" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Latest College Partnerships</h3>
                  <p className="text-muted-foreground mb-4">
                    Join over 50+ colleges and universities that are already part of our growing network.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/college-partners">
                      View All Partners <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Upcoming College Events</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-card border rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="h-5 w-5 text-mechatronix-600" />
                      <span className="text-sm font-medium text-mechatronix-600">
                        {["May 15, 2023", "June 22, 2023", "July 10, 2023"][item - 1]}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      {["Annual Robotics Symposium", "Mechatronics Research Summit", "Industry-Academia Meetup"][item - 1]}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {[
                        "Join leading robotics researchers for our annual symposium featuring keynote speakers and workshops.",
                        "A collaborative event bringing together researchers to share the latest in mechatronics innovations.",
                        "Connect with industry professionals and explore partnership opportunities for research and development."
                      ][item - 1]}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Register Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CollegeCommunity;
