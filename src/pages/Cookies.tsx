
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">
        <section className="container px-4 md:px-6 py-12 md:py-20">
          <SectionHeading 
            title="Cookie Policy" 
            subtitle="Information about how we use cookies on our website"
          />
          
          <div className="prose prose-sm md:prose-base max-w-3xl mx-auto mt-8 dark:prose-invert">
            <div className="font-jakarta">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h3 className="font-syne font-bold">1. What Are Cookies</h3>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              
              <h3 className="font-syne font-bold">2. How We Use Cookies</h3>
              <p>
                MechatronixHub uses cookies for various purposes, including:
              </p>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be switched off in our systems.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization, such as remembering your preferences.
                </li>
                <li>
                  <strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant advertisements.
                </li>
              </ul>
              
              <h3 className="font-syne font-bold">3. Types of Cookies We Use</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-border p-2 text-left">Cookie Name</th>
                    <th className="border border-border p-2 text-left">Purpose</th>
                    <th className="border border-border p-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2">_session</td>
                    <td className="border border-border p-2">Maintains your session state</td>
                    <td className="border border-border p-2">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">_auth</td>
                    <td className="border border-border p-2">Remembers your login status</td>
                    <td className="border border-border p-2">30 days</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">_preferences</td>
                    <td className="border border-border p-2">Stores your site preferences</td>
                    <td className="border border-border p-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">_analytics</td>
                    <td className="border border-border p-2">Tracks anonymous usage data</td>
                    <td className="border border-border p-2">2 years</td>
                  </tr>
                </tbody>
              </table>
              
              <h3 className="font-syne font-bold">4. Managing Cookies</h3>
              <p>
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may impact your overall user experience.
              </p>
              <p>
                To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
              </p>
              
              <h3 className="font-syne font-bold">5. Changes to Our Cookie Policy</h3>
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
              </p>
              
              <h3 className="font-syne font-bold">6. Contact Us</h3>
              <p>
                If you have any questions about our Cookie Policy, please contact us at privacy@mechatronixhub.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
