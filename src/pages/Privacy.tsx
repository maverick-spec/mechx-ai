
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">
        <section className="container px-4 md:px-6 py-12 md:py-20">
          <SectionHeading 
            title="Privacy Policy" 
            subtitle="How we collect, use, and protect your information"
            align="center"
          />
          
          <div className="prose prose-sm md:prose-base max-w-3xl mx-auto mt-8 dark:prose-invert">
            <div className="font-jakarta">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h3 className="font-syne font-bold">1. Introduction</h3>
              <p>
                At Mechx AI, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Mechx AI is a platform for Mechatronics Engineering students to find project ideas, access resources, and collaborate with peers.
              </p>
              
              <h3 className="font-syne font-bold">2. Information We Collect</h3>
              <p>
                We collect several types of information from and about users of our platform:
              </p>
              <ul>
                <li><strong>Personal Information:</strong> We may collect personally identifiable information such as your name, email address, telephone number, address, and academic or professional credentials when you register for an account, subscribe to our services, or make a purchase.</li>
                <li><strong>Profile Information:</strong> Information you provide in your user profile, including skills, educational background, projects you've worked on, and profile photos.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including your browsing actions, search queries, viewed projects, tutorial progression, and interaction with other users.</li>
                <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system, and platform.</li>
                <li><strong>User Content:</strong> Projects, tutorials, comments, forum posts, and other content you submit to our platform.</li>
              </ul>
              
              <h3 className="font-syne font-bold">3. How We Use Your Information</h3>
              <p>
                We use the information we collect about you for various purposes:
              </p>
              <ul>
                <li>To provide, maintain, and improve our platform</li>
                <li>To process transactions and send transaction-related communications</li>
                <li>To create and manage your account</li>
                <li>To connect you with other users for collaboration</li>
                <li>To personalize your experience and deliver content relevant to your interests</li>
                <li>To send you technical notices, updates, security alerts, and support messages</li>
                <li>To respond to your comments, questions, and customer service requests</li>
                <li>To monitor and analyze usage patterns and trends</li>
                <li>To protect our platform and users from fraudulent, unauthorized, or illegal activity</li>
              </ul>
              
              <h3 className="font-syne font-bold">4. Sharing Your Information</h3>
              <p>
                We may share your information in the following situations:
              </p>
              <ul>
                <li><strong>With Other Users:</strong> Your profile information and submitted content may be visible to other users of the platform. You can adjust your privacy settings to control the visibility of certain information.</li>
                <li><strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, and contractors who perform services for us or on our behalf.</li>
                <li><strong>For Legal Purposes:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger, acquisition, reorganization, or sale of all or a portion of our assets.</li>
                <li><strong>With Your Consent:</strong> We may disclose your information for any other purpose with your consent.</li>
              </ul>
              
              <h3 className="font-syne font-bold">5. Data Security</h3>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h3 className="font-syne font-bold">6. Your Data Protection Rights</h3>
              <p>
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul>
                <li>The right to access your personal information</li>
                <li>The right to rectify inaccurate personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to restrict processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at privacy@mechxai.com.
              </p>
              
              <h3 className="font-syne font-bold">7. Children's Privacy</h3>
              <p>
                Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete the information.
              </p>
              
              <h3 className="font-syne font-bold">8. Changes to Our Privacy Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
              
              <h3 className="font-syne font-bold">9. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@mechxai.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
