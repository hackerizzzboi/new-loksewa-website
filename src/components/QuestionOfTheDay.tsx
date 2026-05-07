import { useState, useEffect } from "react";
import { MessageCircle, Send, User, Clock, Trophy } from "lucide-react";

interface DailyQuestion {
  id: string;
  question: string;
  options?: string[];
  postedAt: string; // ISO string
  postedBy: string;
}

interface Answer {
  id: string;
  questionId: string;
  name: string;
  answer: string;
  timestamp: string;
}

const QuestionOfTheDay = () => {
  const [dailyQuestion, setDailyQuestion] = useState<DailyQuestion | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [name, setName] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Load question of the day
    const stored = localStorage.getItem("daily_question");
    if (stored) {
      try {
        const q: DailyQuestion = JSON.parse(stored);
        // Check if question is still valid (less than 24 hours old)
        const postedTime = new Date(q.postedAt).getTime();
        const now = Date.now();
        const hoursDiff = (now - postedTime) / (1000 * 60 * 60);
        if (hoursDiff < 24) {
          setDailyQuestion(q);
        } else {
          // Question expired, remove it
          localStorage.removeItem("daily_question");
        }
      } catch {}
    }

    // Load answers
    const storedAnswers = localStorage.getItem("daily_question_answers");
    if (storedAnswers) {
      try {
        const allAnswers: Answer[] = JSON.parse(storedAnswers);
        setAnswers(allAnswers);
      } catch {}
    }

    // Check if user already submitted
    const alreadySubmitted = localStorage.getItem("daily_question_submitted");
    if (alreadySubmitted === "true") {
      setSubmitted(true);
    }
  }, []);

  const handleSubmitAnswer = () => {
    if (!name.trim() || !answerText.trim() || !dailyQuestion) return;

    const newAnswer: Answer = {
      id: `ans-${Date.now()}`,
      questionId: dailyQuestion.id,
      name: name.trim(),
      answer: answerText.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    localStorage.setItem("daily_question_answers", JSON.stringify(updatedAnswers));
    localStorage.setItem("daily_question_submitted", "true");
    setSubmitted(true);
    setName("");
    setAnswerText("");
  };

  // Calculate time remaining
  const getTimeRemaining = () => {
    if (!dailyQuestion) return "";
    const postedTime = new Date(dailyQuestion.postedAt).getTime();
    const expiryTime = postedTime + 24 * 60 * 60 * 1000;
    const remaining = expiryTime - Date.now();
    if (remaining <= 0) return "Expired";
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  if (!dailyQuestion) return null;

  const relevantAnswers = answers.filter((a) => a.questionId === dailyQuestion.id);

  return (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl shadow-lg border-2 border-amber-200 p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/40 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200/40 to-transparent rounded-tr-full" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <Trophy className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-900">🏆 Question of the Day</h2>
              <p className="text-xs text-amber-600">
                Posted by {dailyQuestion.postedBy}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1.5 rounded-full">
            <Clock size={14} className="text-amber-600" />
            <span className="text-xs font-semibold text-amber-700">{getTimeRemaining()}</span>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl p-5 mb-5 shadow-sm border border-amber-100">
          <p className="text-lg font-semibold text-gray-800 leading-relaxed">
            {dailyQuestion.question}
          </p>
        </div>

        {/* Answer Section */}
        {!submitted ? (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-amber-100">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <MessageCircle size={16} /> Write Your Answer
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Your Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    maxLength={50}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Your Answer *
                </label>
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Write your answer here..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                  maxLength={500}
                />
              </div>
              <button
                onClick={handleSubmitAnswer}
                disabled={!name.trim() || !answerText.trim()}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} /> Submit Answer
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
            <p className="text-green-700 font-semibold">✅ Your answer has been submitted!</p>
          </div>
        )}

        {/* Answers List */}
        {relevantAnswers.length > 0 && (
          <div className="mt-5">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <MessageCircle size={16} /> Answers ({relevantAnswers.length})
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {relevantAnswers.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {a.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-sm text-gray-700">
                        {a.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(a.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 pl-10">{a.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuestionOfTheDay;
