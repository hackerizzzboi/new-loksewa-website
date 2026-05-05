import { useState, useEffect } from "react";
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
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (showLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLoading]);

  return (
    <>
      {showLoading && <NepalLoadingScreen onComplete={() => setShowLoading(false)} />}
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin route - OUTSIDE Layout (has its own navigation) */}
              <Route 
                path="/admin" 
                element={
                  <AdminGuard>
                    <Admin />
                  </AdminGuard>
                } 
              />
              
              {/* Portfolio route - OUTSIDE Layout (full page) */}
              <Route path="/portfolio" element={<Portfolio />} />
              
              {/* Main app routes - INSIDE Layout */}
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
    </>
  );
};

export default App;
