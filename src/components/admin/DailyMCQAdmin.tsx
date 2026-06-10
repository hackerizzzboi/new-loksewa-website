import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Trash2, Save, X, Calendar, Users, CheckCircle, XCircle } from "lucide-react";

interface Daily {
  id: string;
  for_date: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string | null;
  created_at: string;
}

const empty: Omit<Daily, "id" | "created_at"> = {
  for_date: new Date().toISOString().slice(0, 10),
  question: "",
  options: ["", "", "", ""],
  correct_index: 0,
  explanation: "",
};

const DailyMCQAdmin = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<Daily[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Record<string, { total: number; correct: number }>>({});

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("daily_mcqs").select("*").order("for_date", { ascending: false }).limit(60);
    if (error) toast.error(error.message);
    const list = ((data || []) as any[]).map((d) => ({ ...d, options: Array.isArray(d.options) ? d.options : [] }));
    setRows(list);

    if (list.length) {
      const ids = list.map(d => d.id);
      const { data: resp } = await supabase
        .from("daily_mcq_responses").select("daily_mcq_id, is_correct").in("daily_mcq_id", ids);
      const s: Record<string, { total: number; correct: number }> = {};
      (resp || []).forEach((r: any) => {
        const cur = s[r.daily_mcq_id] || { total: 0, correct: 0 };
        cur.total++;
        if (r.is_correct) cur.correct++;
        s[r.daily_mcq_id] = cur;
      });
      setStats(s);
    }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing || !user) return;
    if (!editing.question.trim() || editing.options.some((o: string) => !o.trim())) return toast.error("Question and all options required");
    const payload = {
      for_date: editing.for_date,
      question: editing.question,
      options: editing.options,
      correct_index: editing.correct_index,
      explanation: editing.explanation || null,
      created_by: user.id,
    };
    const { error } = editing.id
      ? await supabase.from("daily_mcqs").update(payload).eq("id", editing.id)
      : await supabase.from("daily_mcqs").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this daily MCQ?")) return;
    const { error } = await supabase.from("daily_mcqs").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const todayCount = rows.filter(r => r.for_date === new Date().toISOString().slice(0, 10)).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="font-bold text-lg flex items-center gap-2"><Calendar size={18} /> Daily MCQs</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Up to 5 questions per day · {todayCount}/5 posted for today</p>
        </div>
        <button
          onClick={() => setEditing({ ...empty })}
          disabled={todayCount >= 5}
          title={todayCount >= 5 ? "5 questions already posted for today" : ""}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} /> Post New Daily MCQ
        </button>
      </div>

      {loading ? <p className="text-center py-12">Loading…</p> : (
        <div className="space-y-2">
          {rows.length === 0 && <p className="text-center text-muted-foreground py-8">No daily MCQs yet. Post one to engage your users!</p>}
          {rows.map(d => {
            const s = stats[d.id] || { total: 0, correct: 0 };
            const today = d.for_date === new Date().toISOString().slice(0, 10);
            return (
              <div key={d.id} className={`bg-card rounded-xl p-4 shadow-sm border ${today ? "border-purple-400 ring-2 ring-purple-200" : ""}`}>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Calendar size={12} /> {d.for_date}
                      {today && <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-semibold">TODAY</span>}
                      <Users size={12} className="ml-2" /> {s.total} responded
                      <CheckCircle size={12} className="text-green-600 ml-2" /> {s.correct} correct
                    </div>
                    <p className="font-medium text-sm">{d.question}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditing(d)} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Edit</button>
                    <button onClick={() => remove(d.id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded"><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {d.options.map((o, i) => (
                    <div key={i} className={`px-2 py-1 rounded ${i === d.correct_index ? "bg-green-100 text-green-800 font-semibold" : "bg-muted"}`}>
                      {String.fromCharCode(65 + i)}. {o}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{editing.id ? "Edit Daily MCQ" : "Post Daily MCQ"}</h3>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">For Date</label>
                <input type="date" value={editing.for_date} onChange={e => setEditing({ ...editing, for_date: e.target.value })} className="w-full px-3 py-2 rounded-lg border bg-background text-sm" />
              </div>
              <textarea value={editing.question} onChange={e => setEditing({ ...editing, question: e.target.value })} placeholder="Question…" className="w-full px-3 py-2 rounded-lg border bg-background text-sm" rows={3} />
              {editing.options.map((opt: string, i: number) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="radio" checked={editing.correct_index === i} onChange={() => setEditing({ ...editing, correct_index: i })} />
                  <span className="font-bold w-6">{String.fromCharCode(65 + i)}.</span>
                  <input value={opt} onChange={e => { const opts = [...editing.options]; opts[i] = e.target.value; setEditing({ ...editing, options: opts }); }} className="flex-1 px-3 py-1.5 rounded-lg border bg-background text-sm" />
                </div>
              ))}
              <textarea value={editing.explanation || ""} onChange={e => setEditing({ ...editing, explanation: e.target.value })} placeholder="Explanation (optional)" className="w-full px-3 py-2 rounded-lg border bg-background text-sm" rows={2} />
              <button onClick={save} className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
                <Save size={16} /> Save Daily MCQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyMCQAdmin;
