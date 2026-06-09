import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle, XCircle, Sparkles, Users, Trophy } from "lucide-react";
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

const DailyMCQCard = () => {
  const { user } = useAuth();
  const [daily, setDaily] = useState<Daily | null>(null);
  const [loading, setLoading] = useState(true);
  const [responders, setResponders] = useState<Responder[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const { data } = await supabase.rpc("get_today_daily_mcq");
    const row = (data as any[])?.[0];
    if (row) {
      const d: Daily = {
        id: row.id,
        question: row.question,
        options: Array.isArray(row.options) ? row.options : [],
        correct_index: row.correct_index,
        explanation: row.explanation,
        total_responses: Number(row.total_responses) || 0,
        correct_responses: Number(row.correct_responses) || 0,
        my_selected: row.my_selected,
        my_correct: row.my_correct,
      };
      setDaily(d);
      if (d.my_selected !== null) loadResponders(d.id);
    }
    setLoading(false);
  };

  const loadResponders = async (id: string) => {
    const { data } = await supabase.rpc("get_daily_mcq_responders", { _mcq_id: id });
    setResponders((data as any[]) || []);
  };

  useEffect(() => { load(); }, [user?.id]);

  const submit = async (idx: number) => {
    if (!user || !daily || daily.my_selected !== null) return;
    setSubmitting(true);
    const correct = idx === daily.correct_index;
    const { error } = await supabase.from("daily_mcq_responses").insert({
      daily_mcq_id: daily.id,
      user_id: user.id,
      selected_index: idx,
      is_correct: correct,
    });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success(correct ? "Correct! 🎉" : "Better luck next time");
    await load();
  };

  if (loading) return null;
  if (!daily) {
    return (
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-6 border border-amber-200/50">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🌅</div>
          <div>
            <h2 className="font-heading font-bold text-lg">Daily MCQ</h2>
            <p className="text-sm text-muted-foreground">Today's question hasn't been posted yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  const answered = daily.my_selected !== null;
  const pct = daily.total_responses > 0 ? Math.round((daily.correct_responses / daily.total_responses) * 100) : 0;
  const correctList = responders.filter(r => r.is_correct);

  return (
    <section className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-2xl p-6 border-2 border-purple-200/60 shadow-lg overflow-hidden">
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg">📅 Daily MCQ — {new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})}</h2>
              <p className="text-xs text-muted-foreground">Answer the question of the day & rise in the daily ranks!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-white/80 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold"><Users size={12} />{daily.total_responses} answered</span>
            <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-semibold">{pct}% correct</span>
          </div>
        </div>

        <p className="text-base font-semibold mb-4">{daily.question}</p>

        <div className="grid sm:grid-cols-2 gap-2 mb-3">
          {daily.options.map((opt, i) => {
            const isCorrect = i === daily.correct_index;
            const isMine = daily.my_selected === i;
            let cls = "bg-white/70 hover:bg-white border-2 border-transparent hover:border-purple-300";
            if (answered) {
              if (isCorrect) cls = "bg-green-100 border-2 border-green-500 text-green-900 font-semibold";
              else if (isMine) cls = "bg-red-100 border-2 border-red-500 text-red-900 line-through";
              else cls = "bg-white/40 border-2 border-transparent";
            }
            return (
              <button
                key={i}
                disabled={answered || submitting || !user}
                onClick={() => submit(i)}
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
              <div className="bg-white/80 rounded-xl p-3 text-sm">
                <span className="font-semibold">💡 Explanation: </span>{daily.explanation}
              </div>
            )}
            {correctList.length > 0 && (
              <div className="bg-white/80 rounded-xl p-3">
                <p className="font-semibold text-sm mb-2 flex items-center gap-1"><Trophy size={14} className="text-yellow-500" />Got it right today ({correctList.length}):</p>
                <div className="flex flex-wrap gap-1.5">
                  {correctList.slice(0, 30).map(r => (
                    <span key={r.user_id} className={`text-xs px-2.5 py-1 rounded-full ${r.user_id === user?.id ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold" : "bg-green-100 text-green-800"}`}>
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
};

export default DailyMCQCard;
