import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import PremadeProjects from "./pages/PremadeProjects";
import ProjectDetail from "./pages/ProjectDetail";
import PremadeProjectDetail from "./pages/PremadeProjectDetail";
import Tutorials from "./pages/Tutorials";
import TeamUp from "./pages/TeamUp";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import Documentation from "./pages/Documentation";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

// ScrollToTop component to handle scrolling to top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    
    // Changed to prefer light mode by default
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Set the document title to the new name
    document.title = "Mechx AI | Future Engineering Solutions";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/premade-projects" element={<PremadeProjects />} />
            <Route path="/premade-projects/:id" element={<PremadeProjectDetail />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/team-up" element={<TeamUp />} />
            <Route path="/community" element={<Community />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;