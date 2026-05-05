import { Link } from "react-router-dom";
import { oldIsGoldSets } from "@/data/questions";
import { Search, ChevronRight, Calendar, FileText, Award, BookOpen } from "lucide-react";
import { useState } from "react";

const OldIsGold = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSets = oldIsGoldSets.filter(set =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSetNumber = (id: string): number => {
    const parts = id.split("-");
    return parts.length === 2 ? parseInt(parts[1]) || 0 : 0;
  };

  // Clean, professional color palette
  const getCardColor = (setNumber: number) => {
    if (setNumber >= 75) return "border-indigo-200 bg-indigo-50 hover:bg-indigo-100";
    if (setNumber <= 10) return "border-blue-200 bg-blue-50 hover:bg-blue-100";
    if (setNumber <= 30) return "border-emerald-200 bg-emerald-50 hover:bg-emerald-100";
    if (setNumber <= 50) return "border-amber-200 bg-amber-50 hover:bg-amber-100";
    return "border-slate-200 bg-slate-50 hover:bg-slate-100";
  };

  const getBadgeColor = (setNumber: number) => {
    if (setNumber >= 75) return "bg-indigo-600";
    if (setNumber <= 10) return "bg-blue-600";
    if (setNumber <= 30) return "bg-emerald-600";
    if (setNumber <= 50) return "bg-amber-600";
    return "bg-slate-600";
  };

  const getYearColor = (setNumber: number) => {
    if (setNumber >= 75) return "text-indigo-600";
    if (setNumber <= 10) return "text-blue-600";
    if (setNumber <= 30) return "text-emerald-600";
    if (setNumber <= 50) return "text-amber-600";
    return "text-slate-600";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Old is Gold
          </h1>
          <p className="text-gray-500 mb-4">
            पुराना प्रश्नपत्रहरू अभ्यास गर्नुहोस्
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 text-sm text-gray-600">
              <span>📚</span>
              <span>{oldIsGoldSets.length} प्रश्नपत्रहरू</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 text-sm text-gray-600">
              <span>❓</span>
              <span>3,700+ प्रश्नहरू</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="प्रश्नपत्र खोज्नुहोस्..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
          {searchTerm && (
            <div className="text-center mt-2 text-sm text-gray-500">
              {filteredSets.length} वटा प्रश्नपत्र फेला पर्यो
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{oldIsGoldSets.length}</div>
            <div className="text-xs text-gray-500 mt-1">कुल सेटहरू</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-emerald-600">3,700+</div>
            <div className="text-xs text-gray-500 mt-1">कुल प्रश्नहरू</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-indigo-600">74</div>
            <div className="text-xs text-gray-500 mt-1">परीक्षा सेट</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-amber-600">3</div>
            <div className="text-xs text-gray-500 mt-1">बोनस सेट</div>
          </div>
        </div>

        {/* Sets Grid - All 77 Sets Shown at Once */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSets.map((set) => {
            const setNumber = getSetNumber(set.id);
            const cardColor = getCardColor(setNumber);
            const badgeColor = getBadgeColor(setNumber);
            const yearColor = getYearColor(setNumber);
            
            return (
              <Link
                key={set.id}
                to={`/quiz/old-is-gold/${set.id}`}
                className={`block rounded-xl border ${cardColor} p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
              >
                {/* Set Number */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`${badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                    Set {setNumber}
                  </span>
                  {setNumber >= 75 && (
                    <span className="text-amber-600 text-xs font-medium">⭐ बोनस</span>
                  )}
                </div>
                
                {/* Title */}
                <h3 className="font-semibold text-gray-800 text-sm mb-2 min-h-[42px] line-clamp-2">
                  {set.title}
                </h3>
                
                {/* Year and Questions */}
                <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-gray-200">
                  <span className={`flex items-center gap-1 ${yearColor}`}>
                    <Calendar size={12} />
                    {set.year}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <FileText size={12} />
                    {setNumber >= 75 ? "100+" : "50"} प्रश्न
                  </span>
                </div>

                {/* Start Button */}
                <div className="mt-3 text-right">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:gap-2 transition-all">
                    अभ्यास गर्नुहोस् <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-gray-500">कुनै प्रश्नपत्र फेला परेन</p>
            <button 
              onClick={() => setSearchTerm("")} 
              className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-gray-400 border-t border-gray-200 pt-6">
          📖 नियमित अभ्यासले मात्र सफलता प्राप्त गर्न सकिन्छ
        </div>
      </div>
    </div>
  );
};

export default OldIsGold;
