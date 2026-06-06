import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface RankRow {
  user_id: string;
  full_name: string;
  best_score: number;
  best_pct: number;
  attempts: number;
}

interface Props {
  setId: string;
  currentScore: number;
}

const SetRanking = ({ setId, currentScore }: Props) => {
  const { user } = useAuth();
  const [rows, setRows] = useState<RankRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!setId) { setLoading(false); return; }
    (async () => {
      const { data } = await supabase.rpc("get_set_ranking", { _set_id: setId });
      const list = ((data || []) as any[]).map((r) => ({
        user_id: r.user_id,
        full_name: r.full_name || "Anonymous",
        best_score: Number(r.best_score),
        best_pct: Number(r.best_pct) || 0,
        attempts: Number(r.attempts),
      }));
      setRows(list);
      setLoading(false);
    })();
  }, [setId]);

  if (loading) return null;
  if (rows.length === 0) return null;

  const sorted = [...rows].sort((a, b) => b.best_score - a.best_score);
  const myRank = sorted.findIndex((r) => r.user_id === user?.id) + 1;
  // users this attempt surpassed (those with strictly lower best_score, excluding self)
  const surpassed = sorted.filter((r) => r.user_id !== user?.id && currentScore > r.best_score);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-2xl p-6 my-6 border border-purple-200/50">
      <h2 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
        🏅 How you compare on this set
      </h2>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white/70 dark:bg-card/70 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Your Rank</p>
          <p className="text-2xl font-bold text-purple-700">
            {myRank > 0 ? `#${myRank}` : "—"}
          </p>
          <p className="text-xs">of {sorted.length}</p>
        </div>
        <div className="bg-white/70 dark:bg-card/70 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">You Beat</p>
          <p className="text-2xl font-bold text-green-600">{surpassed.length}</p>
          <p className="text-xs">user{surpassed.length === 1 ? "" : "s"}</p>
        </div>
        <div className="bg-white/70 dark:bg-card/70 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Top Score</p>
          <p className="text-2xl font-bold text-yellow-600">{sorted[0]?.best_score ?? 0}</p>
          <p className="text-xs truncate">by {sorted[0]?.full_name}</p>
        </div>
      </div>

      {surpassed.length > 0 && (
        <div className="mb-4 bg-green-50 dark:bg-green-950/30 border border-green-200 rounded-xl p-3">
          <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">
            🎉 You surpassed:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {surpassed.slice(0, 12).map((r) => (
              <span key={r.user_id} className="bg-white dark:bg-card text-xs px-2 py-1 rounded-full border">
                {r.full_name} ({r.best_score})
              </span>
            ))}
            {surpassed.length > 12 && <span className="text-xs text-muted-foreground self-center">+{surpassed.length - 12} more</span>}
          </div>
        </div>
      )}

      <details className="bg-white/50 dark:bg-card/50 rounded-xl overflow-hidden">
        <summary className="px-4 py-2.5 cursor-pointer text-sm font-semibold">
          📊 Full ranking ({sorted.length} users)
        </summary>
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">User</th>
                <th className="px-3 py-2 text-center">Best Score</th>
                <th className="px-3 py-2 text-center">%</th>
                <th className="px-3 py-2 text-center">Tries</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, i) => (
                <tr key={r.user_id} className={`border-t ${r.user_id === user?.id ? "bg-primary/10 font-semibold" : ""}`}>
                  <td className="px-3 py-1.5">{i + 1}</td>
                  <td className="px-3 py-1.5">{r.full_name}{r.user_id === user?.id && <span className="text-xs ml-1 text-primary">(You)</span>}</td>
                  <td className="px-3 py-1.5 text-center">{r.best_score}</td>
                  <td className="px-3 py-1.5 text-center">{r.best_pct.toFixed(1)}%</td>
                  <td className="px-3 py-1.5 text-center">{r.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
};

export default SetRanking;
