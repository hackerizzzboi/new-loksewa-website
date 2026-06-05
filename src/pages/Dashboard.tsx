import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Target, BookOpen, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Attempt {
  id: string;
  title: string | null;
  exam_type: string;
  category: string | null;
  score: number;
  total_questions: number;
  correct_count: number;
  wrong_count: number;
  skipped_count: number;
  time_taken_seconds: number | null;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: a }, { data: p }] = await Promise.all([
        supabase
          .from("exam_attempts")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
      ]);
      setAttempts((a as Attempt[]) || []);
      setFullName(p?.full_name || user.email || "");
      setLoading(false);
    })();
  }, [user]);

  const total = attempts.length;
  const avg = total
    ? attempts.reduce((s, a) => s + (a.total_questions ? (a.score / (a.total_questions * 2)) * 100 : 0), 0) / total
    : 0;
  const best = total
    ? Math.max(...attempts.map((a) => (a.total_questions ? (a.score / (a.total_questions * 2)) * 100 : 0)))
    : 0;

  // subject breakdown
  const byCategory: Record<string, { count: number; avg: number }> = {};
  attempts.forEach((a) => {
    const key = a.category || a.exam_type;
    const pct = a.total_questions ? (a.score / (a.total_questions * 2)) * 100 : 0;
    if (!byCategory[key]) byCategory[key] = { count: 0, avg: 0 };
    byCategory[key].avg = (byCategory[key].avg * byCategory[key].count + pct) / (byCategory[key].count + 1);
    byCategory[key].count++;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold">👋 Welcome, {fullName}</h1>
        <p className="text-muted-foreground">Your performance overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={BookOpen} label="Exams Taken" value={total.toString()} color="blue" />
        <StatCard icon={Target} label="Average Score" value={`${avg.toFixed(1)}%`} color="orange" />
        <StatCard icon={Trophy} label="Best Score" value={`${best.toFixed(1)}%`} color="green" />
        <StatCard icon={TrendingUp} label="Pass Rate" value={`${total ? ((attempts.filter(a => (a.score/(a.total_questions*2))*100 >= 40).length/total)*100).toFixed(0) : 0}%`} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-2xl shadow-sm p-5">
          <h2 className="font-heading font-bold text-lg mb-4">📊 By Category</h2>
          {Object.keys(byCategory).length === 0 ? (
            <p className="text-muted-foreground text-sm">No attempts yet.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(byCategory).map(([k, v]) => (
                <div key={k}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{k} ({v.count})</span>
                    <span className="font-bold">{v.avg.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${Math.min(100, v.avg)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card rounded-2xl shadow-sm p-5">
          <h2 className="font-heading font-bold text-lg mb-4">📈 Recent Trend</h2>
          {attempts.length === 0 ? (
            <p className="text-muted-foreground text-sm">Take an exam to see your trend.</p>
          ) : (
            <div className="flex items-end gap-1 h-32">
              {attempts.slice(0, 15).reverse().map((a, i) => {
                const pct = a.total_questions ? (a.score / (a.total_questions * 2)) * 100 : 0;
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end" title={`${pct.toFixed(1)}%`}>
                    <div
                      className={`rounded-t ${pct >= 40 ? "bg-green-500" : "bg-red-500"}`}
                      style={{ height: `${Math.max(4, pct)}%` }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm p-5">
        <h2 className="font-heading font-bold text-lg mb-4">🕘 Recent Exam History</h2>
        {attempts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You haven't taken any exams yet.</p>
            <Link to="/online-exam" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold inline-block">
              Start an Exam
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground border-b">
                <tr>
                  <th className="py-2">Title</th>
                  <th className="py-2">Type</th>
                  <th className="py-2 text-center">Score</th>
                  <th className="py-2 text-center">Correct</th>
                  <th className="py-2 text-center">Wrong</th>
                  <th className="py-2 text-center">%</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a) => {
                  const pct = a.total_questions ? (a.score / (a.total_questions * 2)) * 100 : 0;
                  return (
                    <tr key={a.id} className="border-b hover:bg-muted/40">
                      <td className="py-2 font-medium">{a.title || "Quiz"}</td>
                      <td className="py-2 text-xs">{a.exam_type}</td>
                      <td className="py-2 text-center">{a.score} / {a.total_questions * 2}</td>
                      <td className="py-2 text-center text-green-600">{a.correct_count}</td>
                      <td className="py-2 text-center text-red-600">{a.wrong_count}</td>
                      <td className={`py-2 text-center font-bold ${pct >= 40 ? "text-green-600" : "text-red-600"}`}>{pct.toFixed(1)}%</td>
                      <td className="py-2 text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className={`bg-card rounded-2xl shadow-sm p-5 border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <Icon className={`text-${color}-500 opacity-60`} size={32} />
    </div>
  </div>
);

export default Dashboard;
