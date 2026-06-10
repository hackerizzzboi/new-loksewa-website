import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle, XCircle, Sparkles, Users, Trophy, Crown } from "lucide-react";
import { toast } from "sonner";

interface Daily {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string | null;
  total_responses: number;
  correct_responses: number;
  my_selected: number | null;
  my_correct: boolean | null;
}

interface Responder {
  user_id: string;
  full_name: string;
  is_correct: boolean;
  selected_index: number;
}

interface BoardRow {
  user_id: string;
  full_name: string;
  correct_count: number;
  total_answered: number;
  first_correct_at: string | null;
}

const DailyMCQCard = () => {
  const { user } = useAuth();
  const [dailies, setDailies] = useState<Daily[]>([]);
  const [loading, setLoading] = useState(true);
  const [responders, setResponders] = useState<Record<string, Responder[]>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [board, setBoard] = useState<BoardRow[]>([]);

  const load = async () => {
    const { data } = await (supabase.rpc as any)("get_today_daily_mcqs");
    const list: Daily[] = (data as any[] || []).map(row => ({
      id: row.id,
      question: row.question,
      options: Array.isArray(row.options) ? row.options : [],
      correct_index: row.correct_index,
      explanation: row.explanation,
      total_responses: Number(row.total_responses) || 0,
      correct_responses: Number(row.correct_responses) || 0,
      my_selected: row.my_selected,
      my_correct: row.my_correct,
    }));
    setDailies(list);
    // Load responders for each answered MCQ
    const rmap: Record<string, Responder[]> = {};
    await Promise.all(list.filter(d => d.my_selected !== null).map(async d => {
      const { data: r } = await supabase.rpc("get_daily_mcq_responders", { _mcq_id: d.id });
      rmap[d.id] = (r as any[]) || [];
    }));
    setResponders(rmap);
    // Today's leaderboard
    const { data: b } = await (supabase.rpc as any)("get_daily_mcq_leaderboard");
    setBoard(((b as any[]) || []).map(r => ({
      user_id: r.user_id,
      full_name: r.full_name || "Anonymous",
      correct_count: Number(r.correct_count) || 0,
      total_answered: Number(r.total_answered) || 0,
      first_correct_at: r.first_correct_at,
    })));
    setLoading(false);
  };

  useEffect(() => { load(); }, [user?.id]);

  const submit = async (d: Daily, idx: number) => {
    if (!user || d.my_selected !== null) return;
    setSubmittingId(d.id);
    const correct = idx === d.correct_index;
    const { error } = await supabase.from("daily_mcq_responses").insert({
      daily_mcq_id: d.id,
      user_id: user.id,
      selected_index: idx,
      is_correct: correct,
    });
    setSubmittingId(null);
    if (error) return toast.error(error.message);
    toast.success(correct ? "Correct! 🎉" : "Better luck next time");
    await load();
  };

  if (loading) return null;
  if (dailies.length === 0) {
    return (
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-6 border border-amber-200/50">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🌅</div>
          <div>
            <h2 className="font-heading font-bold text-lg">Daily MCQ</h2>
            <p className="text-sm text-muted-foreground">Today's questions haven't been posted yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  const todayLabel = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const myBoardRow = board.find(b => b.user_id === user?.id);

  return (
    <div className="space-y-4">
      {dailies.map((daily, dIdx) => {
        const answered = daily.my_selected !== null;
        const pct = daily.total_responses > 0 ? Math.round((daily.correct_responses / daily.total_responses) * 100) : 0;
        const correctList = (responders[daily.id] || []).filter(r => r.is_correct);
        const isSubmitting = submittingId === daily.id;

        return (
          <section key={daily.id} className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-2xl p-6 border-2 border-purple-200/60 dark:border-purple-800/40 shadow-lg overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-300/30 dark:bg-purple-700/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-base">Q{dIdx + 1} · Daily MCQ — {todayLabel}</h2>
                    <p className="text-xs text-muted-foreground">Question {dIdx + 1} of {dailies.length} today</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-white/80 dark:bg-card/80 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold"><Users size={12} />{daily.total_responses}</span>
                  <span className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 px-2.5 py-1 rounded-full font-semibold">{pct}% correct</span>
                </div>
              </div>

              <p className="text-base font-semibold mb-4">{daily.question}</p>

              <div className="grid sm:grid-cols-2 gap-2 mb-3">
                {daily.options.map((opt, i) => {
                  const isCorrect = i === daily.correct_index;
                  const isMine = daily.my_selected === i;
                  let cls = "bg-white/70 dark:bg-card/70 hover:bg-white dark:hover:bg-card border-2 border-transparent hover:border-purple-300";
                  if (answered) {
                    if (isCorrect) cls = "bg-green-100 dark:bg-green-900/40 border-2 border-green-500 text-green-900 dark:text-green-200 font-semibold";
                    else if (isMine) cls = "bg-red-100 dark:bg-red-900/40 border-2 border-red-500 text-red-900 dark:text-red-200 line-through";
                    else cls = "bg-white/40 dark:bg-card/40 border-2 border-transparent";
                  }
                  return (
                    <button
                      key={i}
                      disabled={answered || isSubmitting || !user}
                      onClick={() => submit(daily, i)}
                      className={`text-left px-4 py-3 rounded-xl text-sm transition ${cls} ${!user ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                      {answered && isCorrect && <CheckCircle size={14} className="inline ml-2 text-green-600" />}
                      {answered && isMine && !isCorrect && <XCircle size={14} className="inline ml-2 text-red-600" />}
                    </button>
                  );
                })}
              </div>

              {!user && <p className="text-xs text-muted-foreground italic">Sign in to answer and see who got it right.</p>}

              {answered && (
                <div className="mt-4 space-y-3">
                  {daily.explanation && (
                    <div className="bg-white/80 dark:bg-card/80 rounded-xl p-3 text-sm">
                      <span className="font-semibold">💡 Explanation: </span>{daily.explanation}
                    </div>
                  )}
                  {correctList.length > 0 && (
                    <div className="bg-white/80 dark:bg-card/80 rounded-xl p-3">
                      <p className="font-semibold text-sm mb-2 flex items-center gap-1"><Trophy size={14} className="text-yellow-500" />Got it right ({correctList.length}):</p>
                      <div className="flex flex-wrap gap-1.5">
                        {correctList.slice(0, 30).map(r => (
                          <span key={r.user_id} className={`text-xs px-2.5 py-1 rounded-full ${r.user_id === user?.id ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold" : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"}`}>
                            {r.full_name}{r.user_id === user?.id ? " (You)" : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Today's Daily MCQ leaderboard */}
      {board.length > 0 && (
        <section className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/30 dark:via-yellow-950/30 dark:to-orange-950/30 rounded-2xl p-6 border border-amber-200/60 dark:border-amber-800/40">
          <h3 className="font-heading font-bold text-lg flex items-center gap-2 mb-3">
            <Trophy className="text-yellow-500" size={20} /> Today's Daily MCQ Leaderboard
          </h3>
          {myBoardRow && (
            <p className="text-sm text-muted-foreground mb-3">
              You: <strong>{myBoardRow.correct_count}</strong>/{dailies.length} correct ·
              rank <strong>#{board.findIndex(b => b.user_id === user?.id) + 1}</strong> of {board.length}
            </p>
          )}
          <div className="max-h-72 overflow-y-auto bg-white/70 dark:bg-card/70 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr className="text-left text-xs">
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">User</th>
                  <th className="px-3 py-2 text-center">Correct</th>
                  <th className="px-3 py-2 text-center">Answered</th>
                </tr>
              </thead>
              <tbody>
                {board.map((r, i) => (
                  <tr key={r.user_id} className={`border-t ${r.user_id === user?.id ? "bg-primary/10 font-semibold" : ""}`}>
                    <td className="px-3 py-1.5">{i === 0 ? <Crown size={14} className="text-yellow-500 inline" /> : i + 1}</td>
                    <td className="px-3 py-1.5">{r.full_name}{r.user_id === user?.id && <span className="text-xs ml-1 text-primary">(You)</span>}</td>
                    <td className="px-3 py-1.5 text-center text-green-700 dark:text-green-400 font-bold">{r.correct_count}</td>
                    <td className="px-3 py-1.5 text-center">{r.total_answered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default DailyMCQCard;
