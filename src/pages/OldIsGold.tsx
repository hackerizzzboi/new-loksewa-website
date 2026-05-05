import { Link } from "react-router-dom";
import { oldIsGoldSets } from "@/data/questions";
import { Search, ChevronRight, Calendar, FileText, Award, BookOpen, Flame, Sparkles, Target, Zap } from "lucide-react";
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

  const getCardGradient = (setNumber: number) => {
    if (setNumber >= 75) return "from-red-600 to-red-800";
    if (setNumber <= 10) return "from-red-500 to-red-700";
    if (setNumber <= 30) return "from-red-600 to-rose-700";
    if (setNumber <= 50) return "from-red-500 to-red-800";
    return "from-red-600 to-red-900";
  };

  const getBadgeStyle = (setNumber: number) => {
    if (setNumber >= 75) return "bg-gradient-to-r from-red-600 to-red-800";
    if (setNumber <= 10) return "bg-gradient-to-r from-red-500 to-red-700";
    if (setNumber <= 30) return "bg-gradient-to-r from-red-600 to-rose-700";
    if (setNumber <= 50) return "bg-gradient-to-r from-red-500 to-red-800";
    return "bg-gradient-to-r from-red-600 to-red-900";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-2xl mb-5">
            <Flame size={40} className="text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-3">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              OLD IS GOLD
            </span>
          </h1>
          <p className="text-lg text-white/90 mb-5 font-medium">
            🔥 पुराना प्रश्नपत्रहरू अभ्यास गर्नुहोस् 🔥
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur rounded-full px-4 py-1.5 border border-yellow-500/50">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-white font-semibold text-sm">{oldIsGoldSets.length} प्रश्नपत्रहरू</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur rounded-full px-4 py-1.5 border border-yellow-500/50">
              <Target size={16} className="text-yellow-400" />
              <span className="text-white font-semibold text-sm">3,700+ प्रश्नहरू</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-purple-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform">
            <div className="text-2xl font-black text-white">{oldIsGoldSets.length}</div>
            <div className="text-xs text-white/80 font-medium mt-1">कुल सेटहरू</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform">
            <div className="text-2xl font-black text-white">3,700+</div>
            <div className="text-xs text-white/80 font-medium mt-1">कुल प्रश्नहरू</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform">
            <div className="text-2xl font-black text-white">74</div>
            <div className="text-xs text-white/80 font-medium mt-1">परीक्षा सेट</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform">
            <div className="text-2xl font-black text-white">3</div>
            <div className="text-xs text-white/80 font-medium mt-1">बोनस सेट</div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
            <input
              type="text"
              placeholder="🔍 प्रश्नपत्र खोज्नुहोस्..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-purple-200 text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 font-medium"
            />
          </div>
          {searchTerm && (
            <div className="text-center mt-2 text-sm text-purple-600 font-medium">
              🔥 {filteredSets.length} वटा प्रश्नपत्र फेला पर्यो 🔥
            </div>
          )}
        </div>

        {/* Sets Grid - Cards with Red Top Border */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSets.map((set, idx) => {
            const setNumber = getSetNumber(set.id);
            const cardGradient = getCardGradient(setNumber);
            const badgeStyle = getBadgeStyle(setNumber);
            
            return (
              <Link
                key={set.id}
                to={`/quiz/old-is-gold/${set.id}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Red Top Bar */}
                <div className={`h-2 bg-gradient-to-r ${cardGradient}`}></div>
                
                <div className="p-5">
                  {/* Set Number and Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Zap size={14} className="text-purple-600" />
                      </div>
                      <span className={`${badgeStyle} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm`}>
                        Set {setNumber}
                      </span>
                    </div>
                    {setNumber >= 75 && (
                      <div className="flex items-center gap-1 bg-yellow-500 text-black font-bold text-xs px-2 py-0.5 rounded-full">
                        <Sparkles size={10} /> BONUS
                      </div>
                    )}
                  </div>

                  {/* Title - BIGGER FONT */}
                  <h3 className="font-bold text-gray-800 text-base md:text-lg mb-2 min-h-[56px] leading-relaxed">
                    {set.title}
                  </h3>

                  {/* Year & Questions */}
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-purple-600 font-semibold bg-purple-50 px-2 py-1 rounded-lg">
                      <Calendar size={14} />
                      <span>{set.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                      <FileText size={14} />
                      <span>{setNumber >= 75 ? "100+" : "50"} प्रश्न</span>
                    </div>
                  </div>

                  {/* Start Button */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">अभ्यास गर्नुहोस्</span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-purple-600 group-hover:gap-2 group-hover:text-purple-700 transition-all">
                      START NOW <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-purple-200">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-gray-500 text-lg">कुनै प्रश्नपत्र फेला परेन</p>
            <button 
              onClick={() => setSearchTerm("")} 
              className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-all"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Motivational Banner */}
        {filteredSets.length > 0 && (
          <div className="mt-12 p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl text-center shadow-lg">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Award size={22} className="text-yellow-400" />
              <span className="text-white font-bold">🎯 सफलताको लागि आजै सुरु गर्नुहोस्! 🎯</span>
              <Flame size={22} className="text-yellow-400" />
            </div>
            <p className="text-white/80 text-xs mt-1">नियमित अभ्यासले मात्र सफलता प्राप्त गर्न सकिन्छ</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OldIsGold;
