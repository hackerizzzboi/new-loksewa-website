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
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated Gold Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: '#FFD700',
              opacity: Math.random() * 0.5 + 0.2,
              animationDuration: Math.random() * 8 + 4 + 's',
              animationDelay: Math.random() * 5 + 's',
            }}
          ></div>
        ))}
      </div>

      {/* Animated Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-500/10 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 animate-pulse-slow delay-1000 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-500/10 animate-pulse-slow delay-2000 blur-3xl"></div>
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto">
        
        {/* Nepal Map */}
        <div className={`mb-8 transition-all duration-1000 ${showMap ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20'}`}>
          <div className="relative inline-block">
            {/* Subtle glow behind map */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <img 
              src={nepalMap} 
              alt="Nepal Map" 
              className="w-48 h-36 sm:w-56 sm:h-44 md:w-72 md:h-56 lg:w-80 lg:h-64 mx-auto object-contain"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))'
              }}
            />
          </div>
        </div>

        {/* Quote - Red Color, No Borders */}
        <div className="mb-10">
          <div className="relative inline-block">
            {/* Red glow behind quote */}
            <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
            
            <div className="relative px-4 py-3 sm:px-6 sm:py-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 leading-relaxed">
                {typedText}
                <span className={`inline-block w-0.5 h-7 sm:h-8 md:h-10 bg-red-600 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </h1>
            </div>
          </div>
        </div>

        {/* Nepal Flag */}
        <div className={`mb-10 transition-all duration-1000 ${showFlag ? 'opacity-100 scale-100 translate-y-0 rotate-0' : 'opacity-0 scale-50 translate-y-20 rotate-12'}`}>
          <div className="relative inline-block">
            {/* Subtle glow behind flag */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            
            <img 
              src={nepalFlag} 
              alt="Nepal Flag" 
              className="w-32 h-28 sm:w-40 sm:h-36 md:w-52 md:h-48 lg:w-64 lg:h-56 mx-auto object-contain animate-flag-wave"
              style={{
                filter: 'drop-shadow(0 0 25px rgba(255,215,0,0.5))'
              }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-48 sm:w-64 md:w-80 mx-auto mt-6">
          <div className="relative">
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
              </div>
            </div>
            <div className="absolute -top-6 right-0">
              <span className="text-xs font-bold text-yellow-500">{Math.floor(Math.min(progress, 100))}%</span>
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {[0, 1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full animate-bounce-smooth" 
              style={{ 
                backgroundColor: '#FFD700',
                animationDelay: `${i * 0.15}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes flag-wave {
          0%, 100% { transform: skewX(0deg); }
          25% { transform: skewX(3deg); }
          75% { transform: skewX(-3deg); }
        }
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float-particle { animation: float-particle 8s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-flag-wave { animation: flag-wave 2s ease-in-out infinite; transform-origin: center; }
        .animate-bounce-smooth { animation: bounce-smooth 0.6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 1.5s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default NepalLoadingScreen;
