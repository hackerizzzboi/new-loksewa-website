import { Link } from "react-router-dom";

const OnlineExam = () => {
  // Create exam data for 15 exams
  const exams = [
    { id: 1, number: "1", name: "1st Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 2, number: "2", name: "2nd Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 3, number: "3", name: "3rd Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 4, number: "4", name: "4th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 5, number: "5", name: "5th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 6, number: "6", name: "6th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 7, number: "7", name: "7th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 8, number: "8", name: "8th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 9, number: "9", name: "9th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 10, number: "10", name: "10th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 11, number: "11", name: "11th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 12, number: "12", name: "12th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 13, number: "13", name: "13th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 14, number: "14", name: "14th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
    { id: 15, number: "15", name: "15th Exam", title: "Operator Model Exam 2082", questions: 50, time: 45, marks: 50 },
  ];

  // Create quiz data for 4 quizzes
  const quizzes = [
    { id: 1, number: "1", name: "1st Quiz", title: "Public Administration Quiz", questions: 25, time: 15, marks: 25 },
    { id: 2, number: "2", name: "2nd Quiz", title: "Public Administration Quiz", questions: 25, time: 15, marks: 25 },
    { id: 3, number: "3", name: "3rd Quiz", title: "Public Administration Quiz", questions: 25, time: 15, marks: 25 },
    { id: 4, number: "4", name: "4th Quiz", title: "Public Administration Quiz", questions: 25, time: 15, marks: 25 },
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
          <p className="text-gray-500">Take weekly exams and check your preparation.</p>
        </div>

        {/* First Section - Operator Model Exam 2082 */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 mb-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center">Operator Model Exam 2082</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {exams.map((exam) => (
              <div key={exam.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Number Circle */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition">
                      {exam.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{exam.name}</h3>
                      <p className="text-gray-400 text-xs mt-0.5">{exam.title}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                    <p className="text-gray-600">📌 <span className="font-medium">You can take this exam only once.</span></p>
                    <p className="text-gray-600">⏱️ <span className="font-medium">Timer starts when you click Start.</span></p>
                    <p className="text-gray-600">⚠️ <span className="font-medium">Do not refresh or go back.</span></p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                    <div className="bg-blue-50 rounded-lg p-2 text-center">
                      <span className="font-bold text-blue-600">Questions: {exam.questions}</span>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2 text-center">
                      <span className="font-bold text-green-600">Time: {exam.time} min</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/quiz/online-exam/exam-${exam.id}`} 
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-bold mt-4 hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Start Exam →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Section - Public Administration Quiz */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 mb-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center">Public Administration Quiz</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Number Circle */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition">
                      {quiz.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{quiz.name}</h3>
                      <p className="text-gray-400 text-xs mt-0.5">{quiz.title}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                    <p className="text-gray-600">📌 <span className="font-medium">Topic-based practice</span></p>
                    <p className="text-gray-600">⏱️ <span className="font-medium">Time: {quiz.time} minutes</span></p>
                    <p className="text-gray-600">⚠️ <span className="font-medium">Starts when you click Start</span></p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                    <div className="bg-purple-50 rounded-lg p-2 text-center">
                      <span className="font-bold text-purple-600">Questions: {quiz.questions}</span>
                    </div>
                    <div className="bg-pink-50 rounded-lg p-2 text-center">
                      <span className="font-bold text-pink-600">Marks: {quiz.marks}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/quiz/online-exam/quiz-${quiz.id}`} 
                    className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-3 rounded-lg font-bold mt-4 hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Start Quiz →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
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
