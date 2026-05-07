import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, FileText, BarChart3, Settings, Plus, Edit, Trash2,
  Save, X, Download, Upload, Trophy, TrendingUp, RefreshCw,
  Lock, Search, Home, LogOut, ChevronDown, Eye, Calendar, MessageCircle
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { practiceQuestions, practiceSubjects, oldIsGoldSets, weeklyTests } from '@/data/questions';
import type { Question } from '@/data/questions';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

// ── Types ──
interface AdminQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  year?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface QuizResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  correct: number;
  wrong: number;
  subject: string;
  type: string;
}

// ── Helper: load questions from data + localStorage overrides ──
function loadAllQuestions(): AdminQuestion[] {
  const stored = localStorage.getItem('loksewa_questions');
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }

  // Build from practiceQuestions data
  const qs: AdminQuestion[] = [];
  for (const [subjectId, questions] of Object.entries(practiceQuestions)) {
    const subject = practiceSubjects.find(s => s.id === subjectId);
    const subjectName = subject?.title || subjectId;
    for (const q of questions) {
      qs.push({
        id: q.id,
        subject: subjectName,
        question: q.question,
        options: [...q.options],
        correctAnswer: q.correct,
        explanation: q.explanation || '',
        difficulty: 'medium',
      });
    }
  }
  return qs;
}

