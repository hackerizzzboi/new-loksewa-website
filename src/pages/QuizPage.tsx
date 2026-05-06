import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getOldIsGoldQuestions, getWeeklyTestQuestions, weeklyTests, practiceSubjects, type Question } from "@/data/questions";
import { computerOperatorQuestions, shuffleArray } from "@/data/computer_operator";
import { set1Questions } from "@/data/set1Questions";
import { CheckCircle, XCircle } from "lucide-react";

const QuizPage = () => {
  const { category, setId } = useParams();
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

  // Get URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const countParam = params.get('count');
    const titleParam = params.get('title');
    if (countParam) {
      setQuestionCount(parseInt(countParam));
    }
    if (titleParam) {
      setCustomTitle(decodeURIComponent(titleParam));
    }
  }, [location.search]);

  const title = useMemo(() => {
    if (customTitle) return customTitle;
    if (category === "practice" && setId) {
      const s = practiceSubjects.find(s => s.id === setId);
      return s ? `${s.icon} ${s.title}` : "Practice";
    }
    if (category === "old-is-gold") return "🏆 Old is Gold";
    if (category === "online-exam") {
      const t = weeklyTests.find(t => t.id === setId);
      return t ? `📝 ${t.titleNp}` : "Online Exam";
    }
    return "Quiz";
  }, [category, setId, customTitle]);

  useEffect(() => {
    let qs: Question[] = [];
    
    if (category === "practice" && setId) {
      // Use the new computer operator questions
      const questionsFromBank = computerOperatorQuestions[setId];
      if (questionsFromBank) {
        // Take only the selected number of questions
        const shuffled = shuffleArray([...questionsFromBank]);
        qs = shuffled.slice(0, questionCount);
      } else {
        // Fallback to old practiceQuestions if needed
        const { practiceQuestions } = require("@/data/questions");
        if (practiceQuestions[setId]) {
          const shuffled = shuffleArray(practiceQuestions[setId]);
          qs = shuffled.slice(0, questionCount);
        }
      }
    } else if (category === "old-is-gold" && setId) {
      // Use exact questions for Set 1, otherwise use generated ones
      if (setId === "set-1") {
        // Convert set1Questions to match Question type - NO SHUFFLE
        qs = set1Questions.map(q => ({
          id: q.id.toString(),
          question: q.text,
          options: q.options,
          correct: q.correctAnswer,
          explanation: q.explanation
        }));
        // NO SHUFFLE - questions stay in original order 1 to 50
      } else {
        qs = getOldIsGoldQuestions(setId);
      }
    } else if (category === "online-exam" && setId) {
      qs = getWeeklyTestQuestions(setId);
      const test = weeklyTests.find(t => t.id === setId);
      if (test) setTimeLeft(test.time * 60);
    }
    
    setQuestions(qs);
    setAnswers({});
    setCurrent(0);
    setShowResult(false);
    setStarted(category !== "online-exam");
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

  // Calculate results
  const results = useMemo(() => {
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
  }, [questions, answers, showResult, category]);

  const q = questions[current];
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  if (!started && category === "online-exam") {
    const test = weeklyTests.find(t => t.id === setId);
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl animate-fade-in text-center">
        <h1 className="text-2xl font-heading font-bold mb-4">{title}</h1>
        <div className="bg-card rounded-2xl shadow-md p-6 space-y-3 text-sm">
          <p>एक पटक मात्र परीक्षा दिन पाइनेछ। 'Start' मा क्लिक गरेपछि समय गणना हुनेछ।</p>
          <p>'Start' मा क्लिक गरेपछि पेजलाई 'Refresh' नगर्नुहोला।</p>
          <p className="font-semibold">सोच विचार गरेर मात्र जवाफ दिनुहोला। शुभकामना !</p>
          <div className="pt-4 space-y-1">
            <p><strong>प्रश्न संख्या:</strong> {test?.questions}</p>
            <p><strong>पूर्णाङ्क:</strong> {test?.marks} (प्रत्येक गलत उत्तरमा {test?.negativeMarking} अंक कट्टा)</p>
            <p><strong>परीक्षा समय:</strong> {test?.time} मिनेट</p>
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

        {/* Review Answers - WITH ✓ and ✗ */}
        <h2 className="text-lg font-heading font-bold mb-4">📋 Review Answers</h2>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correct;
            const isUnanswered = userAns === undefined || userAns === null;
            
            return (
              <div key={q.id} className={`bg-card rounded-xl p-4 border-l-4 ${isUnanswered ? "border-muted-foreground" : isCorrect ? "border-green-500" : "border-red-500"}`}>
                <div className="flex justify-between items-start mb-3">
                  <p className="font-semibold text-sm">{i + 1}. {q.question}</p>
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
                  {q.options.map((opt, oi) => {
                    const isCorrectOption = oi === q.correct;
                    const isUserSelectedWrong = userAns === oi && !isCorrectOption;
                    
                    return (
                      <div 
                        key={oi} 
                        className={`p-2 rounded-lg flex items-center gap-2 ${
                          isCorrectOption 
                            ? "bg-green-100 border border-green-400 text-green-800 font-semibold" 
                            : isUserSelectedWrong 
                              ? "bg-red-100 border border-red-400 text-red-800 line-through"
                              : "bg-gray-50"
                        }`}
                      >
                        <span className="font-bold">{String.fromCharCode(65 + oi)}.</span>
                        <span className="flex-1">{opt}</span>
                        {isCorrectOption && <CheckCircle size={16} className="text-green-600 flex-shrink-0" />}
                        {isUserSelectedWrong && <XCircle size={16} className="text-red-600 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>
                
                {q.explanation && (
                  <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100 italic">
                    💡 {q.explanation}
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

  if (!q) return <div className="container mx-auto px-4 py-8 text-center">Loading questions...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-fade-in">
      {/* Header */}
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

      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm font-semibold">{current + 1}/{questions.length}</span>
      </div>

      {/* Question */}
      <div className="bg-card rounded-2xl shadow-md p-6 mb-6">
        <p className="font-bold text-lg mb-6">{current + 1}. {q.question}</p>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(q.id, i)}
              className={`quiz-option ${answers[q.id] === i ? "quiz-option-selected" : ""}`}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold mr-3">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
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

      {/* Question Navigator */}
      <div className="mt-6 bg-card rounded-2xl p-4 shadow-sm">
        <p className="text-xs text-muted-foreground mb-2">Question Navigator</p>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                i === current ? "bg-primary text-primary-foreground" :
                answers[q.id] !== undefined && answers[q.id] !== null ? "bg-green-500 text-white" :
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
