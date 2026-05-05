import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, FileText, Clock, BarChart3, 
  Settings, Plus, Edit, Trash2, Save, X, Download, Upload,
  Eye, Trophy, Calendar, TrendingUp, AlertCircle, CheckCircle,
  Printer, Filter, Search, RefreshCw, Lock, Unlock
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Question {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  year?: string;
  marks?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface UserStats {
  totalUsers: number;
  totalQuizzes: number;
  avgScore: number;
  topPerformer: string;
  totalQuestions: number;
  passRate: number;
  activeUsers: number;
}

interface QuizResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  correct: number;
  wrong: number;
  subject: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    totalQuizzes: 0,
    avgScore: 0,
    topPerformer: '',
    totalQuestions: 0,
    passRate: 0,
    activeUsers: 0
  });
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    setIsLoading(true);
    
    // Load questions
    const storedQuestions = localStorage.getItem('loksewa_questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      // Load default questions from your existing data
      const defaultQuestions = loadDefaultQuestions();
      setQuestions(defaultQuestions);
      localStorage.setItem('loksewa_questions', JSON.stringify(defaultQuestions));
    }
    
    // Load quiz history
    const storedHistory = localStorage.getItem('quiz_history');
    if (storedHistory) {
      const history = JSON.parse(storedHistory);
      setQuizHistory(history);
      
      // Calculate stats
      const totalQuizzes = history.length;
      const avgScore = history.reduce((acc: number, h: any) => acc + h.score, 0) / (totalQuizzes || 1);
      const passRate = (history.filter((h: any) => h.score >= 40).length / (totalQuizzes || 1)) * 100;
      
      setStats({
        totalUsers: parseInt(localStorage.getItem('total_users') || '1'),
        totalQuizzes: totalQuizzes,
        avgScore: avgScore,
        topPerformer: localStorage.getItem('top_performer') || 'You',
        totalQuestions: questions.length,
        passRate: passRate,
        activeUsers: parseInt(localStorage.getItem('active_users') || '1')
      });
    }
    
    setIsLoading(false);
  };

  const loadDefaultQuestions = (): Question[] => {
    // Load from your existing questions.ts
    const existingQuestions = localStorage.getItem('quiz_questions');
    if (existingQuestions) {
      return JSON.parse(existingQuestions);
    }
    return [
      {
        id: '1',
        subject: 'Computer Fundamentals',
        question: 'What is the full form of CPU?',
        options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Unit', 'Core Processing Unit'],
        correctAnswer: 0,
        explanation: 'CPU stands for Central Processing Unit'
      },
      {
        id: '2',
        subject: 'Operating System',
        question: 'Which of the following is not an operating system?',
        options: ['Windows', 'Linux', 'Oracle', 'macOS'],
        correctAnswer: 2,
        explanation: 'Oracle is a database management system'
      }
    ];
  };

  const saveQuestions = (updatedQuestions: Question[]) => {
    localStorage.setItem('loksewa_questions', JSON.stringify(updatedQuestions));
    setQuestions(updatedQuestions);
    toast({
      title: "Success",
      description: "Questions saved successfully",
    });
  };

  const addQuestion = () => {
    if (!newQuestion.question || !newQuestion.subject) {
      toast({
        title: "Error",
        description: "Please fill question and subject",
        variant: "destructive",
      });
      return;
    }

    const question: Question = {
      id: Date.now().toString(),
      subject: newQuestion.subject || 'General',
      question: newQuestion.question || '',
      options: newQuestion.options || ['', '', '', ''],
      correctAnswer: newQuestion.correctAnswer || 0,
      explanation: newQuestion.explanation || '',
      year: newQuestion.year,
      marks: newQuestion.marks || 1,
      difficulty: (newQuestion.difficulty as 'easy' | 'medium' | 'hard') || 'medium'
    };
    
    saveQuestions([...questions, question]);
    setShowAddModal(false);
    setNewQuestion({});
    toast({
      title: "Success",
      description: "Question added successfully",
    });
  };

  const updateQuestion = () => {
    if (editingQuestion) {
      const updated = questions.map(q => 
        q.id === editingQuestion.id ? editingQuestion : q
      );
      saveQuestions(updated);
      setEditingQuestion(null);
      toast({
        title: "Success",
        description: "Question updated successfully",
      });
    }
  };

  const deleteQuestion = (id: string) => {
    saveQuestions(questions.filter(q => q.id !== id));
    setShowDeleteConfirm(null);
    toast({
      title: "Deleted",
      description: "Question deleted successfully",
    });
  };

  const exportData = () => {
    const data = {
      questions,
      quizHistory,
      userProgress: localStorage.getItem('user_progress'),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loksewa_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Your data has been exported",
    });
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.questions) {
            saveQuestions(data.questions);
            toast({
              title: "Import Successful",
              description: `Imported ${data.questions.length} questions`,
            });
          }
          if (data.quizHistory) {
            localStorage.setItem('quiz_history', JSON.stringify(data.quizHistory));
            loadAllData();
          }
        } catch (error) {
          toast({
            title: "Import Failed",
            description: "Invalid file format",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const clearAllData = () => {
    if (confirm('⚠️ WARNING: This will delete ALL questions and quiz history. Are you sure?')) {
      localStorage.removeItem('loksewa_questions');
      localStorage.removeItem('quiz_history');
      localStorage.removeItem('user_progress');
      loadAllData();
      toast({
        title: "Data Cleared",
        description: "All data has been reset",
      });
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ['all', ...new Set(questions.map(q => q.subject))];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'blue' },
    { id: 'questions', label: 'Question Bank', icon: BookOpen, color: 'green' },
    { id: 'exams', label: 'Exam Manager', icon: FileText, color: 'purple' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'orange' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Lock className="text-yellow-400" size={24} />
                लोकसेवा स्मार्ट प्रिप
                <span className="text-sm bg-yellow-600 px-2 py-1 rounded text-xs">एड्मिन</span>
              </h1>
              <p className="text-blue-200 text-sm mt-1">Manage Questions, Exams & User Data</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={exportData}
                className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <Download size={16} /> Backup
              </button>
              <label className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer">
                <Upload size={16} /> Import
                <input type="file" accept=".json" onChange={importData} className="hidden" />
              </label>
              <button 
                onClick={clearAllData}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <RefreshCw size={16} /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-md sticky top-[73px] z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? `text-${tab.color}-600 border-b-2 border-${tab.color}-600 bg-${tab.color}-50` 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
                {tab.id === 'questions' && (
                  <span className="ml-1 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
                    {filteredQuestions.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Total Questions</p>
                        <p className="text-3xl font-bold">{questions.length}</p>
                      </div>
                      <BookOpen className="text-blue-500" size={40} />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Quizzes Taken</p>
                        <p className="text-3xl font-bold">{stats.totalQuizzes}</p>
                      </div>
                      <FileText className="text-green-500" size={40} />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Avg. Score</p>
                        <p className="text-3xl font-bold">{stats.avgScore.toFixed(1)}%</p>
                      </div>
                      <BarChart3 className="text-orange-500" size={40} />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Pass Rate</p>
                        <p className="text-3xl font-bold">{stats.passRate.toFixed(1)}%</p>
                      </div>
                      <Trophy className="text-purple-500" size={40} />
                    </div>
                  </div>
                </div>

                {/* Charts and Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Calendar size={20} />
                      Recent Quiz Activity
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {quizHistory.slice(0, 10).map((quiz, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{quiz.subject}</p>
                            <p className="text-xs text-gray-500">{new Date(quiz.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${quiz.score >= 40 ? 'text-green-600' : 'text-red-600'}`}>
                              {quiz.score}%
                            </p>
                            <p className="text-xs text-gray-500">{quiz.correct}/{quiz.totalQuestions} correct</p>
                          </div>
                        </div>
                      ))}
                      {quizHistory.length === 0 && (
                        <p className="text-gray-500 text-center py-8">No quiz attempts yet</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Settings size={20} />
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button 
                        onClick={() => { setActiveTab('questions'); setShowAddModal(true); }}
                        className="w-full text-left px-4 py-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition flex items-center gap-3"
                      >
                        <Plus size={18} className="text-blue-600" />
                        <span>➕ Add New Question</span>
                      </button>
                      <label className="w-full block px-4 py-3 bg-green-50 rounded-lg hover:bg-green-100 transition cursor-pointer flex items-center gap-3">
                        <Upload size={18} className="text-green-600" />
                        <span>📥 Import Questions from JSON</span>
                        <input type="file" accept=".json" onChange={importData} className="hidden" />
                      </label>
                      <button 
                        onClick={exportData}
                        className="w-full text-left px-4 py-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition flex items-center gap-3"
                      >
                        <Download size={18} className="text-emerald-600" />
                        <span>💾 Export All Data</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('exams')}
                        className="w-full text-left px-4 py-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition flex items-center gap-3"
                      >
                        <Settings size={18} className="text-purple-600" />
                        <span>⚙️ Configure Exam Settings</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subject Distribution */}
                <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-lg mb-4">Subject Distribution</h3>
                  <div className="flex flex-wrap gap-3">
                    {subjects.filter(s => s !== 'all').map(subject => (
                      <div key={subject} className="px-3 py-2 bg-gray-100 rounded-lg">
                        <span className="font-medium">{subject}</span>
                        <span className="ml-2 text-blue-600">({questions.filter(q => q.subject === subject).length})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div>
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <h2 className="text-xl font-bold">📚 Question Bank</h2>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
                  >
                    <Plus size={18} /> Add Question
                  </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="text" 
                          placeholder="Search questions..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <select 
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {subjects.map(sub => (
                        <option key={sub} value={sub}>
                          {sub === 'all' ? 'All Subjects' : sub}
                        </option>
                      ))}
                    </select>
                    <button 
                      onClick={() => { setSearchTerm(''); setSelectedSubject('all'); }}
                      className="text-gray-500 hover:text-gray-700 px-3"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                  {filteredQuestions.map((q, idx) => (
                    <div key={q.id} className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition">
                      {editingQuestion?.id === q.id ? (
                        <div className="space-y-3">
                          <input 
                            type="text" 
                            value={editingQuestion.question} 
                            onChange={e => setEditingQuestion({...editingQuestion, question: e.target.value})}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Question"
                          />
                          {editingQuestion.options.map((opt, optIdx) => (
                            <input 
                              key={optIdx}
                              type="text"
                              value={opt}
                              onChange={e => {
                                const newOpts = [...editingQuestion.options];
                                newOpts[optIdx] = e.target.value;
                                setEditingQuestion({...editingQuestion, options: newOpts});
                              }}
                              placeholder={`Option ${optIdx + 1}`}
                              className={`w-full border rounded-lg p-2 ${optIdx === editingQuestion.correctAnswer ? 'border-green-400 bg-green-50' : ''}`}
                            />
                          ))}
                          <select
                            value={editingQuestion.correctAnswer}
                            onChange={e => setEditingQuestion({...editingQuestion, correctAnswer: parseInt(e.target.value)})}
                            className="border rounded-lg p-2"
                          >
                            {[0, 1, 2, 3].map(i => (
                              <option key={i} value={i}>Correct Answer: Option {i + 1}</option>
                            ))}
                          </select>
                          <textarea
                            value={editingQuestion.explanation}
                            onChange={e => setEditingQuestion({...editingQuestion, explanation: e.target.value})}
                            placeholder="Explanation"
                            className="w-full border rounded-lg p-2"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button onClick={updateQuestion} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Save Changes</button>
                            <button onClick={() => setEditingQuestion(null)} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">#{idx + 1}</span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{q.subject}</span>
                                {q.difficulty && (
                                  <span className={`text-xs px-2 py-1 rounded ${
                                    q.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                    q.difficulty === 'hard' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {q.difficulty}
                                  </span>
                                )}
                                {q.year && <span className="text-xs bg-gray-100 px-2 py-1 rounded">वर्ष: {q.year}</span>}
                              </div>
                              <p className="font-medium text-gray-800 mb-3">{q.question}</p>
                              <div className="space-y-1.5">
                                {q.options.map((opt, i) => (
                                  <p key={i} className={`text-sm flex items-center gap-2 ${i === q.correctAnswer ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                                    <span className="w-6">{String.fromCharCode(65 + i)}.</span>
                                    {opt}
                                    {i === q.correctAnswer && <CheckCircle size={14} className="text-green-600" />}
                                  </p>
                                ))}
                              </div>
                              {q.explanation && (
                                <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-gray-600">
                                  <span className="font-medium">📝 व्याख्या:</span> {q.explanation}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-1 ml-4">
                              <button 
                                onClick={() => setEditingQuestion(q)} 
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => setShowDeleteConfirm(q.id)} 
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          {showDeleteConfirm === q.id && (
                            <div className="mt-3 p-3 bg-red-50 rounded-lg flex items-center justify-between">
                              <span className="text-sm text-red-700">Delete this question?</span>
                              <div className="flex gap-2">
                                <button onClick={() => deleteQuestion(q.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Yes, Delete</button>
                                <button onClick={() => setShowDeleteConfirm(null)} className="bg-gray-300 px-3 py-1 rounded text-sm">Cancel</button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {filteredQuestions.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                      <BookOpen size={48} className="mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500">No questions found</p>
                      <button onClick={() => setShowAddModal(true)} className="mt-3 text-blue-600 hover:underline">
                        + Add your first question
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'exams' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">📝 Exam Configuration</h2>
                <div className="space-y-6 max-w-2xl">
                  <div className="border rounded-lg p-5">
                    <h3 className="font-semibold text-lg mb-4">Weekly Test Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Questions per test</label>
                        <input 
                          type="number" 
                          defaultValue={localStorage.getItem('exam_questions_count') || '50'} 
                          onChange={(e) => localStorage.setItem('exam_questions_count', e.target.value)}
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time limit (minutes)</label>
                        <input 
                          type="number" 
                          defaultValue={localStorage.getItem('exam_time_limit') || '60'} 
                          onChange={(e) => localStorage.setItem('exam_time_limit', e.target.value)}
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Negative marking per wrong</label>
                        <input 
                          type="number" 
                          step="0.1" 
                          defaultValue={localStorage.getItem('negative_marking') || '0.4'} 
                          onChange={(e) => localStorage.setItem('negative_marking', e.target.value)}
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Passing percentage</label>
                        <input 
                          type="number" 
                          defaultValue={localStorage.getItem('passing_percentage') || '40'} 
                          onChange={(e) => localStorage.setItem('passing_percentage', e.target.value)}
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5">
                    <h3 className="font-semibold text-lg mb-4">Old is Gold Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Questions per paper</label>
                        <input 
                          type="number" 
                          defaultValue={localStorage.getItem('old_is_gold_count') || '50'} 
                          onChange={(e) => localStorage.setItem('old_is_gold_count', e.target.value)}
                          className="border rounded-lg px-3 py-2 w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      toast({
                        title: "Settings Saved",
                        description: "Exam configurations updated",
                      });
                    }}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition"
                  >
                    Save All Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">📊 Performance Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-5">
                    <h3 className="font-semibold mb-3">Quiz Performance Trend</h3>
                    <div className="space-y-2">
                      {quizHistory.slice(-10).map((quiz, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-24">{new Date(quiz.date).toLocaleDateString()}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-4">
                            <div 
                              className={`h-4 rounded-full ${quiz.score >= 40 ? 'bg-green-500' : 'bg-red-500'}`}
                              style={{ width: `${quiz.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12">{quiz.score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5">
                    <h3 className="font-semibold mb-3">Subject-wise Performance</h3>
                    <div className="space-y-3">
                      {subjects.filter(s => s !== 'all').map(subject => {
                        const subjectQuestions = questions.filter(q => q.subject === subject);
                        return (
                          <div key={subject} className="flex justify-between items-center">
                            <span className="text-sm">{subject}</span>
                            <span className="text-sm font-medium">{subjectQuestions.length} questions</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">⚙️ Admin Settings</h2>
                <div className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Change Admin Password</label>
                    <div className="flex gap-2">
                      <input 
                        type="password" 
                        placeholder="New password" 
                        id="newPassword"
                        className="border rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-500"
                      />
                      <button 
                        onClick={() => {
                          const newPass = (document.getElementById('newPassword') as HTMLInputElement).value;
                          if (newPass) {
                            localStorage.setItem('admin_password', newPass);
                            toast({
                              title: "Password Updated",
                              description: "Admin password has been changed",
                            });
                          }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Update
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Current default: Lokseva@2082</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
                    <input 
                      type="text" 
                      defaultValue="Loksewa Smart Prep" 
                      id="siteTitle"
                      className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <button 
                    onClick={() => {
                      const title = (document.getElementById('siteTitle') as HTMLInputElement).value;
                      localStorage.setItem('site_title', title);
                      toast({
                        title: "Settings Saved",
                        description: "Site settings updated",
                      });
                    }}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Plus size={20} />
                Add New Question
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Subject *</label>
                <select 
                  onChange={e => setNewQuestion({...newQuestion, subject: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  defaultValue=""
                >
                  <option value="" disabled>Select subject</option>
                  <option>Computer Fundamentals</option>
                  <option>Operating System</option>
                  <option>Networking</option>
                  <option>Database</option>
                  <option>Programming</option>
                  <option>General Knowledge</option>
                  <option>Public Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Question *</label>
                <textarea 
                  rows={3}
                  onChange={e => setNewQuestion({...newQuestion, question: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter question here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Options *</label>
                {[0, 1, 2, 3].map(i => (
                  <input 
                    key={i}
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    onChange={e => {
                      const opts = [...(newQuestion.options || ['', '', '', ''])];
                      opts[i] = e.target.value;
                      setNewQuestion({...newQuestion, options: opts});
                    }}
                    className="w-full border rounded-lg px-3 py-2 mb-2 focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Correct Answer (0-3) *</label>
                <input 
                  type="number" 
                  min="0" 
                  max="3"
                  onChange={e => setNewQuestion({...newQuestion, correctAnswer: parseInt(e.target.value)})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">0=Option 1, 1=Option 2, 2=Option 3, 3=Option 4</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Explanation (Optional)</label>
                <textarea 
                  rows={2}
                  onChange={e => setNewQuestion({...newQuestion, explanation: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain why this is correct..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Year (Optional)</label>
                <input 
                  type="text"
                  placeholder="e.g., 2080, 2079"
                  onChange={e => setNewQuestion({...newQuestion, year: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t bg-gray-50">
              <button onClick={() => setShowAddModal(false)} className="px-5 py-2 border rounded-lg hover:bg-gray-100">Cancel</button>
              <button onClick={addQuestion} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Question</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