// ── Main Admin Component ──
const Admin = () => {
  const navigate = useNavigate();
  const { logout, changePassword } = useAdminAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<AdminQuestion | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<AdminQuestion>>({ options: ['', '', '', ''], correctAnswer: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Question of the Day state
  const [dailyQuestionText, setDailyQuestionText] = useState('');
  const [currentDailyQuestion, setCurrentDailyQuestion] = useState<any>(null);
  const [dailyAnswers, setDailyAnswers] = useState<any[]>([]);

  // Exam settings
  const [examSettings, setExamSettings] = useState({
    questionsPerTest: parseInt(localStorage.getItem('exam_questions_count') || '50'),
    timeLimit: parseInt(localStorage.getItem('exam_time_limit') || '60'),
    negativeMarking: parseFloat(localStorage.getItem('negative_marking') || '0.4'),
    passingPercentage: parseInt(localStorage.getItem('passing_percentage') || '40'),
    oldIsGoldCount: parseInt(localStorage.getItem('old_is_gold_count') || '50'),
  });

  useEffect(() => { loadData(); loadDailyQuestion(); }, []);

  const loadDailyQuestion = () => {
    const stored = localStorage.getItem('daily_question');
    if (stored) {
      try { setCurrentDailyQuestion(JSON.parse(stored)); } catch {}
    }
    const storedAnswers = localStorage.getItem('daily_question_answers');
    if (storedAnswers) {
      try { setDailyAnswers(JSON.parse(storedAnswers)); } catch {}
    }
  };

  const postDailyQuestion = () => {
    if (!dailyQuestionText.trim()) return;
    const q = {
      id: `dq-${Date.now()}`,
      question: dailyQuestionText.trim(),
      postedAt: new Date().toISOString(),
      postedBy: 'Admin',
    };
    localStorage.setItem('daily_question', JSON.stringify(q));
    localStorage.removeItem('daily_question_answers');
    localStorage.removeItem('daily_question_submitted');
    setCurrentDailyQuestion(q);
    setDailyAnswers([]);
    setDailyQuestionText('');
    toast({ title: "✅ Posted!", description: "Question of the Day is now live on homepage" });
  };

  const removeDailyQuestion = () => {
    localStorage.removeItem('daily_question');
    localStorage.removeItem('daily_question_answers');
    localStorage.removeItem('daily_question_submitted');
    setCurrentDailyQuestion(null);
    setDailyAnswers([]);
    toast({ title: "🗑️ Removed", description: "Question of the Day removed from homepage" });
  };

  const loadData = () => {
    const qs = loadAllQuestions();
    setQuestions(qs);

    const history = localStorage.getItem('quiz_history');
    if (history) {
      try { setQuizHistory(JSON.parse(history)); } catch {}
    }
  };

  const saveQuestions = (updated: AdminQuestion[]) => {
    localStorage.setItem('loksewa_questions', JSON.stringify(updated));
    setQuestions(updated);
  };

  // ── CRUD ──
  const addQuestion = () => {
    if (!newQuestion.question?.trim() || !newQuestion.subject) {
      toast({ title: "Error", description: "Question and subject are required", variant: "destructive" });
      return;
    }
    if (newQuestion.options?.some(o => !o.trim())) {
      toast({ title: "Error", description: "All 4 options are required", variant: "destructive" });
      return;
    }
    const q: AdminQuestion = {
      id: `admin-${Date.now()}`,
      subject: newQuestion.subject || '',
      question: newQuestion.question || '',
      options: newQuestion.options || ['', '', '', ''],
      correctAnswer: newQuestion.correctAnswer || 0,
      explanation: newQuestion.explanation || '',
      year: newQuestion.year,
      difficulty: newQuestion.difficulty || 'medium',
    };
    saveQuestions([...questions, q]);
    setShowAddModal(false);
    setNewQuestion({ options: ['', '', '', ''], correctAnswer: 0 });
    toast({ title: "✅ Question Added", description: `Added to ${q.subject}` });
  };

  const updateQuestion = () => {
    if (!editingQuestion) return;
    saveQuestions(questions.map(q => q.id === editingQuestion.id ? editingQuestion : q));
    setEditingQuestion(null);
    toast({ title: "✅ Updated", description: "Question saved" });
  };

  const deleteQuestion = (id: string) => {
    saveQuestions(questions.filter(q => q.id !== id));
    setShowDeleteConfirm(null);
    toast({ title: "🗑️ Deleted", description: "Question removed" });
  };

  // ── Import/Export ──
  const exportData = () => {
    const data = { questions, quizHistory, examSettings, exportDate: new Date().toISOString(), version: '2.0' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `loksewa_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast({ title: "💾 Exported", description: "Backup file downloaded" });
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.questions?.length) {
          saveQuestions(data.questions);
          toast({ title: "✅ Imported", description: `${data.questions.length} questions loaded` });
        }
        if (data.quizHistory) {
          localStorage.setItem('quiz_history', JSON.stringify(data.quizHistory));
          setQuizHistory(data.quizHistory);
        }
      } catch {
        toast({ title: "❌ Error", description: "Invalid file format", variant: "destructive" });
      }
    };
    reader.readAsText(file);
  };

  const resetAllData = () => {
    if (!confirm('⚠️ This will delete ALL custom questions and quiz history. Continue?')) return;
    localStorage.removeItem('loksewa_questions');
    localStorage.removeItem('quiz_history');
    loadData();
    toast({ title: "🔄 Reset", description: "Data reset to defaults" });
  };

  const saveExamSettings = () => {
    localStorage.setItem('exam_questions_count', examSettings.questionsPerTest.toString());
    localStorage.setItem('exam_time_limit', examSettings.timeLimit.toString());
    localStorage.setItem('negative_marking', examSettings.negativeMarking.toString());
    localStorage.setItem('passing_percentage', examSettings.passingPercentage.toString());
    localStorage.setItem('old_is_gold_count', examSettings.oldIsGoldCount.toString());
    toast({ title: "✅ Settings Saved" });
  };

  const handleChangePassword = async () => {
    if (newPasswordInput.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    const ok = await changePassword(newPasswordInput);
    if (ok) {
      setNewPasswordInput('');
      toast({ title: "✅ Password Changed", description: "New password set successfully" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // ── Derived data ──
  const subjects = useMemo(() => ['all', ...new Set(questions.map(q => q.subject))], [questions]);

  const filteredQuestions = useMemo(() =>
    questions.filter(q => {
      const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSubject = selectedSubject === 'all' || q.subject === selectedSubject;
      return matchSearch && matchSubject;
    }),
  [questions, searchTerm, selectedSubject]);

  const stats = useMemo(() => {
    const total = quizHistory.length;
    const avg = total ? quizHistory.reduce((a, h) => a + h.score, 0) / total : 0;
    const passRate = total ? (quizHistory.filter(h => h.score >= 40).length / total) * 100 : 0;
    return { totalQuestions: questions.length, totalQuizzes: total, avgScore: avg, passRate };
  }, [questions, quizHistory]);

  const subjectStats = useMemo(() => {
    const map: Record<string, number> = {};
    questions.forEach(q => { map[q.subject] = (map[q.subject] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [questions]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'daily-question', label: 'Daily Question', icon: MessageCircle },
    { id: 'questions', label: 'Question Bank', icon: BookOpen },
    { id: 'exams', label: 'Exam Config', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const allSubjectOptions = [
    "General Awareness", "Public Management", "Computer Fundamentals",
    "Operating System", "Word Processor", "Electronic Spreadsheet",
    "Database Management System", "Presentation System", "Web Designing & Social Media",
    "Computer Network", "Cyber Security", "Hardware Maintenance", "Related Legislations",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Lock size={20} className="text-yellow-400" />
              लोकसेवा Pro Admin
              <span className="text-[10px] bg-yellow-500/30 px-2 py-0.5 rounded ml-1">v2.0</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={exportData} className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm transition">
              <Download size={14} /> Backup
            </button>
            <label className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm transition cursor-pointer">
              <Upload size={14} /> Import
              <input type="file" accept=".json" onChange={importData} className="hidden" />
            </label>
            <button onClick={() => navigate('/')} className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm transition">
              <Home size={14} /> Site
            </button>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm transition">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab Nav */}
      <div className="bg-white shadow-sm sticky top-[52px] z-20 border-b">
        <div className="max-w-7xl mx-auto px-4 flex gap-0.5 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-600 bg-blue-50/50'
                  : 'text-gray-500 border-transparent hover:text-blue-600'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
              {tab.id === 'questions' && <span className="ml-1 text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full">{filteredQuestions.length}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* ══════ DASHBOARD ══════ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Questions', value: stats.totalQuestions, icon: BookOpen, color: 'blue', border: 'border-blue-500' },
                { label: 'Quizzes Taken', value: stats.totalQuizzes, icon: FileText, color: 'green', border: 'border-green-500' },
                { label: 'Avg Score', value: `${stats.avgScore.toFixed(1)}%`, icon: BarChart3, color: 'orange', border: 'border-orange-500' },
                { label: 'Pass Rate', value: `${stats.passRate.toFixed(1)}%`, icon: Trophy, color: 'purple', border: 'border-purple-500' },
              ].map((s, i) => (
                <div key={i} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${s.border} hover:shadow-md transition`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs">{s.label}</p>
                      <p className="text-2xl font-bold mt-1">{s.value}</p>
                    </div>
                    <s.icon size={32} className={`text-${s.color}-500 opacity-60`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Calendar size={18} /> Recent Quizzes</h3>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {quizHistory.length === 0 && <p className="text-gray-400 text-center py-8">No quiz attempts yet</p>}
                  {quizHistory.slice(0, 10).map((q, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg text-sm">
                      <div>
                        <p className="font-medium">{q.subject || q.type || 'Quiz'}</p>
                        <p className="text-xs text-gray-400">{new Date(q.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`font-bold ${q.score >= 40 ? 'text-green-600' : 'text-red-600'}`}>{q.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subject Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold mb-3">Subject Distribution</h3>
                <div className="space-y-2">
                  {subjectStats.map(([subject, count]) => (
                    <div key={subject} className="flex items-center gap-3">
                      <span className="text-sm flex-1 truncate">{subject}</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(count / stats.totalQuestions) * 100}%` }} />
                      </div>
                      <span className="text-xs font-medium text-gray-500 w-8 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button onClick={() => { setActiveTab('questions'); setShowAddModal(true); }} className="p-3 bg-blue-50 rounded-xl hover:bg-blue-100 text-sm font-medium text-blue-700 transition">➕ Add Question</button>
                <button onClick={exportData} className="p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 text-sm font-medium text-emerald-700 transition">💾 Export Data</button>
                <label className="p-3 bg-green-50 rounded-xl hover:bg-green-100 text-sm font-medium text-green-700 transition cursor-pointer text-center">
                  📥 Import Questions
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
                <button onClick={resetAllData} className="p-3 bg-red-50 rounded-xl hover:bg-red-100 text-sm font-medium text-red-700 transition">🔄 Reset Data</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════ QUESTION BANK ══════ */}
        {activeTab === 'questions' && (
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <h2 className="text-xl font-bold">📚 Question Bank</h2>
              <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 text-sm transition">
                <Plus size={16} /> Add Question
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-3 flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search questions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {subjects.map(s => <option key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</option>)}
              </select>
              <button onClick={() => { setSearchTerm(''); setSelectedSubject('all'); }} className="text-gray-400 hover:text-gray-600 p-2"><RefreshCw size={16} /></button>
            </div>

            {/* Question List */}
            <div className="space-y-3">
              {filteredQuestions.map((q, idx) => (
                <div key={q.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition">
                  {editingQuestion?.id === q.id ? (
                    /* Inline Edit Mode */
                    <div className="space-y-3">
                      <select value={editingQuestion.subject} onChange={e => setEditingQuestion({...editingQuestion, subject: e.target.value})}
                        className="w-full border rounded-lg p-2 text-sm">
                        {allSubjectOptions.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <textarea value={editingQuestion.question} onChange={e => setEditingQuestion({...editingQuestion, question: e.target.value})}
                        className="w-full border rounded-lg p-2 text-sm" rows={2} />
                      {editingQuestion.options.map((opt, oi) => (
                        <div key={oi} className="flex items-center gap-2">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${oi === editingQuestion.correctAnswer ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <input type="text" value={opt} onChange={e => {
                            const opts = [...editingQuestion.options]; opts[oi] = e.target.value;
                            setEditingQuestion({...editingQuestion, options: opts});
                          }} className="flex-1 border rounded-lg p-2 text-sm" />
                        </div>
                      ))}
                      <div className="flex gap-3 items-center flex-wrap">
                        <select value={editingQuestion.correctAnswer} onChange={e => setEditingQuestion({...editingQuestion, correctAnswer: parseInt(e.target.value)})}
                          className="border rounded-lg p-2 text-sm">
                          {[0,1,2,3].map(i => <option key={i} value={i}>Correct: Option {String.fromCharCode(65+i)}</option>)}
                        </select>
                        <select value={editingQuestion.difficulty || 'medium'} onChange={e => setEditingQuestion({...editingQuestion, difficulty: e.target.value as any})}
                          className="border rounded-lg p-2 text-sm">
                          <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
                        </select>
                      </div>
                      <textarea value={editingQuestion.explanation} onChange={e => setEditingQuestion({...editingQuestion, explanation: e.target.value})}
                        placeholder="Explanation..." className="w-full border rounded-lg p-2 text-sm" rows={2} />
                      <div className="flex gap-2">
                        <button onClick={updateQuestion} className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-700 flex items-center gap-1"><Save size={14}/>Save</button>
                        <button onClick={() => setEditingQuestion(null)} className="bg-gray-200 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-300">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div>
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                            <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">#{idx+1}</span>
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{q.subject}</span>
                            {q.difficulty && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded ${q.difficulty==='easy'?'bg-green-100 text-green-700':q.difficulty==='hard'?'bg-red-100 text-red-700':'bg-yellow-100 text-yellow-700'}`}>{q.difficulty}</span>
                            )}
                            {q.year && <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">{q.year}</span>}
                          </div>
                          <p className="font-medium text-sm text-gray-800 mb-2">{q.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {q.options.map((opt, oi) => (
                              <p key={oi} className={`text-xs flex items-center gap-1.5 p-1.5 rounded ${oi===q.correctAnswer?'bg-green-50 text-green-700 font-medium':'text-gray-500'}`}>
                                <span className="font-bold">{String.fromCharCode(65+oi)}.</span> {opt}
                                {oi===q.correctAnswer && <span className="text-green-500">✓</span>}
                              </p>
                            ))}
                          </div>
                          {q.explanation && <p className="mt-2 text-xs text-gray-500 bg-blue-50 p-2 rounded">💡 {q.explanation}</p>}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button onClick={() => setEditingQuestion(q)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={15}/></button>
                          <button onClick={() => setShowDeleteConfirm(q.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15}/></button>
                        </div>
                      </div>
                      {showDeleteConfirm === q.id && (
                        <div className="mt-2 p-2 bg-red-50 rounded-lg flex items-center justify-between">
                          <span className="text-xs text-red-700">Delete this question?</span>
                          <div className="flex gap-2">
                            <button onClick={() => deleteQuestion(q.id)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            <button onClick={() => setShowDeleteConfirm(null)} className="bg-gray-200 px-3 py-1 rounded text-xs">Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {filteredQuestions.length === 0 && (
                <div className="bg-white rounded-lg p-12 text-center text-gray-400">
                  <BookOpen size={40} className="mx-auto mb-3 opacity-50" />
                  <p>No questions found</p>
                  <button onClick={() => setShowAddModal(true)} className="mt-3 text-blue-600 text-sm hover:underline">+ Add first question</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════ EXAM CONFIG ══════ */}
        {activeTab === 'exams' && (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-xl font-bold">📝 Exam Configuration</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
              <h3 className="font-semibold">Weekly Test Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Questions per test', key: 'questionsPerTest' as const, type: 'number' },
                  { label: 'Time limit (minutes)', key: 'timeLimit' as const, type: 'number' },
                  { label: 'Negative marking/wrong', key: 'negativeMarking' as const, type: 'number' },
                  { label: 'Passing percentage', key: 'passingPercentage' as const, type: 'number' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
                    <input type="number" step={f.key === 'negativeMarking' ? '0.1' : '1'}
                      value={examSettings[f.key]}
                      onChange={e => setExamSettings({...examSettings, [f.key]: parseFloat(e.target.value) || 0})}
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
              <h3 className="font-semibold">Old is Gold Settings</h3>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Questions per paper</label>
                <input type="number" value={examSettings.oldIsGoldCount}
                  onChange={e => setExamSettings({...examSettings, oldIsGoldCount: parseInt(e.target.value) || 50})}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-semibold mb-3">Current Site Data</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg"><span className="font-medium">{practiceSubjects.length}</span> Practice Subjects</div>
                <div className="p-3 bg-green-50 rounded-lg"><span className="font-medium">{oldIsGoldSets.length}</span> Old is Gold Sets</div>
                <div className="p-3 bg-purple-50 rounded-lg"><span className="font-medium">{weeklyTests.length}</span> Weekly Tests</div>
                <div className="p-3 bg-orange-50 rounded-lg"><span className="font-medium">{questions.length}</span> Total Questions</div>
              </div>
            </div>

            <button onClick={saveExamSettings} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
              Save All Settings
            </button>
          </div>
        )}

        {/* ══════ ANALYTICS ══════ */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">📊 Performance Analytics</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold mb-3">Quiz Score Trend (Last 10)</h3>
                <div className="space-y-2">
                  {quizHistory.slice(-10).map((q, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 w-16">{new Date(q.date).toLocaleDateString()}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3">
                        <div className={`h-3 rounded-full transition-all ${q.score>=40?'bg-green-500':'bg-red-500'}`} style={{width:`${Math.min(q.score,100)}%`}} />
                      </div>
                      <span className="text-xs font-medium w-10 text-right">{q.score}%</span>
                    </div>
                  ))}
                  {quizHistory.length === 0 && <p className="text-gray-400 text-center py-8 text-sm">No data yet</p>}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold mb-3">Subject Question Count</h3>
                <div className="space-y-2">
                  {subjectStats.map(([subject, count]) => (
                    <div key={subject} className="flex items-center justify-between text-sm">
                      <span className="truncate">{subject}</span>
                      <span className="font-medium text-blue-600">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════ SETTINGS ══════ */}
        {activeTab === 'settings' && (
          <div className="max-w-md space-y-6">
            <h2 className="text-xl font-bold">⚙️ Admin Settings</h2>

            <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
              <h3 className="font-semibold">Change Admin Password</h3>
              <div className="flex gap-2">
                <input type="password" placeholder="New password (min 6 chars)" value={newPasswordInput}
                  onChange={e => setNewPasswordInput(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                <button onClick={handleChangePassword} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">Update</button>
              </div>
              <p className="text-[10px] text-gray-400">Password is hashed with SHA-256 before storage</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
              <h3 className="font-semibold">Danger Zone</h3>
              <button onClick={resetAllData} className="w-full bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center justify-center gap-2">
                <RefreshCw size={14} /> Reset All Data to Defaults
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-semibold mb-2">Session Info</h3>
              <p className="text-xs text-gray-500">Session expires in 2 hours. Password is never stored in plain text.</p>
            </div>
          </div>
        )}
      </div>

      {/* ══════ ADD QUESTION MODAL ══════ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold flex items-center gap-2"><Plus size={18}/> Add New Question</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Subject *</label>
                <select value={newQuestion.subject || ''} onChange={e => setNewQuestion({...newQuestion, subject: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="" disabled>Select subject</option>
                  {allSubjectOptions.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Question *</label>
                <textarea rows={3} value={newQuestion.question || ''} onChange={e => setNewQuestion({...newQuestion, question: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Type your question..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Options * (all 4 required)</label>
                {[0,1,2,3].map(i => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i === (newQuestion.correctAnswer || 0) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      {String.fromCharCode(65+i)}
                    </span>
                    <input type="text" placeholder={`Option ${String.fromCharCode(65+i)}`}
                      value={newQuestion.options?.[i] || ''}
                      onChange={e => {
                        const opts = [...(newQuestion.options || ['','','',''])];
                        opts[i] = e.target.value;
                        setNewQuestion({...newQuestion, options: opts});
                      }}
                      className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Correct Answer *</label>
                  <select value={newQuestion.correctAnswer || 0} onChange={e => setNewQuestion({...newQuestion, correctAnswer: parseInt(e.target.value)})}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    {[0,1,2,3].map(i => <option key={i} value={i}>Option {String.fromCharCode(65+i)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Difficulty</label>
                  <select value={newQuestion.difficulty || 'medium'} onChange={e => setNewQuestion({...newQuestion, difficulty: e.target.value as any})}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Explanation</label>
                <textarea rows={2} value={newQuestion.explanation || ''} onChange={e => setNewQuestion({...newQuestion, explanation: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Why is this the correct answer?" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Year (Optional)</label>
                <input type="text" value={newQuestion.year || ''} onChange={e => setNewQuestion({...newQuestion, year: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g., 2080" />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Cancel</button>
              <button onClick={addQuestion} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 font-medium">Add Question</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
