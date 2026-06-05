import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Medal, Award } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Row {
  user_id: string;
  full_name: string;
  attempts: number;
  best_pct: number;
  avg_pct: number;
  total_score: number;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: attempts } = await supabase
        .from("exam_attempts")
        .select("user_id, score, total_questions");
      const { data: profiles } = await supabase.from("profiles").select("id, full_name");
      const nameMap = new Map((profiles || []).map((p) => [p.id, p.full_name || "Anonymous"]));
      const agg = new Map<string, { attempts: number; total_pct: number; best_pct: number; total_score: number }>();
      (attempts || []).forEach((a: any) => {
        const pct = a.total_questions ? (a.score / (a.total_questions * 2)) * 100 : 0;
        const cur = agg.get(a.user_id) || { attempts: 0, total_pct: 0, best_pct: 0, total_score: 0 };
        cur.attempts++;
        cur.total_pct += pct;
        cur.best_pct = Math.max(cur.best_pct, pct);
        cur.total_score += a.score;
        agg.set(a.user_id, cur);
      });
      const list: Row[] = Array.from(agg.entries()).map(([uid, v]) => ({
        user_id: uid,
        full_name: nameMap.get(uid) || "Anonymous",
        attempts: v.attempts,
        best_pct: v.best_pct,
        avg_pct: v.total_pct / v.attempts,
        total_score: v.total_score,
      }));
      list.sort((a, b) => b.total_score - a.total_score);
      setRows(list);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const podiumIcon = (i: number) => {
    if (i === 0) return <Trophy className="text-yellow-500" />;
    if (i === 1) return <Medal className="text-gray-400" />;
    if (i === 2) return <Award className="text-orange-500" />;
    return <span className="text-sm font-bold text-muted-foreground">#{i + 1}</span>;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-heading font-bold mb-2 text-center">🏆 Leaderboard</h1>
      <p className="text-center text-muted-foreground mb-8">Top performers across all exams</p>

      {rows.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No exam attempts yet. Be the first!</p>
      ) : (
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="text-left text-sm">
                <th className="px-4 py-3 w-16 text-center">Rank</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3 text-center">Attempts</th>
                <th className="px-4 py-3 text-center">Avg %</th>
                <th className="px-4 py-3 text-center">Best %</th>
                <th className="px-4 py-3 text-center">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.user_id}
                  className={`border-t ${r.user_id === user?.id ? "bg-primary/10 font-semibold" : ""}`}
                >
                  <td className="px-4 py-3 text-center">{podiumIcon(i)}</td>
                  <td className="px-4 py-3">{r.full_name}{r.user_id === user?.id && <span className="text-xs ml-2 text-primary">(You)</span>}</td>
                  <td className="px-4 py-3 text-center">{r.attempts}</td>
                  <td className="px-4 py-3 text-center">{r.avg_pct.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-center text-green-600">{r.best_pct.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-center font-bold">{r.total_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
