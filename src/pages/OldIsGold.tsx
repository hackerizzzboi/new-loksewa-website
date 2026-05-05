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
    if (setNumber >= 75) return "bg-gradient-to-r from-purple-500 to-pink-500";
    if (setNumber <= 10) return "bg-gradient-to-r from-blue-500 to-cyan-500";
    if (setNumber <= 30) return "bg-gradient-to-r from-emerald-500 to-teal-500";
    if (setNumber <= 50) return "bg-gradient-to-r from-orange-500 to-amber-500";
    return "bg-gradient-to-r from-indigo-500 to-blue-500";
  };

  const cleanTitle = (title: string): string => {
    return title.replace(/\s+\d{4}(?:-\d{2}-\d{2})?$/, '').replace(/\s+२०७[0-9](?:-?\d{2}-?\d{2})?$/, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section with Animation */}
      <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur rounded-3xl mb-6 animate-bounce-slow">
            <Award size={48} className="text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
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
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
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
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur"
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
            <div key={i} className="bg-gray-800/40 backdrop-blur rounded-xl p-4 text-center border border-gray-700/50 hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sets Grid with Animation */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" ref={scrollRef}>
          {visibleSets.map((set, index) => {
            const setNumber = getSetNumber(set.id);
            const gradient = getGradient(setNumber);
            const badgeColor = getBadgeColor(setNumber);
            const cleanedTitle = cleanTitle(set.title);
            
            return (
              <Link
                key={set.id}
                to={`/quiz/old-is-gold/${set.id}`}
                className="group relative bg-gray-800/40 backdrop-blur rounded-xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${(index % 12) * 50}ms` }}
              >
                {/* Animated Gradient Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}></div>
                
                {/* Top Gradient Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${gradient}`}></div>
                
                <div className="p-5 relative z-10">
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
                  <h3 className="font-bold text-white mb-2 text-base line-clamp-2 min-h-[48px] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
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
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-400 group-hover:gap-2 transition-all group-hover:text-white">
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
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
              <span>🎉 सबै {filteredSets.length} प्रश्नपत्रहरू लोड भए! राम्रोसँग अभ्यास गर्नुहोस् 🎉</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <div className="text-center py-16 bg-gray-800/40 backdrop-blur rounded-xl">
            <div className="text-6xl mb-4 animate-bounce">🔍</div>
            <p className="text-gray-400 text-lg">कुनै प्रश्नपत्र फेला परेन</p>
            <button onClick={() => setSearchTerm("")} className="mt-4 text-blue-400 hover:text-blue-300">
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default OldIsGold;


