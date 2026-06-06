import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Trophy, Target, TrendingUp, Crown } from "lucide-react";

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
  const myRow = sorted.find((r) => r.user_id === user?.id);
  const myRank = sorted.findIndex((r) => r.user_id === user?.id) + 1;
  const total = sorted.length;

  // best score we'll display as "you" — max of stored best and current attempt
  const myDisplayScore = Math.max(currentScore, myRow?.best_score ?? 0);
  const isNewBest = currentScore > (myRow?.best_score ?? -1);

  const surpassed = sorted.filter((r) => r.user_id !== user?.id && myDisplayScore > r.best_score);
  const aheadOfMe = sorted.filter((r) => r.user_id !== user?.id && r.best_score > myDisplayScore);
  const nextTargets = aheadOfMe.slice(-3).reverse(); // closest 3 above
  const topScore = sorted[0]?.best_score ?? 0;
  const pointsFromTop = Math.max(0, topScore - myDisplayScore);
  const percentile = total > 1 ? Math.round((surpassed.length / (total - 1)) * 100) : 100;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-2xl p-6 my-6 border border-purple-200/50">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-lg font-heading font-bold flex items-center gap-2">
          <Trophy className="text-yellow-500" size={20} /> How you compare on this set
        </h2>
        {isNewBest && (
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            🎯 New Personal Best!
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="bg-white/70 dark:bg-card/70 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Your Rank</p>
          <p className="text-2xl font-bold text-purple-700">{myRank > 0 ? `#${myRank}` : "—"}</p>
          <p className="text-xs">of {total}</p>
        </div>
        <div className="bg-white/70 dark:bg-card/70 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Percentile</p>
          <p className="text-2xl font-bold text-indigo-700">{percentile}%</p>
          <p className="text-xs">top {Math.max(1, 100 - percentile)}%</p>
        </div>
        <div className="bg-white/70 dark:bg-card/70 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">You Beat</p>
          <p className="text-2xl font-bold text-green-600">{surpassed.length}</p>
          <p className="text-xs">user{surpassed.length === 1 ? "" : "s"}</p>
        </div>
        <div className="bg-white/70 dark:bg-card/70 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">From Top</p>
          <p className="text-2xl font-bold text-yellow-600">{pointsFromTop > 0 ? `−${pointsFromTop}` : "👑"}</p>
          <p className="text-xs truncate">{pointsFromTop > 0 ? "points" : "you're #1"}</p>
        </div>
      </div>

      {nextTargets.length > 0 && (
        <div className="mb-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 rounded-xl p-3">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-1.5">
            <Target size={14} /> Next to overtake:
          </p>
          <div className="space-y-1.5">
            {nextTargets.map((r) => {
              const diff = r.best_score - myDisplayScore;
              return (
                <div key={r.user_id} className="flex items-center justify-between bg-white dark:bg-card px-3 py-1.5 rounded-lg text-sm">
                  <span className="font-medium truncate">{r.full_name}</span>
                  <span className="text-xs text-blue-700 font-semibold whitespace-nowrap ml-2">
                    +{diff} pt{diff === 1 ? "" : "s"} away
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {surpassed.length > 0 && (
        <div className="mb-4 bg-green-50 dark:bg-green-950/30 border border-green-200 rounded-xl p-3">
          <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-1.5">
            <TrendingUp size={14} /> You surpassed {surpassed.length} user{surpassed.length === 1 ? "" : "s"}:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {surpassed.slice(0, 15).map((r) => (
              <span key={r.user_id} className="bg-white dark:bg-card text-xs px-2 py-1 rounded-full border">
                {r.full_name} <span className="text-muted-foreground">({r.best_score})</span>
              </span>
            ))}
            {surpassed.length > 15 && <span className="text-xs text-muted-foreground self-center">+{surpassed.length - 15} more</span>}
          </div>
        </div>
      )}

      <details className="bg-white/50 dark:bg-card/50 rounded-xl overflow-hidden">
        <summary className="px-4 py-2.5 cursor-pointer text-sm font-semibold">
          📊 Full ranking ({total} users)
        </summary>
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs sticky top-0">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">User</th>
                <th className="px-3 py-2 text-center">Best</th>
                <th className="px-3 py-2 text-center">%</th>
                <th className="px-3 py-2 text-center">Tries</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, i) => (
                <tr key={r.user_id} className={`border-t ${r.user_id === user?.id ? "bg-primary/10 font-semibold" : ""}`}>
                  <td className="px-3 py-1.5">
                    {i === 0 ? <Crown size={14} className="text-yellow-500 inline" /> : i + 1}
                  </td>
                  <td className="px-3 py-1.5">
                    {r.full_name}
                    {r.user_id === user?.id && <span className="text-xs ml-1 text-primary">(You)</span>}
                  </td>
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
