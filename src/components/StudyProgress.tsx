import { useState, useEffect } from "react";

const StudyProgress = () => {
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Load quiz history
    const history = localStorage.getItem("quiz_history");
    if (history) {
      try {
        const parsed = JSON.parse(history);
        setQuizHistory(parsed);
        calculateStreak(parsed);
      } catch {}
    }

    // Track today's visit
    const today = new Date().toISOString().split("T")[0];
    const visits = JSON.parse(localStorage.getItem("study_visits") || "[]");
    if (!visits.includes(today)) {
      visits.push(today);
      localStorage.setItem("study_visits", JSON.stringify(visits.slice(-30)));
    }
  }, []);

  const calculateStreak = (history: any[]) => {
    if (history.length === 0) {
      // Calculate from visits
      const visits: string[] = JSON.parse(localStorage.getItem("study_visits") || "[]");
      let count = 0;
      const today = new Date();
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        if (visits.includes(dateStr)) {
          count++;
        } else if (i > 0) break;
      }
      setStreak(count);
      return;
    }

    // Calculate from quiz history
    const dates = [...new Set(history.map((h: any) => new Date(h.date).toISOString().split("T")[0]))].sort().reverse();
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      if (dates.includes(dateStr)) {
        count++;
      } else if (i > 0) break;
    }
    setStreak(count);
  };

  const totalQuizzes = quizHistory.length;
  const avgScore = totalQuizzes > 0 ? (quizHistory.reduce((a, h) => a + (h.score || 0), 0) / totalQuizzes) : 0;
  const bestScore = totalQuizzes > 0 ? Math.max(...quizHistory.map((h: any) => h.score || 0)) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 text-center border border-orange-100">
        <div className="text-3xl mb-1">🔥</div>
        <div className="text-2xl font-bold text-orange-600">{streak}</div>
        <div className="text-xs text-orange-500 font-medium">Day Streak</div>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-100">
        <div className="text-3xl mb-1">📝</div>
        <div className="text-2xl font-bold text-blue-600">{totalQuizzes}</div>
        <div className="text-xs text-blue-500 font-medium">Quizzes Taken</div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center border border-green-100">
        <div className="text-3xl mb-1">📊</div>
        <div className="text-2xl font-bold text-green-600">{avgScore.toFixed(0)}%</div>
        <div className="text-xs text-green-500 font-medium">Avg Score</div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center border border-purple-100">
        <div className="text-3xl mb-1">🏆</div>
        <div className="text-2xl font-bold text-purple-600">{bestScore}%</div>
        <div className="text-xs text-purple-500 font-medium">Best Score</div>
      </div>
    </div>
  );
};

export default StudyProgress;
