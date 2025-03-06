
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
            subtitle="Find answers to the most common questions about Mechx AI"
            align="center"
          />
          
          <div className="max-w-3xl mx-auto mt-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">What is Mechx AI?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  Mechx AI is a platform designed specifically for Mechatronics Engineering students to find project ideas, access pre-made code, watch tutorials, and collaborate with fellow students on robotics and mechatronics projects.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">How can I find project ideas?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  You can browse through our Projects section or use the AI-powered search to find project ideas that match your interests, skill level, and available resources. We organize projects by category, difficulty level, and components required.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">Are the projects free to use?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  Yes, most projects on Mechx AI are open-source and free to use for educational purposes. Some premium projects and pre-made kits may require a subscription or purchase. Free projects include schematics and code, while premium projects often include additional documentation, support, and physical components.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">How can I collaborate with other students?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  Our Team Up section allows you to connect with other students, join existing project teams, or create your own project and recruit team members with complementary skills. You can filter potential collaborators by expertise, location, and availability to find the perfect match for your project needs.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">Can I submit my own projects?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  Absolutely! We encourage students to share their projects with the community. You can submit your project through the "Submit Project" feature in the Projects section. Your submission will be reviewed by our team before being published. Make sure to include clear documentation, code, schematics, and images to help others understand and replicate your work.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">What kind of tutorials are available?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  We offer a wide range of tutorials covering various aspects of mechatronics, including robotics, automation, circuit design, microcontroller programming, sensor integration, motor control, and more. Our tutorials range from beginner to advanced levels and are regularly updated to reflect the latest technologies and techniques.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">Do you offer any certifications or credentials?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  Yes, we offer digital badges and certificates for completing certain projects and tutorial tracks. These can be added to your portfolio or resume to demonstrate your practical skills and experience in specific areas of mechatronics engineering.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">How can I get help if I'm stuck on a project?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  There are several ways to get assistance: (1) Post your question in our Community forum where experienced members can help, (2) Check the project's FAQ and troubleshooting sections, (3) Join a Team Up group working on similar projects, or (4) Contact our support team for premium projects that include direct support.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">What hardware components do I need to get started?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  For beginners, we recommend starting with a basic kit that includes an Arduino or Raspberry Pi, breadboard, jumper wires, basic sensors, and actuators. Each project lists the specific components required, and many projects offer alternatives if you don't have the exact components. Our pre-made project kits include all necessary hardware for specific projects.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">Is Mechx AI suitable for beginners with no prior experience?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  Yes! We have many resources specifically designed for beginners. Start with our "Introduction to Mechatronics" tutorial series, then move on to beginner-friendly projects that include detailed step-by-step instructions. Our community is also very supportive of newcomers and happy to help you on your learning journey.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">How do I purchase pre-made project kits?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  You can browse our Pre-made Projects section, select the kit you're interested in, and complete the purchase through our secure checkout. International shipping is available to most countries. Each kit includes all necessary hardware components, assembly instructions, and access to the project's online documentation and support resources.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12" className="border rounded-lg px-4">
                <AccordionTrigger className="font-syne">Do you offer academic or institutional licenses?</AccordionTrigger>
                <AccordionContent className="font-jakarta">
                  Yes, we offer special pricing for educational institutions, labs, and student groups. Contact our sales team at education@mechxai.com for more information on bulk licenses, custom project packs, and curriculum integration options.
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
