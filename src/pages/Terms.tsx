
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">
        <section className="container px-4 md:px-6 py-12 md:py-20">
          <SectionHeading 
            title="Terms of Service" 
            subtitle="Please read these terms carefully before using MechatronixHub"
          />
          
          <div className="prose prose-sm md:prose-base max-w-3xl mx-auto mt-8 dark:prose-invert">
            <div className="font-jakarta">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h3 className="font-syne font-bold">1. Acceptance of Terms</h3>
              <p>
                By accessing or using MechatronixHub, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
              
              <h3 className="font-syne font-bold">2. Description of Service</h3>
              <p>
                MechatronixHub is a platform for Mechatronics Engineering students to find project ideas, access pre-made code, watch tutorials, and collaborate with fellow students on robotics and mechatronics projects.
              </p>
              
              <h3 className="font-syne font-bold">3. User Accounts</h3>
              <p>
                To access certain features of MechatronixHub, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>
              
              <h3 className="font-syne font-bold">4. User Content</h3>
              <p>
                By submitting content to MechatronixHub, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content.
              </p>
              
              <h3 className="font-syne font-bold">5. Intellectual Property</h3>
              <p>
                All content on MechatronixHub, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of MechatronixHub or its content suppliers and is protected by intellectual property laws.
              </p>
              
              <h3 className="font-syne font-bold">6. Prohibited Activities</h3>
              <p>
                You agree not to engage in any of the following activities:
              </p>
              <ul>
                <li>Violating any applicable laws or regulations</li>
                <li>Impersonating any person or entity</li>
                <li>Interfering with or disrupting the service</li>
                <li>Collecting or harvesting user data without permission</li>
                <li>Uploading malicious code or content</li>
              </ul>
              
              <h3 className="font-syne font-bold">7. Termination</h3>
              <p>
                We reserve the right to terminate or suspend your account and access to MechatronixHub at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
              </p>
              
              <h3 className="font-syne font-bold">8. Disclaimer of Warranties</h3>
              <p>
                MechatronixHub is provided "as is" without any warranties, expressed or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.
              </p>
              
              <h3 className="font-syne font-bold">9. Limitation of Liability</h3>
              <p>
                In no event shall MechatronixHub be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.
              </p>
              
              <h3 className="font-syne font-bold">10. Changes to Terms</h3>
              <p>
                We reserve the right to modify these Terms of Service at any time. Your continued use of MechatronixHub after such modifications constitutes your acceptance of the revised terms.
              </p>
              
              <h3 className="font-syne font-bold">11. Contact Information</h3>
              <p>
                If you have any questions about these Terms of Service, please contact us at legal@mechatronixhub.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
