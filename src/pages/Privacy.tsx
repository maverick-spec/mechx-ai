
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
            subtitle="Learn how we collect, use, and protect your personal information"
          />
          
          <div className="prose prose-sm md:prose-base max-w-3xl mx-auto mt-8 dark:prose-invert">
            <div className="font-jakarta">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h3 className="font-syne font-bold">1. Introduction</h3>
              <p>
                MechatronixHub ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              
              <h3 className="font-syne font-bold">2. Information We Collect</h3>
              <p>
                We may collect information about you in various ways, including:
              </p>
              <ul>
                <li>
                  <strong>Personal Data:</strong> Name, email address, phone number, and other contact information provided during registration or when using our services.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you access and use our platform, including your IP address, browser type, operating system, and referral URLs.
                </li>
                <li>
                  <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our platform and hold certain information.
                </li>
              </ul>
              
              <h3 className="font-syne font-bold">3. How We Use Your Information</h3>
              <p>
                We may use the information we collect for various purposes, including:
              </p>
              <ul>
                <li>Providing and maintaining our services</li>
                <li>Personalizing and improving your experience on our platform</li>
                <li>Communicating with you about updates, support, and other information</li>
                <li>Analyzing usage patterns to enhance our platform</li>
                <li>Detecting and preventing fraudulent or unauthorized activities</li>
              </ul>
              
              <h3 className="font-syne font-bold">4. Disclosure of Your Information</h3>
              <p>
                We may share your information with third parties only in the following circumstances:
              </p>
              <ul>
                <li>With service providers who perform services on our behalf</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a business transfer or transaction</li>
                <li>With your consent</li>
              </ul>
              
              <h3 className="font-syne font-bold">5. Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
              
              <h3 className="font-syne font-bold">6. Your Data Protection Rights</h3>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>The right to access and receive a copy of your personal information</li>
                <li>The right to rectify or update your personal information</li>
                <li>The right to erase your personal information</li>
                <li>The right to restrict processing of your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>
              
              <h3 className="font-syne font-bold">7. Changes to This Privacy Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              
              <h3 className="font-syne font-bold">8. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@mechatronixhub.com.
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
