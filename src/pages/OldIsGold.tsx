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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section - Bold & Catchy */}
      <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur rounded-2xl mb-6 animate-pulse">
            <Flame size={48} className="text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              OLD IS GOLD
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-6 font-medium">
            🔥 पुराना प्रश्नपत्रहरू अभ्यास गर्नुहोस् 🔥
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur rounded-full px-5 py-2 border border-yellow-500/50">
              <Sparkles size={18} className="text-yellow-400" />
              <span className="text-white font-semibold">{oldIsGoldSets.length} प्रश्नपत्रहरू</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur rounded-full px-5 py-2 border border-yellow-500/50">
              <Target size={18} className="text-yellow-400" />
              <span className="text-white font-semibold">3,700+ प्रश्नहरू</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      {/* Stats Cards - Eye-catching */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-white">{oldIsGoldSets.length}</div>
            <div className="text-sm text-white/80 font-medium mt-1">कुल सेटहरू</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-white">3,700+</div>
            <div className="text-sm text-white/80 font-medium mt-1">कुल प्रश्नहरू</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-white">74</div>
            <div className="text-sm text-white/80 font-medium mt-1">परीक्षा सेट</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-white">3</div>
            <div className="text-sm text-white/80 font-medium mt-1">बोनस सेट</div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400" size={20} />
            <input
              type="text"
              placeholder="🔍 प्रश्नपत्र खोज्नुहोस्..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800 border-2 border-red-500/30 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 font-medium"
            />
          </div>
          {searchTerm && (
            <div className="text-center mt-2 text-sm text-yellow-400 font-medium">
              🔥 {filteredSets.length} वटा प्रश्नपत्र फेला पर्यो 🔥
            </div>
          )}
        </div>

        {/* Sets Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSets.map((set, idx) => {
            const setNumber = getSetNumber(set.id);
            const cardGradient = getCardGradient(setNumber);
            const badgeStyle = getBadgeStyle(setNumber);
            
            return (
              <Link
                key={set.id}
                to={`/quiz/old-is-gold/${set.id}`}
                className={`group relative bg-gradient-to-br ${cardGradient} rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in`}
                style={{ animationDelay: `${(idx % 12) * 50}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative p-5">
                  {/* Set Number */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                        <Zap size={16} className="text-yellow-400" />
                      </div>
                      <span className={`${badgeStyle} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                        Set {setNumber}
                      </span>
                    </div>
                    {setNumber >= 75 && (
                      <div className="flex items-center gap-1 bg-yellow-500 text-black font-bold text-xs px-2 py-1 rounded-full">
                        <Sparkles size={10} /> BONUS
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-white text-base mb-2 min-h-[48px] line-clamp-2 group-hover:text-yellow-300 transition-colors">
                    {set.title}
                  </h3>

                  {/* Details */}
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-white/80">
                      <Calendar size={14} className="text-yellow-400" />
                      <span>{set.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/80">
                      <FileText size={14} className="text-yellow-400" />
                      <span>{setNumber >= 75 ? "100+" : "50"} प्रश्न</span>
                    </div>
                  </div>

                  {/* Start Button */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                    <span className="text-xs text-white/60 font-medium">अभ्यास गर्नुहोस्</span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-yellow-400 group-hover:gap-2 group-hover:text-yellow-300 transition-all">
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
          <div className="text-center py-16 bg-gray-800/50 rounded-xl border-2 border-red-500/30">
            <div className="text-6xl mb-3">🔍</div>
            <p className="text-gray-400 text-lg">कुनै प्रश्नपत्र फेला परेन</p>
            <button 
              onClick={() => setSearchTerm("")} 
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Motivational Banner */}
        {filteredSets.length > 0 && (
          <div className="mt-12 p-5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl text-center shadow-xl">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Award size={24} className="text-yellow-400" />
              <span className="text-white font-bold text-lg">🎯 सफलताको लागि आजै सुरु गर्नुहोस्! 🎯</span>
              <Flame size={24} className="text-yellow-400" />
            </div>
            <p className="text-white/80 text-sm mt-2">नियमित अभ्यासले मात्र सफलता प्राप्त गर्न सकिन्छ</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default OldIsGold;
