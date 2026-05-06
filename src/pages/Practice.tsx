import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, BookOpen, Database, Network, Lock, Wrench,
  Globe, Presentation, FileText, Calculator, Laptop,
  Users, Award, Star, TrendingUp, ChevronRight,
  Mountain, Landmark, Microscope, Scale, Compass,
  History, CloudRain, Newspaper, Dice6
} from "lucide-react";
import QuestionSelector from "@/components/QuestionSelector";

const Practice = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSelector, setShowSelector] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<{id: string, name: string, total: number} | null>(null);

  // Get total questions for each subject
  const getTotalQuestions = (subjectId: string): number => {
    const totals: Record<string, number> = {
      "general-awareness": 20,
      "public-management": 20,
      "computer-fundamentals": 958,
      "operating-system": 20,
      "word-processor": 20,
      "spreadsheet": 20,
      "dbms": 20,
      "presentation": 20,
      "web-design": 20,
      "networking": 20,
      "cyber-security": 20,
      "hardware": 20,
      "legislation": 20,
      "gk-nepal-geography": 100,
      "gk-nepal-history": 120,
      "gk-international-org": 80,
      "gk-science-tech": 100,
      "gk-constitution": 90,
      "gk-world-geography": 100,
      "gk-world-history": 80,
      "gk-environment": 70,
      "gk-current-affairs": 150,
      "gk-random-mock": 100,
    };
    return totals[subjectId] || 20;
  };

  const handleStartPractice = (subjectId: string, subjectName: string) => {
    const total = getTotalQuestions(subjectId);
    setSelectedSubject({ id: subjectId, name: subjectName, total });
    setShowSelector(true);
  };

  const handleQuestionSelect = (count: number) => {
    if (selectedSubject) {
      navigate(`/quiz/practice/${selectedSubject.id}?count=${count}&title=${encodeURIComponent(selectedSubject.name)}`);
    }
  };

  // Computer Operator Subjects (13 Subjects)
  const computerOperatorSubjects = [
    { id: "general-awareness", title: "General Awareness", titleNp: "सामान्य ज्ञान", icon: <Globe size={20} />, color: "from-orange-500 to-red-500" },
    { id: "public-management", title: "Public Management", titleNp: "सार्वजनिक व्यवस्थापन", icon: <Users size={20} />, color: "from-purple-500 to-pink-500" },
    { id: "computer-fundamentals", title: "Computer Fundamentals", titleNp: "कम्प्युटर आधारभूत", icon: <Laptop size={20} />, color: "from-blue-500 to-cyan-500" },
    { id: "operating-system", title: "Operating System", icon: <Shield size={20} />, color: "from-teal-500 to-green-500" },
    { id: "word-processor", title: "Word Processor", icon: <FileText size={20} />, color: "from-red-500 to-orange-500" },
    { id: "spreadsheet", title: "Electronic Spreadsheet", icon: <Calculator size={20} />, color: "from-green-500 to-emerald-500" },
    { id: "dbms", title: "Database Management System", icon: <Database size={20} />, color: "from-pink-500 to-rose-500" },
    { id: "presentation", title: "Presentation System", icon: <Presentation size={20} />, color: "from-amber-500 to-yellow-500" },
    { id: "web-design", title: "Web Designing & Social Media", icon: <Globe size={20} />, color: "from-cyan-500 to-blue-500" },
    { id: "networking", title: "Computer Network", icon: <Network size={20} />, color: "from-indigo-500 to-purple-500" },
    { id: "cyber-security", title: "Cyber Security", icon: <Lock size={20} />, color: "from-red-600 to-red-800" },
    { id: "hardware", title: "Hardware Maintenance", icon: <Wrench size={20} />, color: "from-gray-600 to-gray-800" },
    { id: "legislation", title: "Related Legislations", titleNp: "सम्बन्धित कानून", icon: <BookOpen size={20} />, color: "from-purple-600 to-indigo-600" },
  ];

  // GK Subjects
  const gkSubjects = [
    { id: "gk-nepal-geography", title: "नेपालको भूगोल", description: "हिमाल, पहाड, तराई, नदी, जलवायु, प्रदेशहरू", emoji: "🗺️", color: "from-emerald-500 to-teal-500", gradient: "from-green-600 to-emerald-600" },
    { id: "gk-nepal-history", title: "नेपालको इतिहास, संस्कृति र सामाजिक अवस्था", description: "प्राचीन, मध्यकालीन, आधुनिक इतिहास, संस्कृति, जातजाति", emoji: "🗿", color: "from-amber-500 to-orange-500", gradient: "from-amber-600 to-orange-600" },
    { id: "gk-international-org", title: "अन्तर्राष्ट्रिय संघ-संस्था", description: "संयुक्त राष्ट्र, विश्व बैंक, IMF, WTO, SAARC, BRICS", emoji: "🤝", color: "from-blue-500 to-cyan-500", gradient: "from-blue-600 to-cyan-600" },
    { id: "gk-science-tech", title: "विज्ञान तथा प्रविधि", description: "भौतिक, रसायन, जीवविज्ञान, अन्तरिक्ष, आईसीटी, स्वास्थ्य", emoji: "🔬", color: "from-purple-500 to-pink-500", gradient: "from-purple-600 to-pink-600" },
    { id: "gk-constitution", title: "नेपालको संविधान", description: "धारा, भाग, अधिकार, कर्तव्य, राज्य संरचना, अङ्ग", emoji: "⚖️", color: "from-red-500 to-orange-500", gradient: "from-red-600 to-orange-600" },
    { id: "gk-world-geography", title: "विश्वको भूगोल", description: "महादेश, महासागर, देश, राजधानी, झण्डा, मुद्रा", emoji: "🌍", color: "from-cyan-500 to-blue-500", gradient: "from-cyan-600 to-blue-600" },
    { id: "gk-world-history", title: "विश्वको इतिहास", description: "प्राचीन सभ्यता, विश्वयुद्ध, महत्वपूर्ण घटनाहरू", emoji: "⏳", color: "from-slate-500 to-gray-500", gradient: "from-slate-600 to-gray-600" },
    { id: "gk-environment", title: "वातावरण र जलवायु परिवर्तन", description: "पर्यावरण, संरक्षण, प्राकृतिक प्रकोप, कार्बन उत्सर्जन", emoji: "🌿", color: "from-green-500 to-emerald-500", gradient: "from-green-600 to-emerald-600" },
    { id: "gk-current-affairs", title: "राष्ट्रिय तथा अन्तर्राष्ट्रिय समसामयिक घटनाक्रम", description: "हालैका घटना, नीति, पुरस्कार, खेलकुद, राजनीति", emoji: "📰", color: "from-yellow-500 to-orange-500", gradient: "from-yellow-600 to-orange-600" },
    { id: "gk-random-mock", title: "Random GK Mock Test", description: "सबै विषय समावेश यादृच्छिक परीक्षा", emoji: "🎲", color: "from-indigo-500 to-purple-500", gradient: "from-indigo-600 to-purple-600" },
  ];

  // Important Sets
  const importantSets = [
    { id: "old-is-gold", title: "पुराना प्रश्नपत्रहरू", description: "विगतका परीक्षामा सोधिएका प्रश्नहरू", icon: "🏆", color: "from-amber-500 to-orange-500", link: "/old-is-gold" },
    { id: "weekly-test", title: "साप्ताहिक परीक्षा", description: "हप्तागत अभ्यास परीक्षा", icon: "📝", color: "from-blue-500 to-cyan-500", link: "/online-exam" },
    { id: "abbreviations", title: "महत्त्वपूर्ण संक्षिप्त रुप", description: "कम्प्युटर, प्रशासन, विज्ञान सम्बन्धी", icon: "📋", questions: "100+", color: "from-purple-500 to-pink-500", link: "/quiz/old-is-gold/set-75" },
    { id: "shortcuts", title: "किबोर्ड सर्टकट", description: "विन्डोज, MS Office, महत्त्वपूर्ण सर्टकट", icon: "⌨️", questions: "100+", color: "from-green-500 to-emerald-500", link: "/quiz/old-is-gold/set-76" },
    { id: "excel-formulas", title: "एक्सेल प्रकार्यहरू", description: "महत्त्वपूर्ण Excel फर्मुला र प्रकार्य", icon: "📊", questions: "75+", color: "from-red-500 to-orange-500", link: "/quiz/old-is-gold/set-77" },
  ];

  const filteredSubjects = computerOperatorSubjects.filter(subject =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subject.titleNp && subject.titleNp.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredGK = gkSubjects.filter(subject =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSets = importantSets.filter(set =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Practice — Subject-wise MCQs</h1>
            <p className="text-gray-500">विषय अनुसार अभ्यास गर्नुहोस्</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 विषय खोज्नुहोस्..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-5 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Computer Operator Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">💻 Computer Operator</h2>
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{computerOperatorSubjects.length} विषयहरू</span>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSubjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleStartPractice(subject.id, subject.title)}
                  className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 w-full text-left cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{subject.title}</h3>
                      {subject.titleNp && <p className="text-gray-400 text-xs">{subject.titleNp}</p>}
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* GK Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">📚 सामान्य ज्ञान <span className="text-lg font-normal text-gray-500">सबै परीक्षाका लागि</span></h2>
                <p className="text-gray-400 text-sm mt-1">लोकसेवा, वैंकिङ, प्रहरी, सेना, शिक्षक सेवा लगायत सबै परीक्षाको तयारी</p>
              </div>
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{gkSubjects.length} सेटहरू</span>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredGK.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleStartPractice(subject.id, subject.title)}
                  className="group bg-white rounded-xl p-4 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden relative w-full text-left cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${subject.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl group-hover:scale-110 transition">{subject.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-sm">{subject.title}</h3>
                        <p className="text-gray-400 text-[10px] mt-0.5 line-clamp-2">{subject.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                      <span className="text-orange-400 text-xs group-hover:translate-x-1 transition">अभ्यास गर्नुहोस् →</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Important Sets Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">⭐ Important Sets</h2>
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{importantSets.length} सेटहरू</span>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {filteredSets.map((set) => (
                <a
                  key={set.id}
                  href={set.link}
                  className="group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 block text-center cursor-pointer"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition">{set.icon}</div>
                  <h3 className="font-semibold text-gray-800 text-sm">{set.title}</h3>
                  <p className="text-gray-400 text-[10px] mt-1 line-clamp-2">{set.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Stats Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>कम्प्युटर अपरेटर: {computerOperatorSubjects.length} विषयहरू</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>सामान्य ज्ञान: {gkSubjects.length} सेटहरू</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>महत्त्वपूर्ण सेटहरू: {importantSets.length} सेटहरू</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Selector Modal */}
      {showSelector && selectedSubject && (
        <QuestionSelector
          totalQuestions={selectedSubject.total}
          subjectName={selectedSubject.name}
          onSelect={handleQuestionSelect}
          onClose={() => setShowSelector(false)}
        />
      )}
    </>
  );
};

export default Practice;
