import { Link } from "react-router-dom";
import { oldIsGoldSets } from "@/data/questions";
import { Calendar, FileQuestion, Search, TrendingUp, ChevronRight, Award, Sparkles } from "lucide-react";
import { useState } from "react";

const OldIsGold = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSets = oldIsGoldSets.filter(set =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get set number safely
  const getSetNumber = (id: string): number => {
    const parts = id.split("-");
    if (parts.length === 2) {
      return parseInt(parts[1]) || 0;
    }
    return 0;
  };

  // Color schemes for different set ranges
  const getSetColors = (setNumber: number) => {
    if (setNumber >= 75) return { bg: "from-purple-500 to-indigo-600", badge: "bg-purple-100 text-purple-700", border: "border-purple-200", hover: "hover:border-purple-300" };
    if (setNumber >= 1 && setNumber <= 10) return { bg: "from-blue-500 to-cyan-600", badge: "bg-blue-100 text-blue-700", border: "border-blue-200", hover: "hover:border-blue-300" };
    if (setNumber <= 30) return { bg: "from-emerald-500 to-teal-600", badge: "bg-emerald-100 text-emerald-700", border: "border-emerald-200", hover: "hover:border-emerald-300" };
    if (setNumber <= 50) return { bg: "from-orange-500 to-amber-600", badge: "bg-orange-100 text-orange-700", border: "border-orange-200", hover: "hover:border-orange-300" };
    return { bg: "from-slate-500 to-gray-600", badge: "bg-slate-100 text-slate-700", border: "border-slate-200", hover: "hover:border-slate-300" };
  };

  // Clean title (remove year from end if present)
  const cleanTitle = (title: string): string => {
    // Remove year patterns like " २०७३", " 2075", " २०७९-०२-१५" from end
    return title.replace(/\s+\d{4}(?:-\d{2}-\d{2})?$/, '').replace(/\s+२०७[0-9](?:-?\d{2}-?\d{2})?$/, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        <div className="container mx-auto px-4 py-12 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur rounded-2xl mb-6">
            <Award size={40} className="text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            🏆 Old is Gold
          </h1>
          <p className="text-blue-200 text-lg mb-4">पुराना प्रश्नपत्रहरू अभ्यास गर्नुहोस्</p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm">
            <Sparkles size={16} className="text-yellow-400" />
            <span>कुल {oldIsGoldSets.length} वटा प्रश्नपत्रहरू उपलब्ध</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Section */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="🔍 प्रश्नपत्र खोज्नुहोस्... (नाम वा वर्ष)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white shadow-md transition-all"
            />
          </div>
          {searchTerm && (
            <div className="text-center mt-3 text-sm text-slate-500">
              {filteredSets.length} वटा प्रश्नपत्र फेला पर्यो
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-slate-100">
            <div className="text-2xl font-bold text-blue-600">{oldIsGoldSets.length}</div>
            <div className="text-xs text-slate-500">Total Sets</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-slate-100">
            <div className="text-2xl font-bold text-emerald-600">3,700+</div>
            <div className="text-xs text-slate-500">Total Questions</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-slate-100">
            <div className="text-2xl font-bold text-purple-600">74</div>
            <div className="text-xs text-slate-500">Exam Sets</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-slate-100">
            <div className="text-2xl font-bold text-amber-600">3</div>
            <div className="text-xs text-slate-500">Bonus Sets</div>
          </div>
        </div>

        {/* Sets Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSets.map((set) => {
            const setNumber = getSetNumber(set.id);
            const colors = getSetColors(setNumber);
            const cleanedTitle = cleanTitle(set.title);
            
            return (
              <Link
                key={set.id}
                to={`/quiz/old-is-gold/${set.id}`}
                className={`group bg-white rounded-xl border ${colors.border} ${colors.hover} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1`}
              >
                {/* Colored Top Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${colors.bg}`}></div>
                
                <div className="p-5">
                  {/* Header with Set Number */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`${colors.badge} text-xs font-bold px-2.5 py-1 rounded-full`}>
                      Set {setNumber}
                    </div>
                    {set.isBonus && (
                      <div className="flex items-center gap-1 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                        <Sparkles size={10} /> Bonus
                      </div>
                    )}
                  </div>

                  {/* Title - Clean without year */}
                  <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 min-h-[48px] text-sm">
                    {cleanedTitle}
                  </h3>

                  {/* Year and Questions */}
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Calendar size={14} className="text-blue-500" />
                      <span className="font-medium text-slate-600">वर्ष: {set.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <FileQuestion size={14} className="text-emerald-500" />
                      <span className="font-medium text-slate-600">{set.isBonus ? "100+" : "50"} प्रश्नहरू</span>
                    </div>
                  </div>

                  {/* Start Button */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-400">पूर्ण अभ्यासको लागि</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                      Start Practice <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-slate-500 text-lg">कुनै प्रश्नपत्र फेला परेन</p>
            <button 
              onClick={() => setSearchTerm("")} 
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
            >
              Clear Search <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
            <span>📖</span> नियमित अभ्यासले मात्र सफलता प्राप्त गर्न सकिन्छ
            <span>🎯</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OldIsGold;
