import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Menu } from "lucide-react";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { cn } from "@/lib/utils";

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
    href: "/community",
    label: "Community",
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

export function Navbar() {
  const { user, isSignedIn } = useUser();
  const mobileMenu = useMobileMenu();
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl text-mechatronix-600">MechX AI</span>
          </Link>
        </div>
        <div className="hidden md:flex md:flex-1">
          <nav className="flex items-center space-x-6 text-sm font-medium">
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
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {isSignedIn ? (
              <>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/sign-up">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden menu-trigger"
              onClick={mobileMenu.toggleMenu}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
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
          </div>
        </div>
      )}
    </header>
  );
}
