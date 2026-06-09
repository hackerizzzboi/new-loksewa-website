import DailyMCQCard from "@/components/DailyMCQCard";
import { Link } from "react-router-dom";
import { Calendar, Sparkles } from "lucide-react";

const DailyMCQPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl mb-3">
            <Calendar className="text-white" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Daily MCQ</h1>
          <p className="text-muted-foreground mt-2 flex items-center justify-center gap-1.5 text-sm">
            <Sparkles size={14} className="text-amber-500" /> A fresh question every day — answer fast, climb the daily list!
          </p>
        </div>

        <DailyMCQCard />

        <div className="mt-8 bg-card rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold mb-2">How it works</h3>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
            <li>Admin posts a new question every day.</li>
            <li>You get <strong>one attempt</strong> per question.</li>
            <li>After answering, you see the correct option, the explanation, and who else got it right.</li>
            <li>Build your streak — answer daily to unlock badges 🔥</li>
          </ul>
          <Link to="/leaderboard" className="inline-block mt-4 text-sm text-primary font-semibold hover:underline">View full leaderboard →</Link>
        </div>
      </div>
    </div>
  );
};

export default DailyMCQPage;
