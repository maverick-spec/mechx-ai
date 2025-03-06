
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
            subtitle="Please read these terms carefully before using Mechx AI"
            align="center"
          />
          
          <div className="prose prose-sm md:prose-base max-w-3xl mx-auto mt-8 dark:prose-invert">
            <div className="font-jakarta">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h3 className="font-syne font-bold">1. Introduction</h3>
              <p>
                Welcome to Mechx AI, a platform for Mechatronics Engineering students to find project ideas, access resources, and collaborate with peers. These Terms of Service ("Terms") govern your access to and use of Mechx AI's website, services, and content ("Services"). By accessing or using our Services, you agree to be bound by these Terms.
              </p>
              
              <h3 className="font-syne font-bold">2. Description of Service</h3>
              <p>
                Mechx AI provides a platform for students and professionals in mechatronics engineering to discover project ideas, access educational resources, purchase pre-made project kits, and collaborate with others on technical projects. Our Services include project repositories, tutorials, community forums, team formation tools, and an online marketplace for engineering components and kits.
              </p>
              
              <h3 className="font-syne font-bold">3. User Accounts</h3>
              <p>
                To access certain features of Mechx AI, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must provide accurate and complete information when creating an account and keep this information updated. You are solely responsible for safeguarding your password and restricting access to your account.
              </p>
              
              <h3 className="font-syne font-bold">4. User Content</h3>
              <p>
                By submitting content to Mechx AI, including but not limited to project submissions, comments, forum posts, and tutorial contributions ("User Content"), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in connection with providing our Services.
              </p>
              <p>
                You represent and warrant that: (i) you own the User Content or have the right to use and grant us the rights and license as provided in these Terms, and (ii) the posting of your User Content does not violate the privacy rights, publicity rights, copyrights, contract rights, intellectual property rights, or any other rights of any person or entity.
              </p>
              
              <h3 className="font-syne font-bold">5. Intellectual Property</h3>
              <p>
                All content on Mechx AI, including text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of Mechx AI or its content suppliers and is protected by intellectual property laws. The compilation of all content on this site is the exclusive property of Mechx AI and is protected by copyright laws.
              </p>
              <p>
                For open-source projects, the specific license terms accompanying each project will govern your rights to use, modify, and distribute that project. Premium content and pre-made project kits are subject to additional terms that will be provided at the time of purchase.
              </p>
              
              <h3 className="font-syne font-bold">6. Prohibited Activities</h3>
              <p>
                You agree not to engage in any of the following activities:
              </p>
              <ul>
                <li>Violating any applicable laws, regulations, or third-party rights</li>
                <li>Impersonating any person or entity, or falsely stating or misrepresenting your affiliation with a person or entity</li>
                <li>Interfering with or disrupting the Services or servers or networks connected to the Services</li>
                <li>Collecting or harvesting user data without permission</li>
                <li>Uploading malicious code or content that could damage or compromise the integrity of our Services</li>
                <li>Using our Services for any purpose that is illegal, harmful, fraudulent, deceptive, threatening, harassing, defamatory, or obscene</li>
                <li>Attempting to circumvent any content-filtering techniques we employ</li>
              </ul>
              
              <h3 className="font-syne font-bold">7. Termination</h3>
              <p>
                We reserve the right to terminate or suspend your account and access to Mechx AI at our sole discretion, without notice, for conduct that we believe violates these Terms of Service, poses a risk to other users, our business, or third parties, or for any other reason. Upon termination, your right to use the Services will immediately cease.
              </p>
              
              <h3 className="font-syne font-bold">8. Disclaimer of Warranties</h3>
              <p>
                Mechx AI is provided "as is" without any warranties, expressed or implied. We do not guarantee that the Services will be uninterrupted, secure, or error-free. We make no warranty regarding the quality, accuracy, timeliness, truthfulness, completeness, or reliability of any content available through our Services.
              </p>
              <p>
                Projects and tutorials on Mechx AI may involve electrical components, mechanical systems, and other potentially hazardous elements. You are solely responsible for implementing proper safety measures when attempting any project or tutorial. Mechx AI is not liable for any injuries, damages, or losses resulting from the use of information or instructions provided on our platform.
              </p>
              
              <h3 className="font-syne font-bold">9. Limitation of Liability</h3>
              <p>
                In no event shall Mechx AI be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Services. This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such damages.
              </p>
              
              <h3 className="font-syne font-bold">10. Changes to Terms</h3>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting the updated terms on our website and updating the "Last updated" date. Your continued use of Mechx AI after such modifications constitutes your acceptance of the revised terms.
              </p>
              
              <h3 className="font-syne font-bold">11. Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the courts of [Jurisdiction].
              </p>
              
              <h3 className="font-syne font-bold">12. Contact Information</h3>
              <p>
                If you have any questions about these Terms of Service, please contact us at legal@mechxai.com.
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
