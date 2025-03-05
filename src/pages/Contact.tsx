
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Message Sent!",
      description: "We've received your message and will get back to you soon.",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">
        <section className="container px-4 md:px-6 py-12 md:py-20">
          <SectionHeading 
            title="Contact Us" 
            subtitle="Get in touch with our team for any questions or support"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-8">
            <div className="space-y-6">
              <h3 className="text-xl font-syne font-bold">Get In Touch</h3>
              <p className="text-muted-foreground font-jakarta">
                Have questions about MechatronixHub? Need technical support or want to suggest a new feature? 
                Fill out the form and our team will get back to you as soon as possible.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-5 w-5 mt-0.5 text-mechatronix-600" />
                  <div>
                    <h4 className="font-syne font-bold">Our Location</h4>
                    <p className="text-sm text-muted-foreground font-jakarta">123 Robotics Avenue, Tech Park, CA 94103</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MailIcon className="h-5 w-5 mt-0.5 text-mechatronix-600" />
                  <div>
                    <h4 className="font-syne font-bold">Email Us</h4>
                    <p className="text-sm text-muted-foreground font-jakarta">support@mechatronixhub.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <PhoneIcon className="h-5 w-5 mt-0.5 text-mechatronix-600" />
                  <div>
                    <h4 className="font-syne font-bold">Call Us</h4>
                    <p className="text-sm text-muted-foreground font-jakarta">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-syne font-bold">Your Name</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="font-jakarta"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-syne font-bold">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="font-jakarta"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-syne font-bold">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="font-jakarta"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-syne font-bold">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] font-jakarta"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-mechatronix-600 hover:bg-mechatronix-700 font-jakarta">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
