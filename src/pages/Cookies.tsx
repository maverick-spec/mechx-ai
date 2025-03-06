
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
            subtitle="How we use cookies and similar technologies"
            align="center"
          />
          
          <div className="prose prose-sm md:prose-base max-w-3xl mx-auto mt-8 dark:prose-invert">
            <div className="font-jakarta">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h3 className="font-syne font-bold">1. Introduction</h3>
              <p>
                This Cookie Policy explains how Mechx AI uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them. Mechx AI is a platform for Mechatronics Engineering students to find project ideas, access resources, and collaborate with peers.
              </p>
              
              <h3 className="font-syne font-bold">2. What Are Cookies?</h3>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Mechx AI) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
              
              <h3 className="font-syne font-bold">3. Why Do We Use Cookies?</h3>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our website for advertising, analytics, and other purposes. This is described in more detail below.
              </p>
              
              <h3 className="font-syne font-bold">4. Types of Cookies We Use</h3>
              <p>
                The specific types of first and third-party cookies served through our website and the purposes they perform include:
              </p>
              <ul>
                <li><strong>Essential Website Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Without these cookies, services you have asked for, like secure login accounts, would not be possible.</li>
                <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</li>
                <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.</li>
                <li><strong>Advertising Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.</li>
                <li><strong>Social Media Cookies:</strong> These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other websites. These cookies may also be used for advertising purposes.</li>
              </ul>
              
              <h3 className="font-syne font-bold">5. How Can You Control Cookies?</h3>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
              </p>
              <p>
                If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.
              </p>
              <p>
                The specific types of first and third-party cookies served through our website and the purposes they perform are described in the table below:
              </p>
              
              <h3 className="font-syne font-bold">6. What About Other Tracking Technologies?</h3>
              <p>
                Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our website or opened an e-mail including them. This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of e-mail marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.
              </p>
              
              <h3 className="font-syne font-bold">7. Do You Serve Targeted Advertising?</h3>
              <p>
                Third parties may serve cookies on your computer or mobile device to serve advertising through our website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details, or other details that directly identify you unless you choose to provide these.
              </p>
              
              <h3 className="font-syne font-bold">8. How Often Will We Update This Cookie Policy?</h3>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p>
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
              
              <h3 className="font-syne font-bold">9. Where Can You Get Further Information?</h3>
              <p>
                If you have any questions about our use of cookies or other technologies, please email us at privacy@mechxai.com.
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
