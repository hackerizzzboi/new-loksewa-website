import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Users, BookOpen, BarChart3, Trash2, Edit, Plus, Shield, ShieldOff, X, Save } from "lucide-react";
import { Link } from "react-router-dom";

type Tab = "users" | "mcqs" | "exams" | "stats";

interface ProfileRow { id: string; full_name: string | null; created_at: string; isAdmin?: boolean; attempts?: number; }
interface MCQ { id: string; question: string; options: string[]; correct_index: number; explanation: string | null; category: string | null; subject: string | null; is_published: boolean; }
interface ExamRow { id: string; title: string; description: string | null; category: string | null; time_limit_minutes: number | null; question_ids: string[]; is_published: boolean; }
interface AttemptRow { user_id: string; title: string | null; exam_type: string; score: number; total_questions: number; correct_count: number; wrong_count: number; skipped_count: number; answers: any; created_at: string; }

const emptyMCQ: MCQ = { id: "", question: "", options: ["", "", "", ""], correct_index: 0, explanation: "", category: "", subject: "", is_published: true };

const AdminPanel = () => {
  const [tab, setTab] = useState<Tab>("users");

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-xl font-bold">🛡️ Cloud Admin Panel</h1>
          <Link to="/" className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm">← Back to site</Link>
        </div>
      </header>

      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 flex gap-1 overflow-x-auto">
          {[
            { id: "users", label: "Users", icon: Users },
            { id: "mcqs", label: "MCQs", icon: BookOpen },
            { id: "exams", label: "Exams", icon: BookOpen },
            { id: "stats", label: "Stats", icon: BarChart3 },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                tab === t.id ? "text-primary border-primary" : "text-muted-foreground border-transparent"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {tab === "users" && <UsersTab />}
        {tab === "mcqs" && <MCQsTab />}
        {tab === "exams" && <ExamsTab />}
        {tab === "stats" && <StatsTab />}
      </main>
    </div>
  );
};

// ──────────────── USERS ────────────────
const UsersTab = () => {
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [{ data: profiles }, { data: roles }, { data: attempts }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, created_at").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role").eq("role", "admin"),
      supabase.from("exam_attempts").select("user_id"),
    ]);
    const adminSet = new Set((roles || []).map((r: any) => r.user_id));
    const countMap = new Map<string, number>();
    (attempts || []).forEach((a: any) => countMap.set(a.user_id, (countMap.get(a.user_id) || 0) + 1));
    setRows((profiles || []).map((p: any) => ({ ...p, isAdmin: adminSet.has(p.id), attempts: countMap.get(p.id) || 0 })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleAdmin = async (uid: string, makeAdmin: boolean) => {
    if (makeAdmin) {
      const { error } = await supabase.from("user_roles").insert({ user_id: uid, role: "admin" });
      if (error) return toast.error(error.message);
      toast.success("Granted admin");
    } else {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", uid).eq("role", "admin");
      if (error) return toast.error(error.message);
      toast.success("Revoked admin");
    }
    load();
  };

  if (loading) return <p className="text-center py-12">Loading users…</p>;

  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3 text-center">Attempts</th>
            <th className="px-4 py-3 text-center">Role</th>
            <th className="px-4 py-3">Joined</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u.id} className="border-t hover:bg-muted/30">
              <td className="px-4 py-2 font-medium">{u.full_name || "—"}</td>
              <td className="px-4 py-2 text-center">{u.attempts}</td>
              <td className="px-4 py-2 text-center">
                {u.isAdmin ? <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-semibold">admin</span> : <span className="text-muted-foreground text-xs">user</span>}
              </td>
              <td className="px-4 py-2 text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-right">
                {u.isAdmin ? (
                  <button onClick={() => toggleAdmin(u.id, false)} className="text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 hover:bg-red-100">
                    <ShieldOff size={12} /> Revoke
                  </button>
                ) : (
                  <button onClick={() => toggleAdmin(u.id, true)} className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 hover:bg-blue-100">
                    <Shield size={12} /> Make admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ──────────────── MCQs ────────────────
const MCQsTab = () => {
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [editing, setEditing] = useState<MCQ | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("custom_mcqs").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setMcqs((data || []).map((m: any) => ({ ...m, options: Array.isArray(m.options) ? m.options : [] })));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    if (!editing.question.trim() || editing.options.some(o => !o.trim())) return toast.error("Question and all options required");
    const payload = {
      question: editing.question,
      options: editing.options,
      correct_index: editing.correct_index,
      explanation: editing.explanation,
      category: editing.category,
      subject: editing.subject,
      is_published: editing.is_published,
    };
    const { error } = editing.id
      ? await supabase.from("custom_mcqs").update(payload).eq("id", editing.id)
      : await supabase.from("custom_mcqs").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this MCQ?")) return;
    const { error } = await supabase.from("custom_mcqs").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  const filtered = mcqs.filter(m => m.question.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap items-center">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border bg-background text-sm" />
        <button onClick={() => setEditing({ ...emptyMCQ })} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5">
          <Plus size={16} /> Add MCQ
        </button>
      </div>

      {loading ? <p className="text-center py-12">Loading…</p> : (
        <div className="space-y-2">
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No MCQs yet.</p>}
          {filtered.map((m) => (
            <div key={m.id} className="bg-card rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start gap-2 mb-2">
                <p className="font-medium text-sm flex-1">{m.question}</p>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(m)} className="p-1.5 hover:bg-muted rounded"><Edit size={14} /></button>
                  <button onClick={() => remove(m.id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {m.options.map((o, i) => (
                  <div key={i} className={`px-2 py-1 rounded ${i === m.correct_index ? "bg-green-100 text-green-800 font-semibold" : "bg-muted"}`}>
                    {String.fromCharCode(65 + i)}. {o}
                  </div>
                ))}
              </div>
              {(m.category || m.subject) && <p className="text-xs text-muted-foreground mt-2">{m.category} · {m.subject}</p>}
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{editing.id ? "Edit MCQ" : "Add MCQ"}</h3>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <textarea value={editing.question} onChange={e => setEditing({ ...editing, question: e.target.value })} placeholder="Question…" className="w-full px-3 py-2 rounded-lg border bg-background text-sm" rows={3} />
              {editing.options.map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="radio" checked={editing.correct_index === i} onChange={() => setEditing({ ...editing, correct_index: i })} />
                  <span className="font-bold w-6">{String.fromCharCode(65 + i)}.</span>
                  <input value={opt} onChange={e => { const opts = [...editing.options]; opts[i] = e.target.value; setEditing({ ...editing, options: opts }); }} className="flex-1 px-3 py-1.5 rounded-lg border bg-background text-sm" />
                </div>
              ))}
              <textarea value={editing.explanation || ""} onChange={e => setEditing({ ...editing, explanation: e.target.value })} placeholder="Explanation (optional)" className="w-full px-3 py-2 rounded-lg border bg-background text-sm" rows={2} />
              <div className="grid grid-cols-2 gap-2">
                <input value={editing.category || ""} onChange={e => setEditing({ ...editing, category: e.target.value })} placeholder="Category" className="px-3 py-2 rounded-lg border bg-background text-sm" />
                <input value={editing.subject || ""} onChange={e => setEditing({ ...editing, subject: e.target.value })} placeholder="Subject" className="px-3 py-2 rounded-lg border bg-background text-sm" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_published} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} />
                Published (visible to users)
              </label>
              <button onClick={save} className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ──────────────── EXAMS ────────────────
const ExamsTab = () => {
  const [exams, setExams] = useState<ExamRow[]>([]);
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [editing, setEditing] = useState<ExamRow | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [{ data: ex }, { data: m }] = await Promise.all([
      supabase.from("custom_exams").select("*").order("created_at", { ascending: false }),
      supabase.from("custom_mcqs").select("id, question, options, correct_index, explanation, category, subject, is_published"),
    ]);
    setExams((ex || []).map((e: any) => ({ ...e, question_ids: Array.isArray(e.question_ids) ? e.question_ids : [] })));
    setMcqs((m || []) as any);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    if (!editing.title.trim()) return toast.error("Title required");
    const payload = {
      title: editing.title,
      description: editing.description,
      category: editing.category,
      time_limit_minutes: editing.time_limit_minutes,
      question_ids: editing.question_ids,
      is_published: editing.is_published,
    };
    const { error } = editing.id
      ? await supabase.from("custom_exams").update(payload).eq("id", editing.id)
      : await supabase.from("custom_exams").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this exam?")) return;
    const { error } = await supabase.from("custom_exams").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="space-y-4">
      <button onClick={() => setEditing({ id: "", title: "", description: "", category: "", time_limit_minutes: 45, question_ids: [], is_published: false })} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5">
        <Plus size={16} /> Create Exam
      </button>

      {loading ? <p className="text-center py-12">Loading…</p> : (
        <div className="grid md:grid-cols-2 gap-3">
          {exams.length === 0 && <p className="text-center text-muted-foreground py-8 col-span-2">No exams yet.</p>}
          {exams.map((e) => (
            <div key={e.id} className="bg-card rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">{e.title}</h3>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(e)} className="p-1.5 hover:bg-muted rounded"><Edit size={14} /></button>
                  <button onClick={() => remove(e.id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded"><Trash2 size={14} /></button>
                </div>
              </div>
              {e.description && <p className="text-xs text-muted-foreground mb-2">{e.description}</p>}
              <div className="flex gap-2 text-xs">
                <span className="bg-muted px-2 py-0.5 rounded">{e.question_ids.length} questions</span>
                <span className="bg-muted px-2 py-0.5 rounded">{e.time_limit_minutes}m</span>
                {e.is_published ? <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded">Published</span> : <span className="bg-gray-200 px-2 py-0.5 rounded">Draft</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{editing.id ? "Edit Exam" : "Create Exam"}</h3>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="Exam title" className="w-full px-3 py-2 rounded-lg border bg-background text-sm" />
              <textarea value={editing.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Description" className="w-full px-3 py-2 rounded-lg border bg-background text-sm" rows={2} />
              <div className="grid grid-cols-2 gap-2">
                <input value={editing.category || ""} onChange={e => setEditing({ ...editing, category: e.target.value })} placeholder="Category" className="px-3 py-2 rounded-lg border bg-background text-sm" />
                <input type="number" value={editing.time_limit_minutes || 0} onChange={e => setEditing({ ...editing, time_limit_minutes: parseInt(e.target.value) })} placeholder="Time limit (min)" className="px-3 py-2 rounded-lg border bg-background text-sm" />
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Pick questions ({editing.question_ids.length} selected)</p>
                <div className="max-h-64 overflow-y-auto border rounded-lg p-2 space-y-1">
                  {mcqs.length === 0 && <p className="text-xs text-muted-foreground p-2">No MCQs available. Create some in the MCQs tab first.</p>}
                  {mcqs.map((m) => {
                    const checked = editing.question_ids.includes(m.id);
                    return (
                      <label key={m.id} className="flex items-start gap-2 text-xs p-1.5 hover:bg-muted rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => setEditing({ ...editing, question_ids: checked ? editing.question_ids.filter(i => i !== m.id) : [...editing.question_ids, m.id] })}
                        />
                        <span className="flex-1">{m.question}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_published} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} />
                Published
              </label>
              <button onClick={save} className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ──────────────── STATS ────────────────
const StatsTab = () => {
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("exam_attempts").select("*").order("created_at", { ascending: false }).limit(1000);
      if (error) toast.error(error.message);
      setAttempts((data || []) as any);
      setLoading(false);
    })();
  }, []);

  const overall = useMemo(() => {
    const total = attempts.length;
    const users = new Set(attempts.map(a => a.user_id)).size;
    const avg = total ? attempts.reduce((s, a) => s + (a.total_questions ? (a.score / (a.total_questions * 2)) * 100 : 0), 0) / total : 0;
    const passed = attempts.filter(a => a.total_questions && (a.score / (a.total_questions * 2)) * 100 >= 40).length;
    return { total, users, avg, passRate: total ? (passed / total) * 100 : 0 };
  }, [attempts]);

  // Per-question stats: aggregate correctness from answers JSON
  const perQuestion = useMemo(() => {
    const map = new Map<string, { qText: string; correct: number; wrong: number; skipped: number; }>();
    attempts.forEach(a => {
      const ans = a.answers || {};
      // answers is { [qId]: optIndex | null }; we don't know correct here.
      // Instead, group attempts by exam title and tally aggregate.
      Object.keys(ans).forEach(qid => {
        const cur = map.get(qid) || { qText: qid, correct: 0, wrong: 0, skipped: 0 };
        if (ans[qid] === null || ans[qid] === undefined) cur.skipped++;
        map.set(qid, cur);
      });
    });
    return Array.from(map.entries()).slice(0, 50);
  }, [attempts]);

  const byExam = useMemo(() => {
    const map = new Map<string, { title: string; n: number; avg: number; }>();
    attempts.forEach(a => {
      const key = a.title || a.exam_type;
      const pct = a.total_questions ? (a.score / (a.total_questions * 2)) * 100 : 0;
      const cur = map.get(key) || { title: key, n: 0, avg: 0 };
      cur.avg = (cur.avg * cur.n + pct) / (cur.n + 1);
      cur.n++;
      map.set(key, cur);
    });
    return Array.from(map.values()).sort((a, b) => b.n - a.n);
  }, [attempts]);

  if (loading) return <p className="text-center py-12">Loading stats…</p>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Attempts" value={overall.total} />
        <StatCard label="Unique Users" value={overall.users} />
        <StatCard label="Avg Score" value={`${overall.avg.toFixed(1)}%`} />
        <StatCard label="Pass Rate" value={`${overall.passRate.toFixed(1)}%`} />
      </div>

      <div className="bg-card rounded-2xl shadow-sm p-5">
        <h3 className="font-bold mb-3">📚 By Exam</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground border-b">
              <tr><th className="py-2">Exam</th><th className="py-2 text-center">Attempts</th><th className="py-2 text-center">Avg %</th></tr>
            </thead>
            <tbody>
              {byExam.map((r) => (
                <tr key={r.title} className="border-b">
                  <td className="py-2">{r.title}</td>
                  <td className="py-2 text-center">{r.n}</td>
                  <td className={`py-2 text-center font-bold ${r.avg >= 40 ? "text-green-600" : "text-red-600"}`}>{r.avg.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm p-5">
        <h3 className="font-bold mb-3">❓ Per-Question Skip Rate (top 50)</h3>
        <p className="text-xs text-muted-foreground mb-3">Number of times each question was left unanswered across all attempts.</p>
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground border-b sticky top-0 bg-card">
              <tr><th className="py-2">Question ID</th><th className="py-2 text-center">Skipped</th></tr>
            </thead>
            <tbody>
              {perQuestion.map(([qid, s]) => (
                <tr key={qid} className="border-b">
                  <td className="py-2 font-mono text-xs">{qid}</td>
                  <td className="py-2 text-center">{s.skipped}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: any }) => (
  <div className="bg-card rounded-xl shadow-sm p-4">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

export default AdminPanel;
