import { Link } from "react-router-dom";
import { oldIsGoldSets } from "@/data/questions";
import { Calendar, FileQuestion, Star, TrendingUp } from "lucide-react";
import { useState } from "react";

const OldIsGold = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSets = oldIsGoldSets.filter(set =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to determine gradient based on set type
  const getCardGradient = (id: number) => {
    if (id >= 75) return "from-purple-50 to-indigo-50 border-purple-200";
    if (id <= 10) return "from-blue-50 to-cyan-50 border-blue-200";
    return "from-white to-gray-50 border-gray-200";
  };

  const getBadgeColor = (id: number) => {
    if (id >= 75) return "bg-gradient-to-r from-purple-600 to-indigo-600";
    if (id <= 10) return "bg-gradient-to-r from-blue-600 to-cyan-600";
    return "bg-gradient-to-r from-gray-700 to-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg mb-5">
            <TrendingUp size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
            🏆 Old is Gold — Past PSC Papers
          </h1>
          <p className="text-slate-500 text-lg">पुराना प्रश्नपत्रहरू अभ्यास गर्नुहोस्</p>
          <div className="inline-block mt-3 px-4 py-1.5 bg-slate-100 rounded-full text-sm text-slate-600">
            📚 कुल {oldIsGoldSets.length} वटा प्रश्नपत्रहरू उपलब्ध
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 प्रश्नपत्र खोज्नुहोस्... (नाम वा वर्ष)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pl-12 rounded-xl border border-slate-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-sm transition-all"
            />
          </div>
          {searchTerm && (
            <div className="text-center mt-2 text-sm text-slate-500">
              {filteredSets.length} वटा प्रश्नपत्र फेला पर्यो
            </div>
          )}
        </div>

        {/* Sets Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSets.map((set) => (
            <Link
              key={set.id}
              to={`/quiz/old-is-gold/${set.id}`}
              className={`group bg-gradient-to-br ${getCardGradient(parseInt(set.id.split("-")[1]))} rounded-xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1`}
            >
              <div className="p-5">
                {/* Set Number Badge */}
                <div className="flex justify-between items-start mb-3">
                  <div className={`${getBadgeColor(parseInt(set.id.split("-")[1]))} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                    Set {set.id.split("-")[1]}
                  </div>
                  {set.isBonus && (
                    <div className="flex items-center gap-1 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                      <Star size={12} /> Bonus
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className={`font-bold text-slate-800 mb-2 line-clamp-2 ${set.isBonus ? 'text-purple-700' : 'text-slate-800'}`}>
                  {set.title}
                </h3>

                {/* Year and Questions Row */}
                <div className="flex items-center gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-1.5 text-slate-500 bg-white/60 px-2 py-1 rounded-lg">
                    <Calendar size={14} className="text-blue-500" />
                    <span className="font-medium">{set.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 bg-white/60 px-2 py-1 rounded-lg">
                    <FileQuestion size={14} className="text-green-500" />
                    <span className="font-medium">{set.isBonus ? "100+" : "50"} Questions</span>
                  </div>
                </div>

                {/* Start Button */}
                <div className="mt-2">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:text-blue-700 group-hover:gap-3 transition-all">
                    Start Practice →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredSets.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-slate-500 text-lg">कुनै प्रश्नपत्र फेला परेन</p>
            <button 
              onClick={() => setSearchTerm("")} 
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200 text-center text-sm text-slate-400">
          <p>📖 पुराना प्रश्नपत्रहरूको नियमित अभ्यासले सफलताको ढोका खोल्छ</p>
        </div>
      </div>
    </div>
  );
};

export default OldIsGold;
