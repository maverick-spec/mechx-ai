import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, Menu, X, Sun, Moon, Github, Search,
  User, LogOut, LayoutDashboard, Users, AtSign
} from "lucide-react";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMobileMenu } from "@/hooks/use-mobile-menu";

export const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, toggle, close } = useMobileMenu();
  const { signOut } = useClerk();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    close();
  }, [location.pathname, close]);

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4 mr-1.5" /> },
    { href: "/projects", label: "Projects", icon: <LayoutDashboard className="h-4 w-4 mr-1.5" />, protected: true },
    { href: "/team-up", label: "Team Up", icon: <Users className="h-4 w-4 mr-1.5" />, protected: true },
    { href: "/community", label: "Community", icon: <AtSign className="h-4 w-4 mr-1.5" />, protected: true },
    { href: "/contact", label: "Contact", icon: <AtSign className="h-4 w-4 mr-1.5" /> },
  ];

  const handleLogout = () => {
    signOut();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isOpen ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-bold text-xl tracking-tight flex items-center"
        >
          <span className="text-mechatronix-600 dark:text-mechatronix-400">
            Mech
            <span className="text-primary">X</span> AI
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            // If item is protected, wrap in SignedIn component
            if (item.protected) {
              return (
                <SignedIn key={item.href}>
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm flex items-center hover:bg-accent ${
                      location.pathname === item.href
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </SignedIn>
              );
            }
            
            // Otherwise, render normally
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm flex items-center hover:bg-accent ${
                  location.pathname === item.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User avatar"} />
                    <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          
          <SignedOut>
            <Button variant="outline" size="sm" asChild>
              <Link to="/sign-in">
                <User className="h-4 w-4 mr-1.5" />
                Sign In
              </Link>
            </Button>
          </SignedOut>

          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggle}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden p-4 pt-0 pb-6 border-b bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              // If item is protected, wrap in SignedIn component
              if (item.protected) {
                return (
                  <SignedIn key={item.href}>
                    <Link
                      to={item.href}
                      className={`px-3 py-3 rounded-md text-sm flex items-center hover:bg-accent ${
                        location.pathname === item.href
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </SignedIn>
                );
              }
              
              // Otherwise, render normally
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-3 rounded-md text-sm flex items-center hover:bg-accent ${
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
            
            <SignedOut>
              <Link
                to="/sign-in"
                className="mt-2 flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              >
                <User className="h-4 w-4 mr-1.5" />
                Sign In
              </Link>
            </SignedOut>
            
            <SignedIn>
              <Button 
                variant="destructive" 
                className="mt-2" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-1.5" />
                Log out
              </Button>
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  );
};
