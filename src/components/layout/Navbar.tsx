
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Menu, X, Search, ChevronDown, Layers, Lightbulb, Users, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/hooks/use-mobile-menu";

export const Navbar = () => {
  const location = useLocation();
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
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { text: "Projects", path: "/projects", icon: <Layers className="h-4 w-4" /> },
    { text: "Pre-made Projects", path: "/premade-projects", icon: <Layers className="h-4 w-4" /> },
    { text: "Tutorials", path: "/tutorials", icon: <Lightbulb className="h-4 w-4" /> },
    { text: "Team Up", path: "/team-up", icon: <Users className="h-4 w-4" /> },
    { text: "Community", path: "/community", icon: <MessageCircle className="h-4 w-4" /> },
    { text: "FAQs", path: "/faqs", icon: <HelpCircle className="h-4 w-4" /> }
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled || isOpen ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}>
        <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-1 md:gap-10">
            <Link to="/" className="flex items-center gap-2" aria-label="NexTech Mechatronics">
              <span className="text-gradient font-bold text-lg md:text-xl font-syne">NexTech Mechatronics</span>
            </Link>
            
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  variant="ghost"
                  asChild
                  className={cn(
                    "text-sm transition-colors",
                    isActive(item.path) && "bg-muted"
                  )}
                >
                  <Link to={item.path}>{item.text}</Link>
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button variant="ghost" className="w-9 px-0" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
              <ThemeToggle />
            </div>
            <Button variant="default" size="sm" asChild className="hidden md:inline-flex bg-mechatronix-600 hover:bg-mechatronix-700">
              <Link to="/contact">Contact Us</Link>
            </Button>
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
          </nav>
          
          <div className="flex flex-col space-y-4 mt-auto">
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
