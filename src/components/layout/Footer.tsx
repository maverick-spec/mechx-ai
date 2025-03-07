
import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import { Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">MechX AI</h3>
            <p className="text-sm text-muted-foreground">
              The future of engineering at your fingertips
            </p>
            <div className="flex gap-4 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/ai-search"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI Project Search
                </Link>
              </li>
              <li>
                <SignedIn>
                  <Link
                    to="/projects"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Projects
                  </Link>
                </SignedIn>
              </li>
              <li>
                <SignedIn>
                  <Link
                    to="/community"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Community
                  </Link>
                </SignedIn>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t text-sm text-muted-foreground">
          <p>© 2024 MechX AI. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Made with ❤️ for engineers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};
