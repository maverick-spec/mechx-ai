
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Menu, X, Layers, Users, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, toggleMenu, navigateAndClose, closeMenu } = useMobileMenu();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    closeMenu();
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { text: "Projects", path: "/projects", icon: <Layers className="h-4 w-4" />, requiresAuth: true },
    { text: "Team Up", path: "/team-up", icon: <Users className="h-4 w-4" />, requiresAuth: true },
    { text: "Community", path: "/community", icon: <MessageCircle className="h-4 w-4" />, requiresAuth: true },
    { text: "Pricing", path: "/pricing", icon: <HelpCircle className="h-4 w-4" />, requiresAuth: false },
    { text: "FAQs", path: "/faqs", icon: <HelpCircle className="h-4 w-4" />, requiresAuth: false }
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled || isOpen ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between h-auto md:h-20">
          <div className="flex items-center justify-between w-full md:w-auto py-4 md:py-0">
            <Link to="/" className="flex items-center gap-2" aria-label="Mechx AI" onClick={scrollToTop}>
              <span className="text-gradient font-bold text-lg md:text-xl font-syne">Mechx AI</span>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden menu-trigger"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              onClick={toggleMenu}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          <nav className="hidden md:flex items-center justify-center space-x-1 flex-1">
            {navItems.map((item) => (
              <SignedIn key={item.text + "-auth"}>
                {item.requiresAuth ? (
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "text-sm transition-colors",
                      isActive(item.path) && "bg-muted"
                    )}
                  >
                    <Link to={item.path} onClick={scrollToTop}>{item.text}</Link>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "text-sm transition-colors",
                      isActive(item.path) && "bg-muted"
                    )}
                  >
                    <Link to={item.path} onClick={scrollToTop}>{item.text}</Link>
                  </Button>
                )}
              </SignedIn>
              
              <SignedOut key={item.text}>
                {!item.requiresAuth && (
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "text-sm transition-colors",
                      isActive(item.path) && "bg-muted"
                    )}
                  >
                    <Link to={item.path} onClick={scrollToTop}>{item.text}</Link>
                  </Button>
                )}
              </SignedOut>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            
            <SignedOut>
              <Button variant="outline" onClick={() => navigate("/sign-in")}>
                Sign In
              </Button>
            </SignedOut>
            
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            <Button variant="default" size="sm" asChild className="bg-mechatronix-600 hover:bg-mechatronix-700">
              <Link to="/contact" onClick={scrollToTop}>Contact Us</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background md:hidden transition-all duration-300 mobile-menu",
          isOpen 
            ? "opacity-100 pointer-events-auto translate-x-0" 
            : "opacity-0 pointer-events-none translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6 overflow-auto">
          <nav className="flex flex-col space-y-1 mb-6">
            <SignedIn>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  variant="ghost"
                  className={cn(
                    "justify-start text-lg h-12",
                    isActive(item.path) && "bg-muted"
                  )}
                  onClick={() => navigateAndClose(item.path)}
                >
                  {item.icon}
                  <span className="ml-2">{item.text}</span>
                </Button>
              ))}
            </SignedIn>
            
            <SignedOut>
              {navItems.filter(item => !item.requiresAuth).map((item) => (
                <Button
                  key={item.text}
                  variant="ghost"
                  className={cn(
                    "justify-start text-lg h-12",
                    isActive(item.path) && "bg-muted"
                  )}
                  onClick={() => navigateAndClose(item.path)}
                >
                  {item.icon}
                  <span className="ml-2">{item.text}</span>
                </Button>
              ))}
            </SignedOut>
          </nav>
          
          <div className="flex flex-col space-y-4 mt-auto">
            <SignedOut>
              <Button onClick={() => navigateAndClose("/sign-in")}>
                Sign In
              </Button>
            </SignedOut>
            
            <SignedIn>
              <div className="flex justify-center mb-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            
            <Button onClick={() => navigateAndClose("/contact")} className="bg-mechatronix-600 hover:bg-mechatronix-700">
              Contact Us
            </Button>
            
            <div className="flex items-center justify-between">
              <Link
                to="/docs"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={closeMenu}
              >
                Documentation
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
