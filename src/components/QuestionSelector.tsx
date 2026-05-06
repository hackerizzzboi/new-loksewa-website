import { Settings, X } from "lucide-react";

interface QuestionSelectorProps {
  totalQuestions: number;
  subjectName: string;
  onSelect: (count: number) => void;
  onClose: () => void;
}

const QuestionSelector = ({ totalQuestions, subjectName, onSelect, onClose }: QuestionSelectorProps) => {
  const options = [10, 20, 50, totalQuestions];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Settings size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">प्रश्न संख्या छान्नुहोस्</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <p className="text-gray-500 text-sm mb-2">
          <span className="font-semibold text-gray-700">{subjectName}</span> मा 
          कुल <span className="font-bold text-blue-600">{totalQuestions}</span> वटा प्रश्नहरू उपलब्ध छन्।
        </p>
        <p className="text-gray-400 text-xs mb-5">कति प्रश्न अभ्यास गर्न चाहनुहुन्छ?</p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                opt === 20
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {opt === totalQuestions ? `सबै (${opt})` : `${opt} प्रश्नहरू`}
            </button>
          ))}
        </div>
        
        <p className="text-gray-400 text-xs text-center border-t pt-3 mt-2">
          💡 प्रश्नहरू हरेक पटक Random रूपमा आउनेछन्
        </p>
      </div>
    </div>
  );
};

export default QuestionSelector;
