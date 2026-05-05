import { Link } from "react-router-dom";
import { oldIsGoldSets } from "@/data/questions";
import { Search } from "lucide-react";
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
    if (setNumber >= 75) return { badge: "bg-purple-100 text-purple-700", border: "border-purple-200" };
    if (setNumber >= 1 && setNumber <= 10) return { badge: "bg-blue-100 text-blue-700", border: "border-blue-200" };
    if (setNumber <= 30) return { badge: "bg-emerald-100 text-emerald-700", border: "border-emerald-200" };
    if (setNumber <= 50) return { badge: "bg-orange-100 text-orange-700", border: "border-orange-200" };
    return { badge: "bg-slate-100 text-slate-700", border: "border-slate-200" };
  };

  // Clean title (remove year from end if present)
  const cleanTitle = (title: string): string => {
    return title.replace(/\s+\d{4}(?:-\d{2}-\d{2})?$/, '').replace(/\s+२०७[0-9](?:-?\d{2}-?\d{2})?$/, '');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">🏆 Old is Gold</h1>
          <p className="text-blue-100 mb-3">पुराना प्रश्नपत्रहरू अभ्यास गर्नुहोस्</p>
          <div className="inline-block bg-white/20 rounded-full px-4 py-1 text-sm">
            कुल {oldIsGoldSets.length} वटा प्रश्नपत्रहरू उपलब्ध
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Section */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="प्रश्नपत्र खोज्नुहोस्..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            />
          </div>
          {searchTerm && (
            <div className="text-center mt-2 text-sm text-gray-500">
              {filteredSets.length} वटा प्रश्नपत्र फेला पर्यो
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{oldIsGoldSets.length}</div>
            <div className="text-xs text-gray-500">Total Sets</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm border">
            <div className="text-2xl font-bold text-green-600">3,700+</div>
            <div className="text-xs text-gray-500">Questions</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm border">
            <div className="text-2xl font-bold text-purple-600">74</div>
            <div className="text-xs text-gray-500">Exam Sets</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm border">
            <div className="text-2xl font-bold text-amber-600">3</div>
            <div className="text-xs text-gray-500">Bonus</div>
          </div>
        </div>

        {/* Sets Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSets.map((set) => {
            const setNumber = getSetNumber(set.id);
            const colors = getSetColors(setNumber);
            const cleanedTitle = cleanTitle(set.title);
            
            return (
              <Link
                key={set.id}
                to={`/quiz/old-is-gold/${set.id}`}
                className={`group bg-white rounded-lg border ${colors.border} shadow-sm hover:shadow-md transition-all overflow-hidden`}
              >
                <div className="p-4">
                  {/* Set Number Badge */}
                  <div className={`inline-block ${colors.badge} text-xs font-bold px-2 py-1 rounded-full mb-2`}>
                    Set {setNumber}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-800 mb-2 text-sm line-clamp-2 min-h-[40px]">
                    {cleanedTitle}
                  </h3>

                  {/* Year */}
                  <div className="text-xs text-gray-500 mb-3">
                    📅 वर्ष: {set.year} | 📝 {set.isBonus ? "100+" : "50"} प्रश्नहरू
                  </div>

                  {/* Start Button */}
                  <div className="text-right">
                    <span className="inline-block text-sm font-medium text-blue-600 group-hover:text-blue-700">
                      Start → 
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-gray-500">कुनै प्रश्नपत्र फेला परेन</p>
            <button 
              onClick={() => setSearchTerm("")} 
              className="mt-3 text-blue-600 hover:text-blue-700 text-sm"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          📖 नियमित अभ्यासले मात्र सफलता प्राप्त गर्न सकिन्छ
        </div>
      </div>
    </div>
  );
};

export default OldIsGold;
