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
import News from "./pages/News";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/quiz/:category/:setId?" element={<QuizPage />} />
            <Route path="/old-is-gold" element={<OldIsGold />} />
            <Route path="/online-exam" element={<OnlineExam />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/typing" element={<TypingPractice />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/news" element={<News />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
