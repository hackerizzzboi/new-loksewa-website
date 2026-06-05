import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getOldIsGoldQuestions, getWeeklyTestQuestions, weeklyTests, practiceSubjects, type Question } from "@/data/questions";
import { computerOperatorQuestions, shuffleArray } from "@/data/computer_operator";
import { set4Questions } from "@/data/set4Questions";
import { CheckCircle, XCircle } from "lucide-react";
import { exam1Questions } from "@/data/online_exam/exam1";
import { exam2Questions } from "@/data/online_exam/exam2";
import { exam3Questions } from "@/data/online_exam/exam3";
import { exam4Questions } from "@/data/online_exam/exam4";
import { exam5Questions } from "@/data/online_exam/exam5";
import { exam6Questions } from "@/data/online_exam/exam6";
import { exam7Questions } from "@/data/online_exam/exam7";
import { exam8Questions } from "@/data/online_exam/exam8";
import { exam9Questions } from "@/data/online_exam/exam9";
import { exam10Questions } from "@/data/online_exam/exam10";
import { exam11Questions } from "@/data/online_exam/exam11";
import { exam12Questions } from "@/data/online_exam/exam12";
import { exam13Questions } from "@/data/online_exam/exam13";
import { exam14Questions } from "@/data/online_exam/exam14";
import { exam15Questions } from "@/data/online_exam/exam15";
import { quiz1Questions } from "@/data/online_exam/quiz1";
import { quiz2Questions } from "@/data/online_exam/quiz2";
import { quiz3Questions } from "@/data/online_exam/quiz3";
import { quiz4Questions } from "@/data/online_exam/quiz4";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const QuizPage = () => {
  const { category, setId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [customTitle, setCustomTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const countParam = params.get('count');
    const titleParam = params.get('title');
    if (countParam) setQuestionCount(parseInt(countParam));
    if (titleParam) setCustomTitle(decodeURIComponent(titleParam));
  }, [location.search]);

  const title = useMemo(() => {
    if (customTitle) return customTitle;
    if (category === "practice" && setId) {
      const s = practiceSubjects.find(s => s.id === setId);
      return s ? `${s.icon} ${s.title}` : "Practice";
    }
    if (category === "old-is-gold") return "🏆 Old is Gold";
    if (category === "online-exam") {
      if (setId === "exam-1") return "📝 1st Exam - Operator Sample Exam 2082";
      if (setId === "exam-2") return "📝 2nd Exam - Operator Sample Exam 2082";
      if (setId === "exam-3") return "📝 3rd Exam - Operator Sample Exam 2082";
      if (setId === "exam-4") return "📝 4th Exam - Operator Sample Exam 2082";
      if (setId === "exam-5") return "📝 5th Exam - Operator Sample Exam 2082";
      if (setId === "exam-6") return "📝 6th Exam - Operator Sample Exam 2082";
      if (setId === "exam-7") return "📝 7th Exam - Operator Sample Exam 2082";
      if (setId === "exam-8") return "📝 8th Exam - Operator Sample Exam 2082";
      if (setId === "exam-9") return "📝 9th Exam - Operator Sample Exam 2082";
      if (setId === "exam-10") return "📝 10th Exam - Operator Sample Exam 2082";
      if (setId === "exam-11") return "📝 11th Exam - Operator Sample Exam 2082";
      if (setId === "exam-12") return "📝 12th Exam - Operator Sample Exam 2082";
      if (setId === "exam-13") return "📝 13th Exam - Operator Sample Exam 2082";
      if (setId === "exam-14") return "📝 14th Exam - Operator Sample Exam 2082";
      if (setId === "exam-15") return "📝 15th Exam - Operator Sample Exam 2082";
      if (setId === "quiz-1") return "📋 1st Quiz - Public Administration";
      if (setId === "quiz-2") return "📋 2nd Quiz - Public Administration";
      if (setId === "quiz-3") return "📋 3rd Quiz - Public Administration";
      if (setId === "quiz-4") return "📋 4th Quiz - Public Administration";
      if (setId?.startsWith("exam-")) return "📝 Online Exam";
      if (setId?.startsWith("quiz-")) return "📋 Public Administration Quiz";
      const t = weeklyTests.find(t => t.id === setId);
      return t ? `📝 ${t.titleNp}` : "Online Exam";
    }
    return "Quiz";
  }, [category, setId, customTitle]);

  useEffect(() => {
    setIsLoading(true);
    let qs: Question[] = [];
    
    if (category === "practice" && setId) {
      const questionsFromBank = computerOperatorQuestions[setId];
      if (questionsFromBank) {
        const shuffled = shuffleArray([...questionsFromBank]);
        qs = shuffled.slice(0, questionCount);
      }
    } else if (category === "old-is-gold" && setId) {
      if (setId === "set-4") {
        qs = set4Questions.map(q => ({
          id: q.id.toString(),
          question: q.text,
          options: q.options,
          correct: q.correctAnswer,
          explanation: q.explanation
        }));
      } else {
        qs = getOldIsGoldQuestions(setId);
      }
    } else if (category === "online-exam" && setId) {
      // Handle all 15 exams and 4 quizzes
      if (setId === "exam-1") {
        qs = [...exam1Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-2") {
        qs = [...exam2Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-3") {
        qs = [...exam3Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-4") {
        qs = [...exam4Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-5") {
        qs = [...exam5Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-6") {
        qs = [...exam6Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-7") {
        qs = [...exam7Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-8") {
        qs = [...exam8Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-9") {
        qs = [...exam9Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-10") {
        qs = [...exam10Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-11") {
        qs = [...exam11Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-12") {
        qs = [...exam12Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-13") {
        qs = [...exam13Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-14") {
        qs = [...exam14Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "exam-15") {
        qs = [...exam15Questions];
        setTimeLeft(45 * 60);
      } else if (setId === "quiz-1") {
        qs = [...quiz1Questions];
        setTimeLeft(15 * 60);
      } else if (setId === "quiz-2") {
        qs = [...quiz2Questions];
        setTimeLeft(15 * 60);
      } else if (setId === "quiz-3") {
        qs = [...quiz3Questions];
        setTimeLeft(15 * 60);
      } else if (setId === "quiz-4") {
        qs = [...quiz4Questions];
        setTimeLeft(15 * 60);
      } else {
        qs = [];
      }
    }
    
    setQuestions(qs);
    setAnswers({});
    setCurrent(0);
    setShowResult(false);
    setStarted(category !== "online-exam");
    setIsLoading(false);
  }, [category, setId, questionCount]);

  // Timer
  useEffect(() => {
    if (!started || timeLeft === null || timeLeft <= 0 || showResult) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev !== null && prev <= 1) { setShowResult(true); return 0; }
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [started, timeLeft, showResult]);

  const handleAnswer = (qId: string, optIndex: number) => {
    if (showResult) return;
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmit = () => setShowResult(true);

  const results = useMemo(() => {
    if (questions.length === 0) {
      return { correct: 0, wrong: 0, unanswered: 0, marks: 0, total: 0, percentage: 0 };
    }
    let correct = 0, wrong = 0, unanswered = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (ans === undefined || ans === null) unanswered++;
      else if (ans === q.correct) correct++;
      else wrong++;
    });
    const negMarking = category === "online-exam" ? 0.4 : 0;
    const marks = (correct * 2) - (wrong * negMarking);
    const total = questions.length * 2;
    const percentage = total > 0 ? (marks / total) * 100 : 0;
    return { correct, wrong, unanswered, marks: Math.max(0, marks), total, percentage };
  }, [questions, answers, category]);

  const q = questions[current];
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading questions...</div>;
  }

  // Start screen for online exams
  if (!started && category === "online-exam") {
    const isExam = setId?.startsWith("exam-");
    const isQuiz = setId?.startsWith("quiz-");
    const questionCount_text = isExam ? 50 : isQuiz ? 25 : 50;
    const timeMinutes = isExam ? 45 : isQuiz ? 15 : 20;
    const marks = questionCount_text * 2;
    
    // Check if questions exist for this exam/quiz
    const examIds = ["exam-1", "exam-2", "exam-3", "exam-4", "exam-5", "exam-6", "exam-7", "exam-8", "exam-9", "exam-10", "exam-11", "exam-12", "exam-13", "exam-14", "exam-15"];
    const quizIds = ["quiz-1", "quiz-2", "quiz-3", "quiz-4"];
    const hasQuestions = [...examIds, ...quizIds].includes(setId || "");
    
    if (!hasQuestions && (setId?.startsWith("exam-") || setId?.startsWith("quiz-"))) {
      return (
        <div className="container mx-auto px-4 py-8 max-w-2xl animate-fade-in text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">{title}</h1>
          <div className="bg-amber-50 rounded-2xl shadow-md p-8">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-xl font-bold text-amber-800 mb-2">Coming Soon!</h2>
            <p className="text-amber-600">This exam is under preparation. Please check back later.</p>
            <button onClick={() => navigate(-1)} className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-2 rounded-xl font-bold hover:opacity-90">
              ← Go Back
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl animate-fade-in text-center">
        <h1 className="text-2xl font-heading font-bold mb-4">{title}</h1>
        <div className="bg-card rounded-2xl shadow-md p-6 space-y-3 text-sm">
          <p>एक पटक मात्र परीक्षा दिन पाइनेछ। 'Start' मा क्लिक गरेपछि समय गणना हुनेछ।</p>
          <p>'Start' मा क्लिक गरेपछि पेजलाई 'Refresh' नगर्नुहोला।</p>
          <p className="font-semibold">सोच विचार गरेर मात्र जवाफ दिनुहोला। शुभकामना !</p>
          <div className="pt-4 space-y-1">
            <p><strong>प्रश्न संख्या:</strong> {questionCount_text}</p>
            <p><strong>पूर्णाङ्क:</strong> {marks} (प्रत्येक गलत उत्तरमा 0.4 अंक कट्टा)</p>
            <p><strong>परीक्षा समय:</strong> {timeMinutes} मिनेट</p>
          </div>
        </div>
        <button onClick={() => setStarted(true)} className="mt-6 bg-primary text-primary-foreground px-12 py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
          Start
        </button>
      </div>
    );
  }

  if (showResult) {
    const passed = results.percentage >= 40;
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">{passed ? "🎉 Congratulations!" : "😔 Oops!"}</h1>
          <p className="text-lg font-semibold">{passed ? "You passed the quiz!" : "You did not pass. Try again!"}</p>
          <p className="text-muted-foreground mt-1">{passed ? "राम्रो गर्नुभयो! मेहनत सफल भयो।" : "अझै मेहनत गर्नुहोस्। मेहनत गर्नेलाई सफल हुन कसैले रोक्न सक्दैन।"}</p>
          <p className="text-2xl font-heading font-bold mt-4">Your score is {results.marks.toFixed(1)} / {results.total}</p>
          <div className="w-full bg-muted rounded-full h-4 mt-4">
            <div className={`h-4 rounded-full transition-all ${passed ? "bg-success" : "bg-destructive"}`} style={{ width: `${Math.max(results.percentage, 2)}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
            <div className="bg-success/10 text-success rounded-xl p-3"><p className="text-2xl font-bold">{results.correct}</p><p>Correct</p></div>
            <div className="bg-destructive/10 text-destructive rounded-xl p-3"><p className="text-2xl font-bold">{results.wrong}</p><p>Wrong</p></div>
            <div className="bg-muted rounded-xl p-3"><p className="text-2xl font-bold">{results.unanswered}</p><p>Unanswered</p></div>
          </div>
        </div>

        <h2 className="text-lg font-heading font-bold mb-4">📋 Review Answers</h2>
        <div className="space-y-4">
          {questions.map((question, i) => {
            const userAns = answers[question.id];
            const isCorrect = userAns === question.correct;
            const isUnanswered = userAns === undefined || userAns === null;
            
            return (
              <div key={question.id} className={`bg-card rounded-xl p-4 border-l-4 ${isUnanswered ? "border-muted-foreground" : isCorrect ? "border-green-500" : "border-red-500"}`}>
                <div className="flex justify-between items-start mb-3">
                  <p className="font-semibold text-sm">{i + 1}. {question.question}</p>
                  <div className="flex items-center gap-1">
                    {!isUnanswered && (
                      isCorrect ? (
                        <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-xs font-semibold">
                          <CheckCircle size={14} /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-0.5 rounded-full text-xs font-semibold">
                          <XCircle size={14} /> Wrong
                        </span>
                      )
                    )}
                    {isUnanswered && (
                      <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-semibold">
                        Not answered
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {question.options.map((opt, oi) => {
                    const isCorrectOption = oi === question.correct;
                    const isUserSelectedWrong = userAns === oi && !isCorrectOption;
                    
                    return (
                      <div key={oi} className={`p-2 rounded-lg flex items-center gap-2 ${
                        isCorrectOption 
                          ? "bg-green-100 border border-green-400 text-green-800 font-semibold" 
                          : isUserSelectedWrong 
                            ? "bg-red-100 border border-red-400 text-red-800 line-through"
                            : "bg-gray-50"
                      }`}>
                        <span className="font-bold">{String.fromCharCode(65 + oi)}.</span>
                        <span className="flex-1">{opt}</span>
                        {isCorrectOption && <CheckCircle size={16} className="text-green-600 flex-shrink-0" />}
                        {isUserSelectedWrong && <XCircle size={16} className="text-red-600 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>
                
                {question.explanation && (
                  <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100 italic">
                    💡 {question.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 mt-8 justify-center">
          <button onClick={() => navigate(-1)} className="bg-muted px-6 py-2.5 rounded-xl font-semibold hover:bg-muted/80 transition-colors">← Back</button>
          <button onClick={() => window.location.reload()} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">Try Again</button>
        </div>
      </div>
    );
  }

  if (!q) {
    return <div className="container mx-auto px-4 py-8 text-center">No questions available.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-heading font-bold">{title}</h1>
          <p className="text-xs text-gray-500 mt-1">कुल {questions.length} प्रश्नहरू</p>
        </div>
        {timeLeft !== null && (
          <div className={`text-lg font-heading font-bold px-4 py-2 rounded-xl ${timeLeft < 60 ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-card-navy text-primary-foreground"}`}>
            ⏱ {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm font-semibold">{current + 1}/{questions.length}</span>
      </div>

      <div className="bg-card rounded-2xl shadow-md p-6 mb-6">
        <p className="font-bold text-lg mb-6">{current + 1}. {q.question}</p>
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isSelected = answers[q.id] === i;
            return (
              <button
                key={i}
                onClick={() => handleAnswer(q.id, i)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                  isSelected 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-600 text-white shadow-md" 
                    : "bg-white border-gray-200 text-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-purple-600 hover:shadow-md hover:translate-x-1"
                }`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {isSelected && (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} className="bg-muted px-5 py-2.5 rounded-xl font-semibold disabled:opacity-40 hover:bg-muted/80 transition-colors">
          ← Previous
        </button>
        {current < questions.length - 1 ? (
          <button onClick={() => setCurrent(current + 1)} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Next →
          </button>
        ) : (
          <button onClick={handleSubmit} className="bg-success text-primary-foreground px-8 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity">
            Submit ✓
          </button>
        )}
      </div>

      <div className="mt-6 bg-card rounded-2xl p-4 shadow-sm">
        <p className="text-xs text-muted-foreground mb-2">Question Navigator</p>
        <div className="flex flex-wrap gap-2">
          {questions.map((question, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                i === current ? "bg-primary text-primary-foreground" :
                answers[question.id] !== undefined && answers[question.id] !== null ? "bg-green-500 text-white" :
                "bg-muted"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
