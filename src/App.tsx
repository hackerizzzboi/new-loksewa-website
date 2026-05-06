import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Admin from './pages/Admin';
import { AdminGuard } from './components/AdminGuard';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import QuizPage from "./pages/QuizPage";
import OldIsGold from "./pages/OldIsGold";
import OnlineExam from "./pages/OnlineExam";
import Syllabus from "./pages/Syllabus";
import TypingPractice from "./pages/TypingPractice";
import Notes from "./pages/Notes";
import Downloads from "./pages/Downloads";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import NepalLoadingScreen from "./components/NepalLoadingScreen";

const queryClient = new QueryClient();

// Separate component for the main app content
const AppContent = () => {
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Check if this is a fresh page load (not client-side navigation)
    const navigationType = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const isReload = navigationType?.type === "reload";
    
    // Show loading only on homepage AND (first visit OR manual reload)
    if (location.pathname === "/") {
      // Check if we're coming from navigation (not full page reload)
      const isClientSideNavigation = sessionStorage.getItem("clientSideNav") === "true";
      
      if (!isClientSideNavigation || isReload) {
        setShowLoading(true);
        // Set timeout to hide loading after 3 seconds
        const timer = setTimeout(() => {
          setShowLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setShowLoading(false);
      }
    } else {
      setShowLoading(false);
    }
    
    // Mark that we're doing client-side navigation
    sessionStorage.setItem("clientSideNav", "true");
    
    // Reset on page unload
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("clientSideNav");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [location.pathname]);

  // Prevent body scroll during loading
  useEffect(() => {
    if (showLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [showLoading]);

  return (
    <>
      {showLoading && <NepalLoadingScreen onComplete={() => setShowLoading(false)} />}
      
      <div style={{ display: showLoading ? 'none' : 'block' }}>
        <Routes>
          <Route 
            path="/admin" 
            element={
              <AdminGuard>
                <Admin />
              </AdminGuard>
            } 
          />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/quiz/:category/:setId?" element={<QuizPage />} />
            <Route path="/old-is-gold" element={<OldIsGold />} />
            <Route path="/online-exam" element={<OnlineExam />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/typing" element={<TypingPractice />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/downloads" element={<Downloads />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
