import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Target, BookOpen, TrendingUp, Award, Crown, Medal } from "lucide-react";

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
  created_at: string;
}

interface LeaderRow {
  user_id: string;
  full_name: string;
  total_score: number;
  attempts: number;
}

const pct = (a: Attempt) => (a.total_questions ? (a.score / (a.total_questions * 2)) * 100 : 0);

const PersonalizedDashboard = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [board, setBoard] = useState<LeaderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: a }, { data: p }, { data: lb }] = await Promise.all([
        supabase
          .from("exam_attempts")
          .select("id,title,exam_type,category,score,total_questions,correct_count,wrong_count,skipped_count,created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
        supabase.rpc("get_leaderboard"),
      ]);
      setAttempts((a as Attempt[]) || []);
      setFullName(p?.full_name || user.email?.split("@")[0] || "Friend");
      setBoard(((lb || []) as any[]).map((r) => ({
        user_id: r.user_id,
        full_name: r.full_name || "Anonymous",
        total_score: Number(r.total_score) || 0,
        attempts: Number(r.attempts) || 0,
      })));
      setLoading(false);
    })();
  }, [user]);

  if (!user) return null;

  const total = attempts.length;
  const avg = total ? attempts.reduce((s, a) => s + pct(a), 0) / total : 0;
  const best = total ? Math.max(...attempts.map(pct)) : 0;
  const myRankIdx = board.findIndex((r) => r.user_id === user.id);
  const myRank = myRankIdx >= 0 ? myRankIdx + 1 : null;

  // category breakdown
  const groupMap: Record<string, { label: string; count: number; sum: number; href: string; color: string }> = {
    practice:        { label: "MCQ Practice",  count: 0, sum: 0, href: "/practice",    color: "from-rose-500 to-pink-500" },
    "old-is-gold":   { label: "Old Sets",      count: 0, sum: 0, href: "/old-is-gold", color: "from-emerald-500 to-teal-500" },
    "online-exam":   { label: "Online Exam",   count: 0, sum: 0, href: "/online-exam", color: "from-indigo-500 to-blue-500" },
  };
  attempts.forEach((a) => {
    const key = a.exam_type as keyof typeof groupMap;
    if (groupMap[key]) {
      groupMap[key].count += 1;
      groupMap[key].sum += pct(a);
    }
  });

  const greet = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const podiumIcon = (i: number) =>
    i === 0 ? <Crown size={16} className="text-yellow-500" /> :
    i === 1 ? <Medal size={16} className="text-gray-400" /> :
    i === 2 ? <Award size={16} className="text-orange-500" /> : null;

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/40 rounded-2xl p-5 md:p-6 shadow-md border border-purple-200/50">
      {/* Greeting */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold">
            {greet}, <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">{fullName}</span> 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Here's your snapshot — keep the streak alive!</p>
        </div>
        <Link to="/leaderboard" className="text-sm font-semibold bg-white dark:bg-card px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
          🏅 View full leaderboard
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <StatCard icon={BookOpen} label="Exams Taken" value={total.toString()} tint="text-blue-600" bg="bg-blue-100" />
            <StatCard icon={Target}   label="Average %"   value={`${avg.toFixed(1)}%`} tint="text-orange-600" bg="bg-orange-100" />
            <StatCard icon={Trophy}   label="Best %"      value={`${best.toFixed(1)}%`} tint="text-green-600" bg="bg-green-100" />
            <StatCard icon={TrendingUp} label="Your Rank" value={myRank ? `#${myRank}` : "—"} sub={myRank ? `of ${board.length}` : "Take an exam"} tint="text-purple-600" bg="bg-purple-100" />
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {/* Recent attempts */}
            <div className="lg:col-span-2 bg-white/80 dark:bg-card/80 rounded-xl p-4">
              <h3 className="font-heading font-bold text-base mb-3">🕘 Recent attempts</h3>
              {attempts.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground mb-3">No attempts yet — let's change that!</p>
                  <Link to="/online-exam" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold inline-block">
                    Start an Exam →
                  </Link>
                </div>
              ) : (
                <ul className="divide-y">
                  {attempts.slice(0, 5).map((a) => {
                    const p = pct(a);
                    return (
                      <li key={a.id} className="py-2 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{a.title || a.exam_type}</p>
                          <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${p >= 40 ? "text-green-600" : "text-red-600"}`}>{p.toFixed(0)}%</p>
                          <p className="text-xs text-muted-foreground">{a.score}/{a.total_questions * 2}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Top 3 leaderboard preview */}
            <div className="bg-white/80 dark:bg-card/80 rounded-xl p-4">
              <h3 className="font-heading font-bold text-base mb-3">🏅 Top 3</h3>
              {board.filter((b) => b.attempts > 0).length === 0 ? (
                <p className="text-sm text-muted-foreground">No-one has taken an exam yet.</p>
              ) : (
                <ul className="space-y-2">
                  {board.filter((b) => b.attempts > 0).slice(0, 3).map((b, i) => (
                    <li key={b.user_id} className={`flex items-center gap-2 p-2 rounded-lg ${b.user_id === user.id ? "bg-primary/10" : "bg-muted/40"}`}>
                      <div className="w-7 flex justify-center">{podiumIcon(i) || <span className="text-xs font-bold">#{i + 1}</span>}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">{b.full_name}{b.user_id === user.id && <span className="text-xs text-primary ml-1">(You)</span>}</p>
                        <p className="text-xs text-muted-foreground">{b.total_score} pts · {b.attempts} attempts</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Category progress */}
          <div className="mt-4 bg-white/80 dark:bg-card/80 rounded-xl p-4">
            <h3 className="font-heading font-bold text-base mb-3">📊 Category progress</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {Object.entries(groupMap).map(([key, g]) => {
                const avgPct = g.count ? g.sum / g.count : 0;
                return (
                  <Link key={key} to={g.href} className="block bg-muted/40 hover:bg-muted/60 transition-colors rounded-xl p-3">
                    <div className="flex justify-between items-baseline mb-2">
                      <p className="text-sm font-semibold">{g.label}</p>
                      <p className="text-xs text-muted-foreground">{g.count} taken</p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${g.color}`} style={{ width: `${Math.max(2, Math.min(100, avgPct))}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{g.count ? `${avgPct.toFixed(1)}% avg` : "Not started"}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

const StatCard = ({ icon: Icon, label, value, sub, tint, bg }: any) => (
  <div className="bg-white/80 dark:bg-card/80 rounded-xl p-3 flex items-center gap-3">
    <div className={`${bg} ${tint} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
      <Icon size={20} />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground truncate">{label}</p>
      <p className="text-lg font-bold leading-tight">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  </div>
);

export default PersonalizedDashboard;
