import { useState, useEffect } from "react";
import nepalMap from "@/assets/map.png";
import nepalFlag from "@/assets/flag.png";

interface NepalLoadingScreenProps {
  onComplete: () => void;
}

const NepalLoadingScreen = ({ onComplete }: NepalLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const [bgColor, setBgColor] = useState(0);

  const fullQuote = "नेपाली हामी रहौँला कहाँ, नेपालै नरहे।";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullQuote.length) {
        setTypedText(fullQuote.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(prev => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  // Show map and flag with delay
  useEffect(() => {
    const mapTimer = setTimeout(() => setShowMap(true), 300);
    const flagTimer = setTimeout(() => setShowFlag(true), 800);
    return () => {
      clearTimeout(mapTimer);
      clearTimeout(flagTimer);
    };
  }, []);

  // Background color cycling
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setBgColor(prev => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(colorInterval);
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

  const bgGradients = [
    "from-red-600 via-white to-red-600",
    "from-blue-600 via-white to-blue-600",
    "from-green-600 via-white to-green-600",
    "from-purple-600 via-white to-purple-600",
    "from-orange-600 via-white to-orange-600",
    "from-pink-600 via-white to-pink-600"
  ];

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${bgGradients[bgColor]} z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-1000`}>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              backgroundColor: i % 2 === 0 ? '#DC143C' : '#003893',
              animationDuration: Math.random() * 5 + 3 + 's',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.3 + 0.1
            }}
          ></div>
        ))}
      </div>

      {/* Animated Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-red-500/10 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500/10 animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-500/5 animate-pulse-slow delay-2000"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
        
        {/* Nepal Map - Above Quote with Glow */}
        <div className={`mb-6 transform transition-all duration-1000 ${showMap ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50'}`}>
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl blur-3xl opacity-50 animate-pulse group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative animate-float">
              <img 
                src={nepalMap} 
                alt="Nepal Map" 
                className="w-48 h-36 md:w-80 md:h-60 lg:w-96 lg:h-72 mx-auto object-contain drop-shadow-2xl rounded-2xl animate-glow"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(220,20,60,0.5))'
                }}
              />
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-bounce-smooth"></span>
            <span className="text-red-700 text-xs md:text-sm font-mono font-bold animate-pulse">🏔️ हिमालयको काखमा 🏔️</span>
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-bounce-smooth delay-500"></span>
          </div>
        </div>

        {/* Quote with Rainbow Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 blur-2xl opacity-50 animate-spin-slow"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-red-700 leading-relaxed relative z-10 bg-white/30 backdrop-blur px-6 py-4 rounded-2xl shadow-2xl animate-text-glow">
              {typedText}
              <span className={`inline-block w-0.5 h-5 md:h-8 bg-red-600 ml-1 ${cursorVisible ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></span>
            </h1>
          </div>
        </div>

        {/* Nepal Flag - Below Quote with Crazy Animation */}
        <div className={`mb-8 transform transition-all duration-1000 ${showFlag ? 'translate-y-0 opacity-100 scale-100 rotate-0' : 'translate-y-20 opacity-0 scale-50 rotate-12'}`}>
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl blur-3xl opacity-50 animate-pulse-slow group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative animate-flag-wave">
              {/* Multiple glow layers */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-red-500 rounded-full blur-xl opacity-40 animate-pulse-slow"></div>
              <img 
                src={nepalFlag} 
                alt="Nepal Flag" 
                className="w-32 h-28 md:w-48 md:h-40 lg:w-64 lg:h-52 mx-auto object-contain drop-shadow-2xl rounded-xl animate-float"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(0,56,147,0.5))'
                }}
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 mt-3">
            <div className="flex gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500 animate-bounce-smooth"></span>
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500 animate-bounce-smooth delay-200"></span>
              <span className="inline-block w-3 h-3 rounded-full bg-white animate-bounce-smooth delay-400"></span>
            </div>
            <span className="text-blue-700 text-xs md:text-sm font-mono font-bold animate-pulse">🇳🇵 जय नेपाल 🇳🇵</span>
            <div className="flex gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500 animate-bounce-smooth delay-600"></span>
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500 animate-bounce-smooth delay-800"></span>
              <span className="inline-block w-3 h-3 rounded-full bg-white animate-bounce-smooth delay-1000"></span>
            </div>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-48 md:w-64 lg:w-80 mx-auto mt-6">
          <div className="relative">
            <div className="h-2 bg-gray-300 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 rounded-full transition-all duration-300 relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
              </div>
            </div>
            {/* Progress percentage with glow */}
            <div className="absolute -top-6 right-0">
              <span className="text-xs font-bold text-red-600 animate-pulse">{Math.floor(Math.min(progress, 100))}%</span>
            </div>
          </div>
        </div>

        {/* Loading Text with dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full animate-bounce-smooth" 
              style={{ 
                backgroundColor: i % 2 === 0 ? '#DC143C' : '#003893',
                animationDelay: `${i * 0.15}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.02); }
        }
        @keyframes flag-wave {
          0%, 100% { transform: skewX(0deg) scale(1); }
          25% { transform: skewX(3deg) scale(1.02); }
          75% { transform: skewX(-3deg) scale(1.02); }
        }
        @keyframes float-particle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(220,20,60,0.3); }
          50% { text-shadow: 0 0 20px rgba(220,20,60,0.6); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(220,20,60,0.3)); }
          50% { filter: drop-shadow(0 0 25px rgba(220,20,60,0.8)); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-flag-wave { animation: flag-wave 2s ease-in-out infinite; transform-origin: center; }
        .animate-float-particle { animation: float-particle 8s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-bounce-smooth { animation: bounce-smooth 0.8s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 1.5s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 1.5s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
};

export default NepalLoadingScreen;
