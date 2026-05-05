import { Link } from "react-router-dom";
import { oldIsGoldSets } from "@/data/questions";
import { Search, ChevronRight, TrendingUp, Calendar, FileText, Sparkles, Award } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const OldIsGold = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredSets = oldIsGoldSets.filter(set =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-scroll effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoScrolling && filteredSets.length > visibleCount) {
      interval = setInterval(() => {
        setVisibleCount(prev => {
          if (prev >= filteredSets.length) {
            setIsAutoScrolling(false);
            return filteredSets.length;
          }
          return prev + 8;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, filteredSets.length, visibleCount]);

  const visibleSets = filteredSets.slice(0, visibleCount);

  const getSetNumber = (id: string): number => {
    const parts = id.split("-");
    return parts.length === 2 ? parseInt(parts[1]) || 0 : 0;
  };

  const getGradient = (setNumber: number) => {
    if (setNumber >= 75) return "from-purple-600 to-pink-600";
    if (setNumber <= 10) return "from-blue-600 to-cyan-500";
    if (setNumber <= 30) return "from-emerald-600 to-teal-500";
    if (setNumber <= 50) return "from-orange-600 to-amber-500";
    if (setNumber <= 74) return "from-indigo-600 to-blue-500";
    return "from-gray-700 to-gray-600";
  };

  const getBadgeColor = (setNumber: number) => {
    if (setNumber >= 75) return "from-purple-500 to-pink-500";
    if (setNumber <= 10) return "from-blue-500 to-cyan-500";
    if (setNumber <= 30) return "from-emerald-500 to-teal-500";
    if (setNumber <= 50) return "from-orange-500 to-amber-500";
    return "from-indigo-500 to-blue-500";
  };

  const cleanTitle = (title: string): string => {
    return title.replace(/\s+\d{4}(?:-\d{2}-\d{2})?$/, '').replace(/\s+२०७[0-9](?:-?\d{2}-?\d{2})?$/, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur rounded-3xl mb-6">
            <Award size={48} className="text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Old is Gold
          </h1>
          <p className="text-xl text-blue-200 mb-6">पुराना प्रश्नपत्रहरू अभ्यास गर्नुहोस्</p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-5 py-2">
              <Sparkles size={18} className="text-yellow-400" />
              <span>{oldIsGoldSets.length} प्रश्नपत्रहरू</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-5 py-2">
              <TrendingUp size={18} className="text-green-400" />
              <span>3,700+ प्रश्नहरू</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl z-10">
        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="🔍 प्रश्नपत्र खोज्नुहोस्..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(20);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          
          {!isAutoScrolling && visibleCount < filteredSets.length && (
            <button
              onClick={() => setIsAutoScrolling(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Sparkles size={18} /> Auto Load All
            </button>
          )}
          
          {isAutoScrolling && (
            <button
              onClick={() => setIsAutoScrolling(false)}
              className="px-6 py-3 bg-gray-700 rounded-xl font-medium flex items-center gap-2"
            >
              ⏸️ Stop
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Sets", value: oldIsGoldSets.length, color: "from-blue-500 to-cyan-500", icon: "📚" },
            { label: "Total Questions", value: "3,700+", color: "from-green-500 to-emerald-500", icon: "❓" },
            { label: "Exam Sets", value: "74", color: "from-purple-500 to-pink-500", icon: "📝" },
            { label: "Bonus Sets", value: "3", color: "from-orange-500 to-amber-500", icon: "⭐" },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-800/40 rounded-xl p-4 text-center border border-gray-700/50 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sets Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" ref={scrollRef}>
          {visibleSets.map((set) => {
            const setNumber = getSetNumber(set.id);
            const gradient = getGradient(setNumber);
            const badgeColor = getBadgeColor(setNumber);
            const cleanedTitle = cleanTitle(set.title);
            
            return (
              <Link
                key={set.id}
                to={`/quiz/old-is-gold/${set.id}`}
                className="group relative bg-gray-800/40 rounded-xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-300"
              >
                {/* Top Gradient Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${gradient}`}></div>
                
                <div className="p-5">
                  {/* Set Number */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`bg-gradient-to-r ${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                      Set {setNumber}
                    </div>
                    {setNumber >= 75 && (
                      <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                        <Sparkles size={10} /> बोनस
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-white mb-2 text-base min-h-[48px] line-clamp-2">
                    {cleanedTitle}
                  </h3>

                  {/* Details */}
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Calendar size={14} className="text-blue-400" />
                      <span>{set.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <FileText size={14} className="text-green-400" />
                      <span>{setNumber >= 75 ? "100+" : "50"} प्रश्न</span>
                    </div>
                  </div>

                  {/* Start Button */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-700/50">
                    <span className="text-xs text-gray-500">अभ्यास गर्नुहोस्</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-400 group-hover:gap-2 transition-all">
                      Start <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Loading Animation */}
        {isAutoScrolling && visibleCount < filteredSets.length && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full" style={{ animation: 'pulse 1s ease-in-out infinite' }}></div>
              <span className="ml-2">Loading more sets...</span>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {!isAutoScrolling && visibleCount < filteredSets.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 12, filteredSets.length))}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              Load More ({visibleCount}/{filteredSets.length})
            </button>
          </div>
        )}

        {/* Completion Message */}
        {visibleCount >= filteredSets.length && filteredSets.length > 0 && (
          <div className="text-center mt-8 p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30">
            <div className="flex items-center justify-center gap-2 text-green-400">
              <Award size={20} />
              <span>🎉 सबै {filteredSets.length} प्रश्नपत्रहरू लोड भए! 🎉</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <div className="text-center py-16 bg-gray-800/40 rounded-xl">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">कुनै प्रश्नपत्र फेला परेन</p>
            <button onClick={() => setSearchTerm("")} className="mt-4 text-blue-400 hover:text-blue-300">
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OldIsGold;
