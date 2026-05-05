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
import Downloads from "./pages/Downloads";  // ← Changed from News to Downloads
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
            <Route path="/downloads" element={<Downloads />} />  {/* ← Changed from /news to /downloads */}
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
