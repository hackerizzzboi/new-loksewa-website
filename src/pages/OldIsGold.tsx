import { Link } from "react-router-dom";
import { oldIsGoldSets } from "@/data/questions";
import { Search, ChevronRight, Calendar, FileText, Award, Sparkles, Target, Zap, Crown, Rocket, Star } from "lucide-react";
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

  // Premium color schemes for different ranges
  const getCardTheme = (setNumber: number) => {
    if (setNumber >= 75) return { border: "border-indigo-200", badge: "bg-gradient-to-r from-indigo-600 to-purple-600", icon: "👑", star: true };
    if (setNumber <= 10) return { border: "border-rose-200", badge: "bg-gradient-to-r from-rose-500 to-pink-500", icon: "🔥", star: false };
    if (setNumber <= 30) return { border: "border-emerald-200", badge: "bg-gradient-to-r from-emerald-500 to-teal-500", icon: "💎", star: false };
    if (setNumber <= 50) return { border: "border-amber-200", badge: "bg-gradient-to-r from-amber-500 to-orange-500", icon: "⚡", star: false };
    return { border: "border-slate-200", badge: "bg-gradient-to-r from-slate-600 to-gray-600", icon: "📚", star: false };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section - Premium */}
      <div className="relative bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mb-6 shadow-2xl animate-bounce-slow">
            <Crown size={56} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              OLD SETS
            </span>
          </h1>
          <p className="text-xl text-indigo-200 mb-8 font-medium">
            ⚡ पुराना प्रश्नपत्रहरूको खजाना ⚡
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 rounded-full px-6 py-2.5">
              <Sparkles className="text-yellow-400" size={18} />
              <span className="text-white font-semibold">{oldIsGoldSets.length} प्रश्नपत्रहरू</span>
            </div>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 rounded-full px-6 py-2.5">
              <Target className="text-yellow-400" size={18} />
              <span className="text-white font-semibold">3,700+ प्रश्नहरू</span>
            </div>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 rounded-full px-6 py-2.5">
              <Rocket className="text-yellow-400" size={18} />
              <span className="text-white font-semibold">7+ वर्ष अनुभव</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Stats Cards - Glassmorphism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          <div className="group relative bg-white/80 backdrop-blur rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
            <div className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{oldIsGoldSets.length}</div>
            <div className="text-sm text-gray-500 font-medium mt-1">📚 कुल सेटहरू</div>
          </div>
          <div className="group relative bg-white/80 backdrop-blur rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
            <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">3,700+</div>
            <div className="text-sm text-gray-500 font-medium mt-1">❓ कुल प्रश्नहरू</div>
          </div>
          <div className="group relative bg-white/80 backdrop-blur rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
            <div className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">74</div>
            <div className="text-sm text-gray-500 font-medium mt-1">📝 परीक्षा सेट</div>
          </div>
          <div className="group relative bg-white/80 backdrop-blur rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
            <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">3</div>
            <div className="text-sm text-gray-500 font-medium mt-1">⭐ बोनस सेट</div>
          </div>
        </div>

        {/* Search Bar - Premium */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-indigo-400" size={22} />
              <input
                type="text"
                placeholder="🔍 प्रश्नपत्र खोज्नुहोस्... (नाम वा वर्ष)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-5 py-4 rounded-xl bg-white border-2 border-gray-100 text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 font-medium text-lg transition-all"
              />
            </div>
          </div>
          {searchTerm && (
            <div className="text-center mt-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 font-medium text-sm">
                <Star size={14} /> {filteredSets.length} वटा प्रश्नपत्र फेला पर्यो <Star size={14} />
              </span>
            </div>
          )}
        </div>

        {/* Premium Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {filteredSets.map((set, idx) => {
            const setNumber = getSetNumber(set.id);
            const theme = getCardTheme(setNumber);
            
            return (
              <Link
                key={set.id}
                to={`/quiz/old-is-gold/${set.id}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${(idx % 12) * 50}ms` }}
              >
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Colored Top Section */}
                <div className={`h-3 bg-gradient-to-r ${theme.badge.split(' ')[1]} ${theme.badge.split(' ')[2]}`}></div>
                
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-xl">
                        {theme.icon}
                      </div>
                      <div className={`${theme.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md`}>
                        Set {setNumber}
                      </div>
                    </div>
                    {theme.star && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xs px-2.5 py-1 rounded-full">
                        <Crown size={12} /> BONUS
                      </div>
                    )}
                  </div>

                  {/* Title - Big and Bold */}
                  <h3 className="font-bold text-gray-800 text-lg md:text-xl mb-3 min-h-[64px] leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all">
                    {set.title}
                  </h3>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-xl">
                      <Calendar size={14} className="text-indigo-500" />
                      <span className="text-sm font-semibold text-indigo-700">{set.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl">
                      <FileText size={14} className="text-emerald-500" />
                      <span className="text-sm font-semibold text-emerald-700">{setNumber >= 75 ? "100+" : "50"} प्रश्न</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-100">
                    <div className="flex items-center justify-between group/btn">
                      <span className="text-sm text-gray-400 font-medium">⚡ तुरुन्त अभ्यास</span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl text-indigo-600 font-bold text-sm group-hover/btn:gap-3 transition-all group-hover/btn:bg-gradient-to-r group-hover/btn:from-indigo-600 group-hover/btn:to-purple-600 group-hover/btn:text-white">
                        START NOW <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-2 border-dashed border-indigo-200">
            <div className="text-7xl mb-4 animate-bounce">🔍</div>
            <p className="text-gray-500 text-xl">कुनै प्रश्नपत्र फेला परेन</p>
            <button 
              onClick={() => setSearchTerm("")} 
              className="mt-5 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Premium Footer Banner */}
        {filteredSets.length > 0 && (
          <div className="mt-16 p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl text-center shadow-2xl">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Award size={28} className="text-yellow-400 animate-bounce" />
              <span className="text-white font-bold text-xl">🎯 सफलता तपाईंको पर्खाइमा छ — आजै सुरु गर्नुहोस्! 🎯</span>
              <Zap size={28} className="text-yellow-400 animate-pulse" />
            </div>
            <p className="text-indigo-100 text-sm mt-3">नियमित अभ्यास × समर्पण = सफलता 💪</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default OldIsGold;
