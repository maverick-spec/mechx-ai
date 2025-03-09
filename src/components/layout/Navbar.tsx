
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Menu, Sun, Moon } from "lucide-react";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  {
    href: "/projects",
    label: "Projects",
    active: false,
  },
  {
    href: "/team-up",
    label: "Team Up",
    active: false,
  },
  {
    href: "/college-community",
    label: "College Community",
    active: false,
  },
  {
    href: "/students-community",
    label: "Students Community",
    active: false,
  },
  {
    href: "/pricing",
    label: "Pricing",
    active: false,
  },
  {
    href: "/faqs",
    label: "FAQs",
    active: false,
  },
  {
    href: "/contact",
    label: "Contact",
    active: false,
  },
];

// Create an inline ThemeToggle component
function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="transition-all duration-200 hover:bg-muted"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function Navbar() {
  const { user, isSignedIn } = useUser();
  const mobileMenu = useMobileMenu();
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-syne font-bold text-2xl">
              <span className="text-mechatronix-600 mr-1">M</span>echX AI
            </span>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "transition-colors text-muted-foreground hover:text-foreground flex items-center gap-1",
                  item.active && "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {isSignedIn ? (
              <>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link to="/sign-in" className="hidden sm:inline-block">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/sign-up" className="hidden sm:inline-block">
                  <Button size="sm">Sign Up</Button>
                </Link>
                <div className="sm:hidden">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="menu-trigger"
                    onClick={mobileMenu.toggleMenu}
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
      {mobileMenu.isOpen && (
        <div className="md:hidden mobile-menu">
          <div className="container py-4 grid gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-muted-foreground hover:text-foreground",
                  item.active && "text-foreground font-medium"
                )}
                onClick={mobileMenu.closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t">
              <Link to="/sign-in" onClick={mobileMenu.closeMenu}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/sign-up" onClick={mobileMenu.closeMenu}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
