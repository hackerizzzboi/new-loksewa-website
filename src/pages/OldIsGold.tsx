import { Link } from "react-router-dom";
import { oldIsGoldSets } from "@/data/questions";
import { Search, ChevronRight, TrendingUp, Calendar, FileText, Sparkles, Award, Eye } from "lucide-react";
import { useState, useEffect } from "react";

const OldIsGold = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredSets = oldIsGoldSets.filter(set =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto load effect
  useEffect(() => {
    if (isLoading && visibleCount < filteredSets.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + 8, filteredSets.length));
        if (visibleCount + 8 >= filteredSets.length) {
          setIsLoading(false);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading, visibleCount, filteredSets.length]);

  const visibleSets = filteredSets.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSets.length;

  const getSetNumber = (id: string): number => {
    const match = id.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const getCardStyle = (setNumber: number) => {
    if (setNumber >= 75) return "border-purple-500/30 hover:border-purple-500 bg-gradient-to-br from-gray-800/80 to-purple-900/20";
    if (setNumber <= 10) return "border-blue-500/30 hover:border-blue-500 bg-gradient-to-br from-gray-800/80 to-blue-900/20";
    if (setNumber <= 30) return "border-emerald-500/30 hover:border-emerald-500 bg-gradient-to-br from-gray-800/80 to-emerald-900/20";
    if (setNumber <= 50) return "border-orange-500/30 hover:border-orange-500 bg-gradient-to-br from-gray-800/80 to-orange-900/20";
    return "border-indigo-500/30 hover:border-indigo-500 bg-gradient-to-br from-gray-800/80 to-indigo-900/20";
  };

  const getBadgeStyle = (setNumber: number) => {
    if (setNumber >= 75) return "bg-purple-600 text-white";
    if (setNumber <= 10) return "bg-blue-600 text-white";
    if (setNumber <= 30) return "bg-emerald-600 text-white";
    if (setNumber <= 50) return "bg-orange-600 text-white";
    return "bg-indigo-600 text-white";
  };

  const cleanTitle = (title: string): string => {
    return title.replace(/\s+\d{4}(?:-\d{2}-\d{2})?$/, '').replace(/\s+२०७[0-9](?:-?\d{2}-?\d{2})?$/, '');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6">
            <Award size={36} className="text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            🏆 Old is Gold
          </h1>
          <p className="text-lg text-blue-200 mb-5">
            पुराना प्रश्नपत्रहरू अभ्यास गर्नुहोस्
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white">
              <Sparkles size="16" />
              <span>{oldIsGoldSets.length} प्रश्नपत्रहरू</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white">
              <TrendingUp size="16" />
              <span>3,700+ प्रश्नहरू</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="🔍 प्रश्नपत्र खोज्नुहोस्..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(24);
                setIsLoading(false);
              }}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
            />
          </div>
          {searchTerm && (
            <div className="text-center mt-2 text-sm text-gray-400">
              {filteredSets.length} वटा प्रश्नपत्र फेला पर्यो
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700 hover:border-blue-500 transition-all">
            <div className="text-2xl font-bold text-blue-400">{oldIsGoldSets.length}</div>
            <div className="text-xs text-gray-400 mt-1">कुल सेटहरू</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700 hover:border-green-500 transition-all">
            <div className="text-2xl font-bold text-green-400">3,700+</div>
            <div className="text-xs text-gray-400 mt-1">कुल प्रश्नहरू</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700 hover:border-purple-500 transition-all">
            <div className="text-2xl font-bold text-purple-400">74</div>
            <div className="text-xs text-gray-400 mt-1">परीक्षा सेट</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700 hover:border-amber-500 transition-all">
            <div className="text-2xl font-bold text-amber-400">3</div>
            <div className="text-xs text-gray-400 mt-1">बोनस सेट</div>
          </div>
        </div>

        {/* Sets Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visibleSets.map((set) => {
            const setNumber = getSetNumber(set.id);
            const cardStyle = getCardStyle(setNumber);
            const badgeStyle = getBadgeStyle(setNumber);
            const cleanedTitle = cleanTitle(set.title);
            const isHovered = hoveredId === set.id;
            
            return (
              <Link
                key={set.id}
                to={`/quiz/old-is-gold/${set.id}`}
                onMouseEnter={() => setHoveredId(set.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group rounded-xl border transition-all duration-300 overflow-hidden ${cardStyle} ${isHovered ? 'scale-105 shadow-xl' : 'shadow-md'}`}
              >
                <div className="relative">
                  <div className={`h-1.5 w-full transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'} bg-gradient-to-r ${
                    setNumber >= 75 ? 'from-purple-500 to-pink-500' :
                    setNumber <= 10 ? 'from-blue-500 to-cyan-500' :
                    setNumber <= 30 ? 'from-emerald-500 to-teal-500' :
                    setNumber <= 50 ? 'from-orange-500 to-amber-500' :
                    'from-indigo-500 to-blue-500'
                  }`}></div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`${badgeStyle} text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                      Set {setNumber}
                    </span>
                    {setNumber >= 75 && (
                      <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full">
                        <Sparkles size="10" /> बोनस
                      </span>
                    )}
                  </div>

                  <h3 className={`font-bold text-white mb-2 text-sm line-clamp-2 min-h-[42px] transition-all ${isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400' : ''}`}>
                    {cleanedTitle}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Calendar size="12" className="text-blue-400" />
                      <span>{set.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <FileText size="12" className="text-green-400" />
                      <span>{setNumber >= 75 ? "100+" : "50"} प्रश्न</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                    <span className="text-xs text-gray-500">अभ्यास गर्नुहोस्</span>
                    <span className={`inline-flex items-center gap-1 text-sm font-medium transition-all ${isHovered ? 'text-yellow-400 gap-2' : 'text-blue-400'}`}>
                      Start <ChevronRight size="14" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More Section */}
        {hasMore && (
          <div className="text-center mt-10">
            {!isLoading ? (
              <button
                onClick={() => setIsLoading(true)}
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-all hover:scale-105 border border-gray-700"
              >
                📚 Load More ({visibleCount}/{filteredSets.length})
              </button>
            ) : (
              <div className="inline-flex items-center gap-3 text-gray-400">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span>Loading more sets...</span>
              </div>
            )}
          </div>
        )}

        {/* Completion Message */}
        {visibleCount >= filteredSets.length && filteredSets.length > 0 && (
          <div className="text-center mt-10 p-4 bg-green-600/10 rounded-xl border border-green-500/30">
            <div className="flex items-center justify-center gap-2 text-green-400">
              <Award size="18" />
              <span className="text-sm">🎉 सबै {filteredSets.length} प्रश्नपत्रहरू लोड भए! राम्रोसँग अभ्यास गर्नुहोस् 🎉</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <div className="text-center py-16 bg-gray-800/50 rounded-xl">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-gray-400">कुनै प्रश्नपत्र फेला परेन</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setVisibleCount(24);
              }} 
              className="mt-3 text-blue-400 hover:text-blue-300 text-sm"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-gray-600 border-t border-gray-800 pt-6">
          📖 नियमित अभ्यासले मात्र सफलता प्राप्त गर्न सकिन्छ
        </div>
      </div>
    </div>
  );
};

export default OldIsGold;
