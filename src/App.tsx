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

const App = () => {
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(true);
  const [hasLoadedBefore, setHasLoadedBefore] = useState(false);

  // Check if we already showed loading screen in this session
  useEffect(() => {
    const sessionLoaded = sessionStorage.getItem("loadingScreenShown");
    if (sessionLoaded) {
      setShowLoading(false);
      setHasLoadedBefore(true);
    } else {
      // Only show loading on first visit
      const timer = setTimeout(() => {
        setShowLoading(false);
        sessionStorage.setItem("loadingScreenShown", "true");
      }, 3000); // 3 seconds loading time
      return () => clearTimeout(timer);
    }
  }, []);

  // Prevent body scroll during loading
  useEffect(() => {
    if (showLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [showLoading]);

  return (
    <>
      {/* Loading Screen - Only shows on first visit */}
      {showLoading && !hasLoadedBefore && <NepalLoadingScreen onComplete={() => setShowLoading(false)} />}
      
      {/* Main App */}
      <div style={{ display: showLoading && !hasLoadedBefore ? 'none' : 'block' }}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Sonner />
            <BrowserRouter>
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
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
