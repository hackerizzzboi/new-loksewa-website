import { useState, useEffect } from "react";

interface NepalLoadingScreenProps {
  onComplete: () => void;
}

const NepalLoadingScreen = ({ onComplete }: NepalLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const fullQuote = "नेपाली हामी रहौँला कहाँ, नेपालै नरहे।";
  const quoteMeaning = "Where will we Nepalis remain, if Nepal itself is not there?";

  // Typing effect for Nepali quote
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullQuote.length) {
        setTypedText(fullQuote.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
        setShowText(true);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(prev => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  // Loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-600 via-white to-red-600 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative sun and moon shapes */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-red-500/20 animate-pulse-slow"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-blue-500/20 animate-pulse-slow delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-yellow-500/10 animate-pulse-slow delay-2000"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Animated Nepal Flag */}
        <div className="relative inline-block mb-8 group">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600 to-blue-600 blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto animate-flag-wave">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
              {/* Nepal Flag Shape */}
              <polygon points="30,10 70,10 70,40 90,40 70,60 90,80 70,80 70,110 30,110 30,10" fill="#DC143C" stroke="#003893" strokeWidth="2.5"/>
              <polygon points="28,8 72,8 72,38 92,38 72,58 92,78 72,78 72,112 28,112 28,8" fill="none" stroke="#003893" strokeWidth="4"/>
              {/* Sun */}
              <circle cx="50" cy="55" r="10" fill="white"/>
              {/* Moon */}
              <path d="M50,38 Q58,50 50,62 Q42,50 50,38" fill="white"/>
              <circle cx="50" cy="47" r="4" fill="#DC143C"/>
              {/* Stars around */}
              <circle cx="50" cy="28" r="1.5" fill="white"/>
              <circle cx="50" cy="82" r="1.5" fill="white"/>
              <circle cx="32" cy="55" r="1.5" fill="white"/>
              <circle cx="68" cy="55" r="1.5" fill="white"/>
              <circle cx="38" cy="38" r="1" fill="white"/>
              <circle cx="62" cy="38" r="1" fill="white"/>
              <circle cx="38" cy="72" r="1" fill="white"/>
              <circle cx="62" cy="72" r="1" fill="white"/>
            </svg>
          </div>
          <div className="absolute -left-2 top-0 w-2 h-32 bg-gradient-to-b from-blue-600 to-red-600 rounded-full animate-flag-pole"></div>
        </div>

        {/* Quote */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-red-700 mb-3 leading-relaxed">
            {typedText}
            <span className={`inline-block w-0.5 h-6 md:h-8 bg-red-600 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </h1>
          {showText && (
            <p className="text-gray-600 text-sm md:text-base italic animate-fade-up">
              {quoteMeaning}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-96 mx-auto mt-8">
          <div className="h-1.5 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-xs mt-2 font-mono">{Math.floor(Math.min(progress, 100))}%</p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-red-500 animate-bounce-smooth" 
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="absolute bottom-8 left-0 right-0 text-gray-500 text-xs text-center animate-pulse">
          🇳🇵 Jai Nepal 🇳🇵
        </p>
      </div>

      <style>{`
        @keyframes flag-wave {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(2deg); }
        }
        @keyframes flag-pole {
          0%, 100% { height: 120px; }
          50% { height: 125px; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-flag-wave { animation: flag-wave 2s ease-in-out infinite; }
        .animate-flag-pole { animation: flag-pole 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-fade-up { animation: fade-up 0.5s ease-out forwards; opacity: 0; }
        .animate-bounce-smooth { animation: bounce-smooth 0.6s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default NepalLoadingScreen;
