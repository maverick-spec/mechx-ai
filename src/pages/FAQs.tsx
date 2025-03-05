
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">
        <section className="container px-4 md:px-6 py-12 md:py-20">
          <SectionHeading 
            title="Frequently Asked Questions" 
            subtitle="Find answers to the most common questions about MechatronixHub"
          />
          
          <div className="max-w-3xl mx-auto mt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-syne">What is MechatronixHub?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  MechatronixHub is a platform designed specifically for Mechatronics Engineering students to find project ideas, access pre-made code, watch tutorials, and collaborate with fellow students on robotics and mechatronics projects.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-syne">How can I find project ideas?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  You can browse through our Projects section or use the AI-powered search to find project ideas that match your interests, skill level, and available resources.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-syne">Are the projects free to use?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  Yes, most projects on MechatronixHub are open-source and free to use for educational purposes. Some premium projects may require a subscription.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="font-syne">How can I collaborate with other students?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  Our Team Up section allows you to connect with other students, join existing project teams, or create your own project and recruit team members with complementary skills.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="font-syne">Can I submit my own projects?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  Absolutely! We encourage students to share their projects with the community. You can submit your project through the "Submit Project" feature in the Projects section.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="font-syne">What kind of tutorials are available?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  We offer a wide range of tutorials covering various aspects of mechatronics, including robotics, automation, circuit design, microcontroller programming, and more.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
