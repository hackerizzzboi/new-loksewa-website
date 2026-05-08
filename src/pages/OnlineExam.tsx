import { Link } from "react-router-dom";

const OnlineExam = () => {
  // Create exam data for 15 exams (English names)
  const exams = [
    { id: 1, number: "1", name: "1st Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-blue-500 to-cyan-500", bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50" },
    { id: 2, number: "2", name: "2nd Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-indigo-500 to-purple-500", bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50" },
    { id: 3, number: "3", name: "3rd Exam", titleNp: "Operator Sample Exam 2082", questions: 30, time: 45, marks: 60, color: "from-purple-500 to-pink-500", bgColor: "bg-gradient-to-br from-purple-50 to-pink-50" },
    { id: 4, number: "4", name: "4th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-pink-500 to-rose-500", bgColor: "bg-gradient-to-br from-pink-50 to-rose-50" },
    { id: 5, number: "5", name: "5th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-red-500 to-orange-500", bgColor: "bg-gradient-to-br from-red-50 to-orange-50" },
    { id: 6, number: "6", name: "6th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-orange-500 to-amber-500", bgColor: "bg-gradient-to-br from-orange-50 to-amber-50" },
    { id: 7, number: "7", name: "7th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-amber-500 to-yellow-500", bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50" },
    { id: 8, number: "8", name: "8th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-yellow-500 to-lime-500", bgColor: "bg-gradient-to-br from-yellow-50 to-lime-50" },
    { id: 9, number: "9", name: "9th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-lime-500 to-green-500", bgColor: "bg-gradient-to-br from-lime-50 to-green-50" },
    { id: 10, number: "10", name: "10th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-green-500 to-emerald-500", bgColor: "bg-gradient-to-br from-green-50 to-emerald-50" },
    { id: 11, number: "11", name: "11th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-emerald-500 to-teal-500", bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50" },
    { id: 12, number: "12", name: "12th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-teal-500 to-cyan-500", bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50" },
    { id: 13, number: "13", name: "13th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-cyan-500 to-sky-500", bgColor: "bg-gradient-to-br from-cyan-50 to-sky-50" },
    { id: 14, number: "14", name: "14th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-sky-500 to-blue-500", bgColor: "bg-gradient-to-br from-sky-50 to-blue-50" },
    { id: 15, number: "15", name: "15th Exam", titleNp: "Operator Sample Exam 2082", questions: 50, time: 45, marks: 100, color: "from-blue-500 to-indigo-500", bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50" },
  ];

  // Quiz data for 4 quizzes
  const quizzes = [
    { id: 1, number: "1", name: "1st Quiz", titleNp: "Public Management Quiz", questions: 25, time: 15, marks: 25, color: "from-orange-500 to-red-500", bgColor: "bg-gradient-to-br from-orange-50 to-red-50" },
    { id: 2, number: "2", name: "2nd Quiz", titleNp: "Public Management Quiz", questions: 25, time: 15, marks: 25, color: "from-red-500 to-rose-500", bgColor: "bg-gradient-to-br from-red-50 to-rose-50" },
    { id: 3, number: "3", name: "3rd Quiz", titleNp: "Public Management Quiz", questions: 25, time: 15, marks: 25, color: "from-rose-500 to-pink-500", bgColor: "bg-gradient-to-br from-rose-50 to-pink-50" },
    { id: 4, number: "4", name: "4th Quiz", titleNp: "Public Management Quiz", questions: 25, time: 15, marks: 25, color: "from-pink-500 to-purple-500", bgColor: "bg-gradient-to-br from-pink-50 to-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">📝 Online Exam</h1>
          <p className="text-gray-500">Participate in weekly exams and check your preparation.</p>
        </div>

        {/* Operator Sample Exam Section - 15 Exams */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 mb-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center">📋 Operator Sample Exam 2082</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer"
              >
                <div className="flex items-start gap-3 p-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${exam.color} flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition`}>
                    {exam.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{exam.name}</h3>
                    <p className="text-gray-400 text-xs">{exam.titleNp}</p>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">📝 Questions:</span>
                      <span className="font-semibold text-gray-800">{exam.questions}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">⏱️ Time:</span>
                      <span className="font-semibold text-gray-800">{exam.time} minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">🏆 Marks:</span>
                      <span className="font-semibold text-gray-800">{exam.marks}</span>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-2 text-xs text-amber-700 text-center mb-4">
                    ⚠️ Can take exam only once. Do not refresh page after Start.
                  </div>
                  
                  <Link
                    to={`/quiz/online-exam/exam-${exam.id}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
                  >
                    🚀 Start
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Public Management Quiz Section - 4 Quizzes */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 mb-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center">📋 Public Management Quiz</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer"
              >
                <div className="flex items-start gap-3 p-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${quiz.color} flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition`}>
                    {quiz.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{quiz.name}</h3>
                    <p className="text-gray-400 text-xs">{quiz.titleNp}</p>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">📝 Questions:</span>
                      <span className="font-semibold text-gray-800">{quiz.questions}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">⏱️ Time:</span>
                      <span className="font-semibold text-gray-800">{quiz.time} minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">🏆 Marks:</span>
                      <span className="font-semibold text-gray-800">{quiz.marks}</span>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-2 text-xs text-amber-700 text-center mb-4">
                    ⚠️ Topic-wise practice. Click Start to begin.
                  </div>
                  
                  <Link
                    to={`/quiz/online-exam/quiz-${quiz.id}`}
                    className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
                  >
                    ✨ Start
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            💡 Think carefully before answering. All questions are mandatory. Best of luck!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineExam;
